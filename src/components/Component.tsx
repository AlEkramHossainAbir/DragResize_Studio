import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "../lib/constants";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};
const Component = ({ data, components, path, showId }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: COMPONENT,
    item: () => ({
      id: data.id,
      path,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];

   if (component.type !== "row" && component.type !== "column") {
     return (
       <div
         ref={ref}
         style={{ ...style, opacity }}
         className="component draggable"
         onClick={(e) => {
           showId(data.id, e);
         }}
       >
         <div>{data.id}</div>
         <div>{component.content}</div>
       </div>
     );
   } else {
     return (
       <div
         ref={ref}
         onClick={(e) => {
           showId(data.id, e);
         }}
       ></div>
     );
   }

};
export default Component;
