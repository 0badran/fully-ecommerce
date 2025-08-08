"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePage(route: string, type?: "layout" | "page") {
  revalidatePath(route, type);
}
