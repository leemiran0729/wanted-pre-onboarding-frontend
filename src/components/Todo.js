import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";
import axios from "axios";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
      return;
    }

    axios({
      url: "https://www.pre-onboarding-selection-task.shop/todos",
      method: "get",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("access_token"),
      },
    })
      .then(function (response) {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios({
      url: "https://www.pre-onboarding-selection-task.shop/todos",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("access_token"),
      },
      data: {
        todo: todo,
      },
    })
      .then(function (response) {
        setTodos([...todos, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const handleChecked = (item) => {
    axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${item.id}`,
      method: "put",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      data: {
        todo: item.todo,
        isCompleted: !item.isCompleted,
      },
    });

    const newTodos = todos.map((todo) => {
      if (todo.id === item.id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
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
      <List>
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
      </List>
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
  cursor: pointer;
`;

const List = styled.div`
  border: 1px dotted #8258fa;
  border-radius: 10px;
  margin: 0 auto;
  width: 500px;
`;

const Ul = styled.ul``;
