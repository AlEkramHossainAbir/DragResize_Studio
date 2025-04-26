import classNames from "classnames";
import React from "react";
import { useDrop } from "react-dnd";
import { COLUMN, COMPONENT, ROW } from "../lib/constants";

const ACCEPTS = [ROW, COLUMN, COMPONENT];

const TrashDropZone = ({ data, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item) => {
      onDrop(data, item);
    },
    canDrop: (item) => {
      const layout = data.layout;
      const itemPath = item.path;
      const splitItemPath = itemPath.split("-");
      const itemPathRowIndex = splitItemPath[0];
      const itemRowChildrenLength =
        layout[itemPathRowIndex]?.children.length;

      // prevent removing a column if the row has only one column left
      if (
        item.type === COLUMN &&
        itemRowChildrenLength &&
        itemRowChildrenLength < 2
      ) {
        return false;
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={classNames("trashDropZone", { active: isActive })}
    >
      TRASH
    </div>
  );
};

export default TrashDropZone;
