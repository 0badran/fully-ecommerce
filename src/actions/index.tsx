"use server";

import { db } from "@/db/connection";
import { cloudinaryFiles, addressBooking } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { UploadApiResponse } from "cloudinary";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signUp(initialState: any, formData: FormData) {
  const t = await getTranslations();

  const schema = z.object({
    name: z.string(t("nonempty")).min(3, t("nameError")).max(255, t("maxName")),
    email: z.email(t("emailError")).max(255, t("maxEmail")),
    password: z.string(t("nonempty")).min(8, t("minPassword")),
    phone: z
      .string(t("nonempty"))
      .min(10, t("minPhone"))
      .max(20, t("maxPhone")),
    birthdate: z.date(t("birthdateError")),
    country: z.string().nonempty(t("nonempty")),
  });

  // convert string to date object
  const birthdate = new Date(formData.get("birthdate") + "");

  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    birthdate: birthdate,
    country: formData.get("country"),
  });

  if (validatedFields.error) {
    return {
      error: validatedFields.error.issues,
      success: false,
    };
  }
  const { data } = validatedFields;

  const res = await stackServerApp.signUpWithCredential({
    email: data.email,
    password: data.password,
    noRedirect: true,
    verificationCallbackUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
  });

  if (res.status === "error") {
    return { error: res.error.name, success: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...reset } = data;

  // Update user metadata
  const user = await stackServerApp.getUser({ tokenStore: "nextjs-cookie" });
  user?.update({
    primaryEmail: data.email,
    displayName: data.name,
    clientMetadata: { ...reset, birthdate: format(birthdate, "yyyy-MM-dd") },
    serverMetadata: { ...reset, birthdate: format(birthdate, "yyyy-MM-dd") },
  });

  redirect("/account?redirect=signup");
}

export async function signIn(initialState: any, formData: FormData) {
  const t = await getTranslations();

  const schema = z.object({
    email: z.email(t("emailError")),
    password: z.string(t("nonempty")).min(8, t("minPassword")),
  });

  const validationResult = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (validationResult.error) {
    return {
      error: validationResult.error.issues,
      success: false,
    };
  }
  const { data } = validationResult;

  const auth = await stackServerApp.signInWithCredential({
    email: data.email,
    password: data.password,
  });

  if (auth.status === "error") {
    return {
      error: auth.error.name,
      success: false,
    };
  }

  redirect("/account");
}

export const updateAccount = async (formData: FormData) => {
  const t = await getTranslations();

  const schema = z.object({
    name: z.string(t("nonempty")).min(3, t("nameError")).max(255, t("maxName")),
    phone: z
      .string(t("nonempty"))
      .min(10, t("minPhone"))
      .max(20, t("maxPhone")),
    country: z.string().nonempty(t("nonempty")),
  });
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    country: formData.get("country"),
  });
  if (validatedFields.error) {
    return {
      error: validatedFields.error,
      success: false,
    };
  }
  const { data } = validatedFields;
  const user = await stackServerApp.getUser({ or: "redirect" });
  const userMetadata = user.serverMetadata;
  const newData = { ...userMetadata, ...data };
  user.update({
    displayName: newData.name,
    clientMetadata: newData,
    serverMetadata: newData,
  });
  return {
    error: null,
    success: true,
  };
};

export async function insertCloudinaryFile(info: any, userId: string) {
  const { public_id, secure_url, resource_type } = info as UploadApiResponse &
    CloudinaryUploadWidgetInfo;

  const [user] = await Promise.all([
    stackServerApp.getUser(),
    db.insert(cloudinaryFiles).values({
      publicId: public_id,
      mediaUrl: secure_url,
      resourceType: resource_type,
      userId: userId,
    }),
  ]);
  if (user) {
    user.update({ profileImageUrl: secure_url });
    revalidatePath("/account", "layout");
  }
}

export async function saveAddress(formData: FormData) {
  const t = await getTranslations();

  const schema = z.object({
    name: z.string(t("nonempty")).min(3, t("nameError")).max(255, t("maxName")),
    street: z.string(t("nonempty")),
    city: z.string(t("nonempty")),
    phone: z
      .string(t("nonempty"))
      .min(10, t("minPhone"))
      .max(20, t("maxPhone")),
    phone2: z.string().optional(),
    email: z.email(t("emailError")),
  });

  const validated = schema.safeParse({
    name: formData.get("name"),
    street: formData.get("street"),
    city: formData.get("city"),
    phone: formData.get("phone"),
    phone2: formData.get("phone2") || undefined,
    email: formData.get("email") || undefined,
  });

  if (!validated.success) {
    return { error: validated.error.issues, success: false };
  }

  const user = await stackServerApp.getUser();
  if (!user) {
    return { error: t("notfound"), success: false };
  }

  // check if address exists for user
  const [existing] = await db
    .select()
    .from(addressBooking)
    .where(eq(addressBooking.userId, user.id));

  if (existing) {
    await db
      .update(addressBooking)
      .set({
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone,
        address: validated.data.street,
        city: validated.data.city,
        phone2: validated.data.phone2,
      })
      .where(eq(addressBooking.userId, user.id));
  } else {
    await db.insert(addressBooking).values({
      name: validated.data.name,
      email: validated.data.email,
      phone: validated.data.phone,
      address: validated.data.street,
      city: validated.data.city,
      userId: user.id,
      phone2: validated.data.phone2,
    });
  }

  return { error: null, success: true };
}

export async function getUserAddress() {
  const user = await stackServerApp.getUser();
  if (!user) return null;
  const [address] = await db
    .select()
    .from(addressBooking)
    .where(eq(addressBooking.userId, user.id));
  return address || null;
}
