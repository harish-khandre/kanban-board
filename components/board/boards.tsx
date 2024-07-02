import { db } from "@/lib/db";
import { BoardItem } from "./board-item";

export const Boards = async () => {
  const boards = await db.board.findMany();

  return (
    <ol className="flex gap-x-3 h-full w-full pl-4">
      {boards.map((board) => {
        return <BoardItem key={board.id} data={board} />;
      })}
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
