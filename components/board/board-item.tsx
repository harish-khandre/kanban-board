"use client";
import { ListWithTasks } from "@/types/types";

import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { RenameSchema } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { renameBoard } from "@/actions/rename-board";
import Link from "next/link";
import { Board } from "@prisma/client";
import { DeleteBoard } from "./delete-board";
import { Pencil } from "lucide-react";

interface BoardItemProps {
  data: Board;
}

export const BoardItem = ({ data }: BoardItemProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RenameSchema>>({
    resolver: zodResolver(RenameSchema),
    defaultValues: {
      id: data.id,
      title: data.title,
    },
  });

  const enabledEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
    setTitle(data.title);
  };

  const onSubmit = async (values: z.infer<typeof RenameSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await renameBoard(values);
        setError(data?.error);
        setSuccess(data?.success);
      } catch (err) {
        console.error("Reset error:", err);
        setError((err as Error).message || "An error occurred");
      }
    });
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-primary-foreground shadow-md pb-2">
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
          {isEditing ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 px-[2px]"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-primary-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
                <Button
                  type="submit"
                  size="sm"
                  disabled={isPending}
                  className="w-full h-7 text-sm font-medium border-transparent hover:border-input focus:border-input transition truncate  focus:bg-primary-background my-4"
                >
                  Rename
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  onClick={disableEditing}
                  disabled={isPending}
                  className="w-full h-7 text-sm font-medium border-transparent hover:border-input focus:border-input transition truncate  focus:bg-primary-background "
                >
                  close
                </Button>
              </form>
            </Form>
          ) : (
            <div className="flex justify-between items-center w-full">
              <Link href={`/board/${data.id}`}>
                <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
                  {data.title}
                </div>
              </Link>
              <div className="flex justify-center items-center h-full gap-4">
                <Pencil
                  size={17}
                  onClick={enabledEditing}
                  className="cursor-pointer"
                />
                <DeleteBoard id={data.id} />
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
