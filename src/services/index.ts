import { db } from "@/db/connection";
import { users as usersTable } from "@/db/schema";
import { UserRaw } from "@/lib/types";

export async function getUsers() {
  const users = await db.select().from(usersTable);

  if (!users) {
    return null;
  }

  return users.map((user) => {
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
