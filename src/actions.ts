"use server";

import { db } from "@/db/connection";
import { addressBooking, categories, products } from "@/db/schema";
import { stackServerApp } from "@/stack";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { generateSlug } from "./db/columns/helpers";

function handleErrors(error: unknown) {
  if (error instanceof z.ZodError) {
    return { error: error.issues, success: false };
  }

  if (error instanceof Error) {
    return { error: error.message, success: false };
  }
  return { error: "Something went wrong", success: false };
}

export async function signUp(
  initialState: any,
  formData: FormData,
  noRedirect?: boolean
) {
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
    return { error: res.error.errorCode, success: false };
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

  if (!noRedirect) {
    redirect("/account?redirect=signup");
  }
  return {
    error: null,
    success: true,
  };
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

export const updateAccount = async (formData: FormData, userId?: string) => {
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
      error: validatedFields.error.issues,
      success: false,
    };
  }

  const user = userId
    ? await stackServerApp.getUser(userId)
    : await stackServerApp.getUser({ tokenStore: "nextjs-cookie" });

  if (!user) return { error: "USER_NOT_FOUND", success: false };

  const { data } = validatedFields;
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

export async function createProduct(product: FormData) {
  const schema = z.object({
    categoryId: z.coerce.string(),
    title: z.string().min(1).max(255),
    price: z.coerce.number().nonnegative(),
    discount: z.coerce.number().nonnegative().optional(),
    discountType: z.enum(["percentage", "fixed"]).optional(),
    thumbnail: z.string().min(1),
    // gallery: z.array(z.string()).optional(),
    // colors: z.array(z.string()).optional(),
    // sizes: z.array(z.string()).optional(),
    description: z.string().min(10),
    stock: z.coerce.number().int().nonnegative(),
  });
  const data = {
    categoryId: product.get("categoryId"),
    title: product.get("title"),
    price: product.get("price"),
    discount: product.get("discount"),
    description: product.get("description"),
    discountType: product.get("discountType"),
    thumbnail: product.get("thumbnail"),
    stock: product.get("stock"),
  };

  try {
    schema.parse(data);
    // Safe parse for type conversion
    const result = schema.safeParse(data);
    if (result.success) {
      await db.insert(products).values({
        ...result.data,
        slug: generateSlug(product.get("title") as string),
      });
    }

    return { error: null, success: true };
  } catch (e) {
    return handleErrors(e);
  }
}

export async function updateProduct(formData: FormData, id: number) {
  const schema = z.object({
    categoryId: z.coerce.string(),
    title: z.string().min(1).max(255),
    price: z.coerce.number().nonnegative(),
    discount: z.coerce.number().nonnegative().optional(),
    discountType: z.enum(["percentage", "fixed"]).optional(),
    thumbnail: z.string().min(1),
    description: z.string().min(10),
    stock: z.coerce.number().int().nonnegative(),
  });

  const data = {
    categoryId: formData.get("categoryId"),
    title: formData.get("title"),
    price: formData.get("price"),
    discount: formData.get("discount"),
    discountType: formData.get("discountType"),
    thumbnail: formData.get("thumbnail"),
    description: formData.get("description"),
    stock: formData.get("stock"),
  };

  try {
    schema.parse(data);
    const result = schema.safeParse(data);

    if (!result.success) {
      return;
    }

    await db
      .update(products)
      .set({
        ...result.data,
        slug: generateSlug(formData.get("title") as string),
      })
      .where(eq(products.id, id));

    return { error: null, success: true };
  } catch (e) {
    return handleErrors(e);
  }
}

export async function createCategory(formData: FormData) {
  const schema = z.object({
    title: z.string().min(1).max(255),
    thumbnail: z.string().optional(),
  });

  const data = {
    title: formData.get("title") + "",
    thumbnail: formData.get("thumbnail") + "",
  };

  try {
    schema.parse(data);

    await db.insert(categories).values({
      ...data,
      slug: generateSlug(data.title),
    });

    return { error: null, success: true };
  } catch (e) {
    return handleErrors(e);
  }
}

export async function updateCategory(formData: FormData, id: number) {
  const schema = z.object({
    title: z.string().min(1).max(255),
    thumbnail: z.string().optional(),
  });

  const data = {
    title: formData.get("title") + "",
    thumbnail: formData.get("thumbnail") + "",
  };

  try {
    schema.parse(data);

    await db
      .update(categories)
      .set({
        ...data,
        slug: generateSlug(data.title),
      })
      .where(eq(categories.id, id));

    return { error: null, success: true };
  } catch (e) {
    return handleErrors(e);
  }
}
