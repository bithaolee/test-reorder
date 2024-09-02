import { useCallback } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

import { Product } from "./Product";
import { IconDraggable } from "./IconDraggable";

export const SubGroup = ({ index, onMove, disableUp, disableDown }) => {
  const { control, watch } = useFormContext();

  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: `subGroups[${index}].products`,
  });

  const groupName = watch(`subGroups[${index}].name`);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    async (event) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = fields.findIndex((item) => item.id === active.id);
        const newIndex = fields.findIndex((item) => item.id === over.id);
        move(oldIndex, newIndex);
      }
    },
    [fields, move]
  );

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field, _index) => (
              <Product
                key={field.id}
                groupIndex={index}
                index={_index}
                id={field.id}
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
          </SortableContext>
        </DndContext>
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
