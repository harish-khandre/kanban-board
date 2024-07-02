"use server"
import { db } from "@/lib/db";
import { ListSchema } from "@/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createList = async (values: z.infer<typeof ListSchema>) => {
  const validatedFields = ListSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { title, boardId } = validatedFields.data;

  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return { error: "Board not found!" };
  }

  const lastList = await db.list.findFirst({
    where: { boardId: boardId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = lastList ? lastList.order + 1 : 1;

  await db.list.create({
    data: {
      title,
      boardId,
      order: newOrder,
    },
  });
  revalidatePath(`/board/${boardId}`);

  return { success: "New list created!" };
};
