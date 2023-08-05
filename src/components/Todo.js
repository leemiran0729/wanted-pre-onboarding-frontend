import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
    }
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: new Date(), todo: todo, completed: false }]);
    localStorage.setItem(
      "todos",
      JSON.stringify([
        ...todos,
        { id: new Date(), todo: todo, completed: false },
      ])
    );
  };

  const handleChecked = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div>
      <Form onSubmit={handleAdd}>
        <Input
          data-test-id="new-todo-input"
          value={todo}
          onChange={handleChange}
        />
        <Button data-testid="new-todo-add-button" onSubmit={handleAdd}>
          추가
        </Button>
      </Form>
      <Ul>
        {todos.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              todos={todos}
              handleChecked={handleChecked}
              setTodos={setTodos}
            />
          );
        })}
      </Ul>
    </div>
  );
};

export default Todo;

const Form = styled.form``;

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  height: 30px;
  margin: 10px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #8258fa;
  height: 30px;
  color: #fff;
  font-weight: 600;
`;

const Ul = styled.ul``;
