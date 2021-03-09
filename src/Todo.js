import React, { useState } from "react";
import "./Todo.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";

const Todo = (props) => {
  const {
    task,
    removeTodo,
    updateTodo,
    toggleTodo,
    completed,
    id,
    createDate,
   
  } = props;
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isEditing: false,
  //     task: this.props.task
  //   };
  //   this.handleRemove = this.handleRemove.bind(this);
  //   this.toggleForm = this.toggleForm.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleUpdate = this.handleUpdate.bind(this);
  //   this.handleToggle = this.handleToggle.bind(this);
  // }

  const FormikForm = useFormik({
    initialValues: {
      // Init form field
      tasks: task,
      isEditing: false,
      updateDate: ""
      // fFinish: isFinish,
    },
    validationSchema: Yup.object().shape({
      // Validate form field
      tasks: Yup.string()
        .trim()
        .required("task is required")
        .min(2, "task must have min 2 characters")
        .max(15, "task have max 15 characters"),
    }),
    onSubmit: (value) => {
      setTasks(value.task);
      setIsEditing(false);

      const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      value.updateDate = dateTime;

      console.log("a", value.updateDate);
      updateTodo(id, value.tasks);
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  // const [isfFinish, setIsFFinish] = useState(false);
//   const [tasks, setTasks] = useState(task);

  //  const handleRemove= () => {
  //     this.props.removeTodo(this.props.id);
  //   }
  const handleRemove = () => {
    removeTodo(id);
  };
  const toggleForm = () => {
    setIsEditing(!isEditing);
  };
  // const handleUpdate =(evt) => {
  //   evt.preventDefault();
  //   //take new task data and pass up to parent
  //   updateTodo(id, tasks);
  //   setIsEditing(false );

  // }
  //  const handleChange =(evt) => {
  //   setTasks(evt.target.value);
  //   }
  const handleToggle = (evt) => {
    toggleTodo(id);
    // setIsFFinish(!isfFinish);
    // console.log(!isfFinish)
    // handleIsFinish(!isfFinish)
   
    
  };

  let result;
  if (isEditing) {
    result = (
      <CSSTransition key="editing" timeout={500} classNames="form">
        <form className="Todo-edit-form" onSubmit={FormikForm.handleSubmit}>
          <input
            type="text"
            value={FormikForm.values.tasks}
            name="tasks"
            onChange={FormikForm.handleChange}
            onBlur={FormikForm.onBlur}
          />

          <button type="submit">Save</button>
          <p className="error">{FormikForm.errors.tasks}</p>
        </form>
      </CSSTransition>
    );
  } else {
    result = (
      <CSSTransition key="normal" timeout={500} classNames="task-text">
        <li className="Todo-task" onClick={(e) => handleToggle(e)}>
          {task}
          <br />
          {FormikForm.values.updateDate ? (
            <small>{FormikForm.values.updateDate}</small>
          ) : (
            <small>{createDate}</small>
          )}
        </li>
      </CSSTransition>
    );
  }
  return (
    <TransitionGroup className={completed ? "Todo completed" : "Todo"}>
      {result}
      <div className="Todo-buttons">
        <button onClick={(e) => toggleForm(e)}>
          <i className="fas fa-pen" />
        </button>
        <button onClick={(e) => handleRemove(id)}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </TransitionGroup>
  );
};
export default Todo;
