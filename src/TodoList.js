import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";

const TodoList = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     todos: []
  //   };
  //   this.create = this.create.bind(this);
  //   this.remove = this.remove.bind(this);
  //   this.update = this.update.bind(this);
  //   this.toggleCompletion = this.toggleCompletion.bind(this);
  // }
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState([]);
  const create = (newTodo) => {
    setTodos([...todos, newTodo]);
    setSearch([...todos, newTodo]);

   
  };
  const remove = (id) => {
    // this.setState({
    //   todos: this.state.todos.filter(t => t.id !== id)
    // });
    setTodos([...todos.filter((t) => t.id !== id)]);
    setSearch([...todos.filter((t) => t.id !== id)]);
  };
  const update = (id, updatedTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }

      return todo;
    });

    setTodos(updatedTodos);
    setSearch(updatedTodos)
  
  };
  const toggleCompletion = (id) => {
    const updatedTodos =(search.length>0 ? search:todos).map((todo) => {
      if (todo.id === id) {
        console.log()
        return { ...todo, completed: !todo.completed, isFinish: !todo.isFinish };
      }
      
      return todo;
      
    });
    setTodos(updatedTodos);
    setSearch(updatedTodos)
    console.log("abc",updatedTodos)
    console.log(todos)
  };
  const searchForm = (e) => {
    console.log(e.target.value);
    let { value } = e.target;

    const data = todos.filter((todo) =>
      todo.task.toLowerCase().includes(value.toLowerCase())
    );
   
    setSearch(data);
    
  };
  // const handleIsFinish = (isFinish, id) =>{
  //   console.log(id)
  //   const finishTodo = todos.map((todo) => {
  //     if(todo.id=id){
  //       console.log("adas",todo.id)
  //       return {...todo, isFinish: !isFinish}
  //     }
  //     return todo;
  //   })
    
  //   console.log("finish",finishTodo)
  //   setTodos(finishTodo)
    
  // }
  const onChangeDropDown = (e) =>{
    console.log(e)
    let newDropDown = [];
    switch (e) {
      case 'all':
        newDropDown = todos;
        console.log("all", newDropDown)
        break;
      case 'finish':
        newDropDown = todos.filter((todo) => (todo.isFinish === true));
        console.log("finish", newDropDown)
        break;
      case 'unfinish':
        newDropDown = todos.filter((todo) => (todo.isFinish === false));
        console.log("unfinish", newDropDown)
        break;
      case 'alphabel':
        newDropDown = todos.sort((a, b) => a.task.localeCompare(b.task));
        console.log("alphabel", newDropDown)
        break;
      case 'date':
        newDropDown = todos.slice().sort((a, b) => b.createDate - a.createDate);
        console.log("Date", newDropDown)
        break;
      default:
        break;
    }
    setTodos(newDropDown);
    setSearch(newDropDown);
    setTodos(todos)
  }
  
  const Ttodos = !(search.length > 0)
    ? todos.map((todo) => {
        const { task, completed, id, value, createDate } = todo;
        return (
          <CSSTransition key={id} timeout={500} classNames="todo">
            <Todo
              key={id}
              id={id}
              task={task}
              completed={completed}
              removeTodo={remove}
              updateTodo={update}
              toggleTodo={toggleCompletion}
              value={value}
              createDate={createDate}
            
            
         
            />
          </CSSTransition>
        );
      })
    : search.map((todo) => {
        const { task, completed, id, value, createDate  } = todo;
        return (
          <CSSTransition key={id} timeout={500} classNames="todo">
            <Todo
              key={id}
              id={id}
              task={task}
              completed={completed}
              removeTodo={remove}
              updateTodo={update}
              toggleTodo={toggleCompletion}
              value={value}
              createDate={createDate}
             
             
            
            />
          </CSSTransition>
        );
      });

  return (
    <div className="TodoList">
      <h1>
        Get To Work! <span>An Animated Todo List Made With React Hooks.</span>
      </h1>
      <div className="Search">
        <Search searchForm={searchForm} />
        <div className="Dropdown">
          <Dropdown  onChangeDropDown={(e) =>onChangeDropDown(e)} />
        </div>
      </div>
      <NewTodoForm createTodo={create} />

      <ul>
        <TransitionGroup className="todo-list">{Ttodos}</TransitionGroup>
      </ul>
    </div>
  );
  
};
export default TodoList;
