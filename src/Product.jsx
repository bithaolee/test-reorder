import { useFormContext, Controller } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";

import { IconDraggable } from "./IconDraggable";

export const Product = ({
  groupIndex,
  index,
  id,
  onRemove,
  onMove,
  disableUp,
  disableDown,
}) => {
  const { control } = useFormContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });

  const style = {
    ...(transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          transition,
        }
      : {}),
    zIndex: isDragging ? 1000 : 0,
    position: "relative",
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      id={id}
      className={`product-container${
        isDragging ? " product-container__dragging" : ""
      }`}
    >
      <div className="product-content">
        <div
          className="product-line-drag-handle"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          style={{ touchAction: "none" }}
          onKeyDown={() => {}}
        >
          <IconDraggable />
        </div>
        <Controller
          name={`subGroups[${groupIndex}].products[${index}].name`}
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>
      <div className="product-actions">
        <button
          disabled={disableUp}
          onClick={() => {
            onMove(index, index - 1);
          }}
        >
          Up
        </button>
        <button
          disabled={disableDown}
          onClick={() => {
            onMove(index, index + 1);
          }}
        >
          Down
        </button>
        <button
          onClick={() => {
            onRemove();
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
