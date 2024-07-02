"use server";
import { db } from "@/lib/db";
import { UpdateCardOrder } from "@/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const updateCardOrder = async (
  values: z.infer<typeof UpdateCardOrder>,
) => {
  const validatedFields = UpdateCardOrder.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { items,  boardId } = validatedFields.data;
  let updateCards;

  try {
  const transaction = items.map((card) =>
    db.task.update({
      where: {
        id: card.id,
      },
      data: {
        order: card.order,
        listId: card.listId,
      },
    }),
  );

  updateCards = await db.$transaction(transaction);

  revalidatePath(`/board/${boardId}`);

  return { success: "Lists reordered" };
  } catch (error) {
  console.log(error);
  return { error: "Something went wrong" };
  }

};
