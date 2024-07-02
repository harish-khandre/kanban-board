import { ListContainer } from "@/components/board/list-container";
import { db } from "@/lib/db";

interface BoardPageProps {
  params: {
    board: string;
  };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const lists = await db.list.findMany({
    where: {
      boardId: params.board,
    },
    include: {
      tasks: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <>
      <div className="p-4 h-full overflow-x-auto">
        <ListContainer boardId={params.board} data={lists} />
      </div>
    </>
  );
}
