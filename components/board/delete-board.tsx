"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { deleteBoard } from "@/actions/delete-board";

export const DeleteBoard = ({ id }: { id: string }) => {
  const handleDeleteBoard = deleteBoard.bind(null, id);

  return (
    <form action={handleDeleteBoard}>
      <Button size="sm" variant="destructive" type="submit">
        <TrashIcon size={17} />
      </Button>
    </form>
  );
};
