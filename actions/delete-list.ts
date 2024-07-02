"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteList(id: string, boardId: string) {
  await db.list.delete({
    where: { id },
  });
  revalidatePath(`/board/${boardId}`);
}
