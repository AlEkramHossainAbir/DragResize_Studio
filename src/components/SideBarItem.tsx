import React from "react";
import { useDrag } from "react-dnd";

const SideBarItem = ({ data }) => {
  const [{ isDragging }, drag] = useDrag({
    type: data.type, // you need to pass a type manually
    item: () => data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className="sideBarItem"
      ref={drag}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      {data.component.type}
    </div>
  );
};

export default SideBarItem;
