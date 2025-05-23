import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "../lib/constants";
import Column from "./Column";
import DropZone from "./DropZone";


const style = {};
const Row = ({
  data,
  components,
  showId,
  layout,
  handleDrop,
  path,
}) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: ROW,
    item: () => ({
      id: data.id,
      children: data.children,
      path,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderColumn = (column, currentPath) => {
    return (
      <Column
        key={column.id}
        data={column}
        layout={layout}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
        showId={showId}
      />
    );
  };

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="base draggable row"
      onClick={(e) => {
        showId(data.id, e);
      }}
    >
      {data.id}
      <div className="columns">
        {data.children.map((column, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                className="horizontalDrag"
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data.children.length}`,
            childrenCount: data.children.length,
          }}
          onDrop={handleDrop}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};
export default Row;
