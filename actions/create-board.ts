"use server";

import { db } from "@/lib/db";
import { BoardSchema } from "@/types";
import { revalidatePath } from "next/cache";
import  * as z  from "zod";

export async function createBoard(values: z.infer<typeof BoardSchema>) {
  const validatedFields = BoardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { title } = validatedFields.data;

  await db.board.create({
    data: {
      title,
    },
  });

  revalidatePath("/boards");

  return { success: "Board created!" };
}
