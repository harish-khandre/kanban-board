import * as z from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
  boardId: z.string(),
});

export const UpdateListOrder = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
  boardId: z.string(),
});

export const RenameSchema = z.object({
  title: z.string().min(1, { message: "Minimum 1 characters required" }),
  boardId: z.string(),
  id: z.string(),
});

export const TaskSchema = z.object({
  title: z.string().min(1, { message: "Minimum 1 characters required" }),
  listId: z.string(),
  boardId: z.string(),
});

export const ListSchema = z.object({
  title: z.string().min(1, { message: "Minimum 1 characters required" }),
  boardId: z.string(),
});

export const BoardSchema = z.object({
  title: z.string().min(3, { message: "Minimum 3 characters required" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(3, { message: "Minimum 3 characters required" }),
    ),
    email: z.optional(z.string().email({ message: "Valid email is required" })),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password is at least 6 characters long",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, {
    message: "Password is at least 6 characters long",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(3, { message: "Minimum 3 characters required" }),
});
