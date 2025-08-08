"use server";

import { envConfig } from "@/configs";
import { oauthClient } from "@/configs/mail";
import { db } from "@/db/connection";
import { addressBooking, cloudinaryFiles, users } from "@/db/schema";
import { revalidatePage } from "@/lib/services";
import { stackServerApp } from "@/stack";
import { UserRaw } from "@/types/user";
import { UploadApiResponse } from "cloudinary";
import { eq } from "drizzle-orm";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";
import nodemailer from "nodemailer";

export async function getUsers() {
  const usersData = await db.select().from(users);

  if (!usersData) {
    return null;
  }

  return usersData.map((user) => {
    const userRaw = user?.rawJson as UserRaw;
    const userMeta = userRaw?.server_metadata
      ? {
          country: (userRaw?.server_metadata?.country as string) || "",
          phone: (userRaw?.server_metadata?.phone as string) || "",
          birthdate: (userRaw?.server_metadata?.birthdate as string) || "",
          status: (userRaw?.primary_email_verified as boolean) || false,
        }
      : {
          country: "",
          phone: "",
          status: false,
          birthdate: "",
        };

    return {
      id: user.id,
      name: user.name as string,
      profilePhoto: userRaw?.profile_image_url as string | undefined,
      email: user.email as string,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      ...userMeta,
    };
  });
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

export async function deleteUser(userId: string | null) {
  try {
    const user = userId
      ? await stackServerApp.getUser(userId)
      : await stackServerApp.getUser({ tokenStore: "nextjs-cookie" });
    if (!user) {
      throw new Error("User not found", { cause: "USER_NOT_FOUND" });
    }
    await user.delete();
    await db.delete(users).where(eq(users.id, user.id));
    return { error: null, success: true };
  } catch (e) {
    return { error: e, success: false };
  }
}

export async function sendMail(to: string, subject?: string, body?: string) {
  const { token } = await oauthClient.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: envConfig.user,
      clientId: envConfig.googleClientId,
      clientSecret: envConfig.googleClientSecret,
      refreshToken: envConfig.googleRefreshToken,
      accessToken: token!,
    },
  });
  return transport.sendMail({
    from: `E-commerce <${envConfig.user}>`,
    to,
    subject,
    html: body,
  });
}

export async function changeUserPhoto(info: any, userId: string) {
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
    revalidatePage("/account", "layout");
  }
}
