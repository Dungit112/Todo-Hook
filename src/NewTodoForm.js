import React, {useState } from "react";
import uuid from "uuid/v4";
import "./NewTodoForm.css";
// import { useForm } from "react-hook-form";

const NewTodoForm = ({createTodo}) => {
  // const { handleSubmit, errors, register } = useForm( );
  // const onSubmitt = data => console.log(data);

  const [task, setTask] = useState({
    id:'',
    task:'',
    completed:false
  })
  
  const handleChange = (evt) => {
    setTask({
      ...task,
      [evt.target.name]: evt.target.value
      
    });
  }

 const handleSubmitForm = (evt) => {
    evt.preventDefault();
    
    createTodo({ ...task, id: uuid(), completed: false });
    setTask({ task: "" });
  }
  
    return (
      <form className='NewTodoForm'   onSubmit={handleSubmitForm()}>
        <label htmlFor='task'>New Todo</label>
        <input
          // ref={register({ required: true, minLength: 4 })}
          type='text'
          placeholder='New Todo'
          id='task'
          name='task'
          value={task.value}
          onChange={handleChange}
        />
        {/* {errors.task && <p>this is required</p>} */}
        <button>Add Todo</button>
      </form>
    );
  
}
export default NewTodoForm;
