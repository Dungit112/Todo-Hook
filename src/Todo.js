import React, { useState } from "react";
import "./Todo.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useForm } from "react-hook-form";

const Todo = (props) => {
  const { handleSubmit, watch, errors } = useForm();
  const { task, removeTodo, updateTodo, toggleTodo, completed, id} = props
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

  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState('')
//  const handleRemove= () => {
//     this.props.removeTodo(this.props.id);
//   }
 const handleRemove= () => {
  removeTodo(id);
  }
  const toggleForm =() => {
    setIsEditing({ isEditing: !isEditing });
  }
  const handleUpdate =(evt) => {
    evt.preventDefault();
    //take new task data and pass up to parent
    updateTodo(id, tasks);
    setIsEditing(false );
    
  }
 const handleChange =(evt) => {
  setTasks(evt.target.value);
  }
  const handleToggle =(evt) => {
    toggleTodo(id);
  }
  
    let result;
    if (isEditing) {
      result = (
        <CSSTransition key='editing' timeout={500} classNames='form'>
          <form className='Todo-edit-form' onSubmit={(e) =>handleUpdate(e)}>
            <input
              type='text'
              value={tasks.value}
              name='task'
              onChange={handleChange}
            />
            <button>Save</button>
          </form>
        </CSSTransition>
      );
    } else {
      result = (
        <CSSTransition key='normal' timeout={500} classNames='task-text'>
          <li className='Todo-task' onClick={(e) =>handleToggle(e)}>
            {task}
          </li>
        </CSSTransition>
      );
    }
    return (
      <TransitionGroup
        className={completed ? "Todo completed" : "Todo"}
      >
        {result}
        <div className='Todo-buttons'>
          <button onClick={(e) =>toggleForm(e)}>
            <i className='fas fa-pen' />
          </button>
          <button onClick={(e) => handleRemove(e)}>
            <i className='fas fa-trash' />
          </button>
        </div>
      </TransitionGroup>
    );
  
};
export default Todo;
