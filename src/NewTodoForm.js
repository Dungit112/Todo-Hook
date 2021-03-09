import React from "react";
import uuid from "uuid/v4";
import "./NewTodoForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";

const NewTodoForm = ({ createTodo }) => {
  const FormikForm = useFormik({
    initialValues: {
      // Init form field
      id: "",
      task: "",
      completed: false,
      createDate: new Date(),
      isFinish: false,
    },
    validationSchema: Yup.object().shape({
      // Validate form field
      task: Yup.string()
        .trim()
        .required("task is required")
        .min(2, "task must have min 2 characters")
        .max(15, "task have max 15 characters"),
        
    }
    ),
    onSubmit: (value) => {
      const _id = uuid();
      value.id = _id;
      const dataTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      value.createDate = dataTime;
      createTodo(value);
      FormikForm.handleReset();
    },
  });

  // const [task, setTask] = useState({
  //   id:'',
  //   task:'',
  //   completed:false
  // })

  // const handleChange = (evt) => {
  //   setTask({
  //     ...task,
  //     [evt.target.name]: evt.target.value

  //   });
  // }

  //  const handleSubmitForm = (evt) => {
  //     evt.preventDefault();

  //     createTodo({ ...task, id: uuid(), completed: false });
  //     setTask({ task: "" });
  //   }

  return (
    <form className="NewTodoForm" onSubmit={FormikForm.handleSubmit}>
      <label htmlFor="task">New Todo</label>
      <input
        type="text"
        placeholder="New Todo"
        id="task"
        name="task"
        value={FormikForm.values.task}
        onChange={FormikForm.handleChange}
        onBlur={FormikForm.handleBlur}
      />
      <br />
      <button type="submit">Add Todo</button>
      <p className="error">{FormikForm.errors.task}</p>
    </form>
  );
};
export default NewTodoForm;
