"use client";
import { ListWithTasks } from "@/types/types";
import { cn } from "@/lib/utils";
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
import { renameList } from "@/actions/rename-list";
import { Pencil } from "lucide-react";
import { DeleteList } from "./delete-list";
import { TaskForm } from "./add-task";
import { TaskItem } from "./task-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
  data: ListWithTasks;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
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
      boardId: data.boardId,
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
        const data = await renameList(values);
        setError(data?.error);
        setSuccess(data?.success);
      } catch (err) {
        console.error("Reset error:", err);
        setError((err as Error).message || "An error occurred");
      }
    });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-primary-foreground shadow-md pb-2"
          >
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
                <div className="space-y-2 flex flex-col w-full">
                  <div className="flex justify-between items-center text-sm px-2.5 py-1 h-fit font-medium border-transparent">
                    {data.title}
                    <div className="flex justify-center items-center h-full gap-4">
                      <Button
                        onClick={enabledEditing}
                        size="sm"
                        variant="outline"
                      >
                        <Pencil size={17} className="cursor-pointer" />
                      </Button>
                      <DeleteList id={data.id} boardId={data.boardId} />
                    </div>
                  </div>
                  <div>
                    <Droppable droppableId={data.id} type="card">
                      {(provided) => (
                        <ol
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                            data.tasks.length > 0 ? "mt-2" : "mt-0",
                          )}
                        >
                          {data.tasks.map((task, index) => (
                            <TaskItem key={task.id} index={index} data={task} />
                          ))}
                          {provided.placeholder}
                        </ol>
                      )}
                    </Droppable>
                  </div>
                  <div className="w-full">
                    <TaskForm listId={data.id} boardId={data.boardId} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
