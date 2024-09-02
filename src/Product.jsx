import { useFormContext, Controller } from "react-hook-form";
import { IconDraggable } from "./IconDraggable";

export const Product = ({
  groupIndex,
  index,
  onRemove,
  onMove,
  disableUp,
  disableDown,
}) => {
  const { control } = useFormContext();

  return (
    <div className="product-container">
      <div className="product-content">
        <IconDraggable />
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
