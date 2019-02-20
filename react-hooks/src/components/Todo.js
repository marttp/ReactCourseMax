import React, { useState, useEffect, useReducer, useRef } from "react";
import Axios from "axios";

const Todo = props => {
  // const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  const todoInputRef = useRef();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(todo => todo.id !== action.payload.id);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    fetchStart();
    return () => {
      console.log("Cleanup");
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  // useEffect(() => {
  //   if (submittedTodo) {
  //     dispatch({
  //       type: "ADD",
  //       payload: submittedTodo
  //     });
  //   }
  //   // ! If update data in [] will active effect
  // }, [submittedTodo]);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  // const inputChangeHandler = event => {
  //   setTodoState({ ...todoState, userInput: event.target.value });
  // };

  const fetchStart = async () => {
    const response = await Axios.get(
      "https://trainingreacthook.firebaseio.com/todos.json"
    );
    const todoData = response.data;
    const todos = [];

    for (const key in todoData) {
      if (todoData.hasOwnProperty(key)) {
        todos.push({ id: key, name: todoData[key].name });
      }
    }

    dispatch({
      type: "SET",
      payload: todos
    });
  };

  const todoAddHandler = async () => {
    const todoName = todoInputRef.current.value;

    const response = await Axios.post(
      "https://trainingreacthook.firebaseio.com/todos.json",
      {
        name: todoName
      }
    );

    const todoItem = { id: response.data.name, name: todoName };
    setTimeout(() => {
      // setSubmittedTodo(todoItem);
      dispatch({
        type: "ADD",
        payload: todoItem
      });
    }, 2000);
  };

  const todoRemoveHandler = async todoId => {
    await Axios.delete(
      `https://trainingreacthook.firebaseio.com/todos/${todoId}.json`
    );
    dispatch({
      type: "REMOVE",
      payload: todoId
    });
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        // onChange={inputChangeHandler}
        // value={todoState.userInput}
        ref={todoInputRef}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
            {todo.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
