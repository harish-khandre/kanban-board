"use server";
import { db } from "@/lib/db";
import { UpdateListOrder } from "@/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const updateListOrder = async (
  values: z.infer<typeof UpdateListOrder>,
) => {
  const validatedFields = UpdateListOrder.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { items, boardId } = validatedFields.data;
  let lists;

  const transaction = items.map((list) =>
    db.list.update({
      where: {
        id: list.id,
      },
      data: {
        order: list.order,
      },
    }),
  );

  lists = await db.$transaction(transaction);

  revalidatePath(`/board/${boardId}`);

  return { success: "Lists reordered" };
};
