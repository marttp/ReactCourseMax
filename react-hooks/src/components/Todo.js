import React, { useState, useEffect } from "react";
import Axios from "axios";

const Todo = props => {
  const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });
  const inputChangeHandler = event => {
    setTodoState({ ...todoState, userInput: event.target.value });
  };

  useEffect(() => {
    fetchStart();
    return () => {
      console.log("Cleanup");
    };
  }, []);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

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
    setTodoState({
      ...todoState,
      todoList: todos
    });
  };

  const todoAddHandler = async () => {
    setTodoState({
      ...todoState,
      todoList: todoState.todoList.concat(todoState.userInput)
    });
    await Axios.post("https://trainingreacthook.firebaseio.com/todos.json", {
      name: todoState.userInput
    });
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoState.userInput}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoState.todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
