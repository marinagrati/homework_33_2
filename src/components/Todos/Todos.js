import "./Todos.scss";
import { Button, FormControlLabel, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { STATUSES } from "../../constants";
import Logger from "../../utils/Logger";
import { queryStringToObject } from "../../utils/queryStringHelpers";
import IOSSwitch from "../IOSSwitch/IOSSwitch";
import TodoItem from "../TodoItem/TodoItem";

const Todos = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [newTodo, setNewTodo] = useState("");
  const [switchTodo, setSwitchTodo] = useState(localStorage.getItem("switchTodo") || "on");

  const inputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      status: "new",
    };

    setTodos((prevState) => [newTodoItem, ...prevState]);
    setNewTodo("");
  };

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const switchHandler = ({ target: { checked } }) => {
    setSwitchTodo(checked);
  };

  useEffect(() => {
    if (switchTodo) {
      saveTodos();
    }
  }, [todos]); // eslint-disable-line react-hooks/exhaustive-deps

  // const [currentStatus, setCurrentStatus] = useState("new");

  // const currentStatus = 22;
  // setCurrentStatus((prevCurrentStatus) => prevCurrentStatus * 2);

  const { push } = useHistory();

  Logger.info("push", push);

  function tabHandler(status) {
    // setCurrentStatus(status);
    push({
      search: `status=${status}`,
    });
    // про синхронность setState
    // Logger.info("tabHandler", currentStatus);
  }

  // useEffect(() => {
  //   // Logger.info("useEffect", currentStatus);
  // }, [currentStatus]);

  useEffect(() => {
    push({
      search: "status=new",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("switchTodo", switchTodo);
  }, [switchTodo]);

  const location = useLocation();
  Logger.info("location", queryStringToObject(location.search).status);

  return (
    <div className="todos">
      <form className="todos__form" onSubmit={addTodo}>
        <TextField
          label="Your new todo..."
          type="text"
          size="small"
          name="todo"
          value={newTodo}
          onChange={inputChange}
          variant="outlined"
        />
        <Button variant="contained" type="submit" color="primary">
          Add todo
        </Button>
      </form>
      {todos.length ? (
        <Button variant="outlined" color="primary" className="todos__save" onClick={saveTodos}>
          Save todos
        </Button>
      ) : null}

      <div className="todos__autosave">
        <FormControlLabel
          control={<IOSSwitch checked={switchTodo === "on"} onChange={switchHandler} />}
          label="Autosave"
        />
      </div>

      <div className="todos__filter">
        {STATUSES.map((status) => (
          <Button
            key={status}
            variant={status === queryStringToObject(location.search).status ? "contained" : "outlined"}
            color="primary"
            onClick={() => tabHandler(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="todos__list">
        {todos.length ? (
          todos
            .filter((todo) => todo.status === queryStringToObject(location.search).status)
            .map((todo) => <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />)
        ) : (
          <h2>No todos...</h2>
        )}
      </div>
    </div>
  );
};

export default Todos;
