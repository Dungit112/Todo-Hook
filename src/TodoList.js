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
    // this.setState({
    //   todos: [...this.state.todos, newTodo]
    // });
    setTodos([...todos, newTodo]);
    
  };
  const remove = (id) => {
    // this.setState({
    //   todos: this.state.todos.filter(t => t.id !== id)
    // });
    setTodos([...todos.filter((t) => t.id !== id)]);
  };
  const update = (id, updatedTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }

      return todo;
    });

    setTodos(updatedTodos);
    console.log(updatedTodos);
  };
  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const searchForm = (e) => {
    console.log(e.target.value);
    let { value } = e.target;

    const data = todos.filter((todo) =>
      todo.task.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(data);
    console.log(data);
  };
  const dropDown = (e) => {
    console.log(e.target.value);
    let { value } = e.target;
    let newData = [];
    if (!value) {
      return;
    } else if (value === value.finish) {
      newData = todos.filter((todo) => (todo.isFinish = true));
    } else if (value === value.unfinish) {
      newData = todos.filter((todo) => (todo.isFinish = false));
    }
  };

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
        const { task, completed, id, value, createDate, isFinish } = todo;
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
              isFinish={isFinish}
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
          <Dropdown dropDown={dropDown} onChange />
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
