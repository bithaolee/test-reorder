import { useFormContext, useFieldArray } from "react-hook-form";
import { Product } from "./Product";
import { IconDraggable } from "./IconDraggable";

export const SubGroup = ({ index, onMove, disableUp, disableDown }) => {
  const { control, watch } = useFormContext();

  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: `subGroups[${index}].products`,
  });

  const groupName = watch(`subGroups[${index}].name`);

  return (
    <div className="sub-group-container">
      <div className="sub-group-header">
        <div className="sub-group-title">
          <IconDraggable />
          <span>{groupName}</span>
        </div>
        <div className="sub-group-actions">
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
        </div>
      </div>
      <div>
        {fields.map((field, _index) => (
          <Product
            key={field.id}
            groupIndex={index}
            index={_index}
            onRemove={() => {
              remove(_index);
            }}
            onMove={(oldIndex, newIndex) => {
              move(_index, newIndex);
            }}
            disableUp={_index === 0}
            disableDown={_index === fields.length - 1}
          />
        ))}
      </div>
      <div className="btn-add-container">
        <button
          onClick={() =>
            append({
              name: "",
            })
          }
        >
          Add
        </button>
      </div>
    </div>
  );
};
