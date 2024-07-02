"use server";

import { db } from "@/lib/db";
import { RenameSchema } from "@/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const renameBoard = async (values: z.infer<typeof RenameSchema>) => {
  const validatedFields = RenameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, id } = validatedFields.data;

  await db.board.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  revalidatePath(`/`);
  return { success: "Board renamed!" };
};
