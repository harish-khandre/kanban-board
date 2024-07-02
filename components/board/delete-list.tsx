"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";
import { deleteList } from "@/actions/delete-list";

export const DeleteList = ({
  id,
  boardId,
}: {
  id: string;
  boardId: string;
}) => {
  const handleDeleteBoard = deleteList.bind(null, id, boardId);

  return (
    <form action={handleDeleteBoard}>
      <Button size="sm" variant="destructive" type="submit">
        <TrashIcon size={17} />
      </Button>
    </form>
  );
};
