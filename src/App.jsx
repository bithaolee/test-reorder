import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import "./App.css";
import { SubGroup } from "./SubGroup";

function App() {
  const onSubmit = (data) => {
    console.log(data);
  };

  const methods = useForm({
    defaultValues: {
      title: "",
      subGroups: [
        {
          name: "Group-A",
          products: [
            {
              name: "A1",
            },
            {
              name: "A2",
            },
          ],
        },
        {
          name: "Group-B",
          products: [
            {
              name: "B1",
            },
            {
              name: "B2",
            },
            {
              name: "B3",
            },
          ],
        },
      ],
    },
    onSubmit,
  });

  const { fields, move } = useFieldArray({
    control: methods.control,
    name: "subGroups",
  });

  return (
    <FormProvider {...methods}>
      <div className="body">
        <div>
          <h1>Groups</h1>
        </div>
        <div>
          {fields.map((field, index) => {
            return (
              <SubGroup
                key={field.id}
                index={index}
                disableUp={index === 0}
                disableDown={index === fields.length - 1}
                onMove={(oldIndex, newIndex)=>{
                  move(oldIndex, newIndex);
                }}
              />
            );
          })}
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
