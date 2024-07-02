"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema } from "@/types";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { createTask } from "@/actions/create-task";
import { PlusCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";

export function TaskForm({
  listId,
  boardId,
}: {
  listId: string;
  boardId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      listId: listId,
      boardId: boardId,
    },
  });

  const onSubmit = (values: z.infer<typeof TaskSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createTask(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch((e) => {
          console.log(e);
          setError("An error occurred. Please try again.");
        });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <PlusCircle size={16} className="mr-2" />
          Add a task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
          <DialogDescription>tasks tasks tasks</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Title of the task"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <DialogClose className="w-full" asChild>
              <Button type="submit" disabled={isPending} className="w-full">
                Add
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
