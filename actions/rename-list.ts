"use server";

import { db } from "@/lib/db";
import { RenameSchema } from "@/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const renameList = async (values: z.infer<typeof RenameSchema>) => {
  const validatedFields = RenameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, boardId, id } = validatedFields.data;

  await db.list.update({
    where: {
      id,
      boardId,
    },
    data: {
      title,
    },
  });

  revalidatePath(`/board/${boardId}`);
  return { success: "Board renamed!" };
};
