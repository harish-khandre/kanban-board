import { Task } from "@prisma/client";
import { Card } from "../ui/card";
import { Draggable } from "@hello-pangea/dnd";

export const TaskItem = ({ data, index }: { data: Task; index: number }) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="py-2 px-3 text-sm truncate"
        >
          {data.title}
        </Card>
      )}
    </Draggable>
  );
};
