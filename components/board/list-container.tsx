"use client";
import { ListWithTasks } from "@/types/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
  data: ListWithTasks[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);


  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          order: index,
        }),
      );
      setOrderedData(items);
      updateListOrder({ items, boardId });
    }

    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.tasks) {
        sourceList.tasks = [];
      }

      if (!destList.tasks) {
        destList.tasks = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.tasks,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((task, idx) => {
          task.order = idx;
        });

        sourceList.tasks = reorderedCards;
        setOrderedData(newOrderedData);

        updateCardOrder({ items: reorderedCards, boardId });
      } else {
        const [movedCard] = sourceList.tasks.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destList.tasks.splice(destination.index, 0, movedCard);

        sourceList.tasks.forEach((task, idx) => {
          task.order = idx;
        });

        destList.tasks.forEach((task, idx) => {
          task.order = idx;
        });

        setOrderedData(newOrderedData);
        updateCardOrder({ boardId: boardId, items: destList.tasks });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm boardId={boardId} />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
