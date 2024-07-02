"use server";
import { db } from "@/lib/db";
import { TaskSchema } from "@/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createTask = async (values: z.infer<typeof TaskSchema>) => {
  const validatedFields = TaskSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { title, listId, boardId } = validatedFields.data;

  const list = await db.list.findUnique({
    where: {
      id: listId,
    },
  });

  if (!list) {
    return { error: "List not found!" };
  }

  const lastTask = await db.task.findFirst({
    where: { listId: listId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = lastTask ? lastTask.order + 1 : 1;

  await db.task.create({
    data: {
      title,
      listId,
      order: newOrder,
    },
  });
  revalidatePath(`/board/${boardId}`);

  return { success: "New task created!" };
};
