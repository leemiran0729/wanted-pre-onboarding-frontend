import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Item = ({ todos, item, handleChecked, setTodos }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editedTodo, setEditedTodo] = useState(item.todo);

  const handleEdit = (item) => {
    axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${item.id}`,
      method: "put",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      data: {
        todo: editedTodo,
        isCompleted: item.isCompleted,
      },
    });

    const newTodos = todos.map((todo) => {
      if (todo.id === item.id) {
        todo.todo = editedTodo;
      }
      return todo;
    });

    setTodos(newTodos);

    alert("수정되었습니다.");
    setIsEdited(false);
  };

  const handleRemove = (id) => {
    axios({
      url: `https://www.pre-onboarding-selection-task.shop/todos/${item.id}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("access_token"),
      },
    });

    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    alert("삭제되었습니다.");
  };

  const handleChange = (e) => {
    setEditedTodo(e.target.value);
  };

  const handleCancel = () => {
    setIsEdited(false);
  };

  if (isEdited) {
    return (
      <Li>
        <input
          type="text"
          data-testid="modify-input"
          value={editedTodo}
          onChange={handleChange}
        />
        <SubButton data-testid="submit-button" onClick={() => handleEdit(item)}>
          제출
        </SubButton>
        <SubButton data-testid="cancel-button" onClick={handleCancel}>
          취소
        </SubButton>
      </Li>
    );
  } else {
    return (
      <Li key={item.id}>
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => handleChecked(item)}
        />
        <Span>{item.todo}</Span>
        <SubButton
          data-testid="modify-button"
          onClick={() => setIsEdited(true)}
        >
          수정
        </SubButton>
        <SubButton
          data-testid="delete-button"
          onClick={() => handleRemove(item.id)}
        >
          삭제
        </SubButton>
      </Li>
    );
  }
};

export default Item;

const Li = styled.li`
  list-style: none;
`;

const Span = styled.span``;

const SubButton = styled.button`
  outline: none;
  border: 1px solid #8258fa;
  background-color: #fff;
  color: #8258fa;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #8258fa;
    color: #fff;
  }
`;
