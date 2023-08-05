import React, { useState } from "react";
import styled from "styled-components";

const Item = ({ todos, item, handleChecked, setTodos }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editedTodo, setEditedTodo] = useState(item.todo);

  const handleEdit = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.todo = editedTodo;
      }
      return todo;
    });

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    alert("수정되었습니다.");
    setIsEdited(false);
  };

  const handleRemove = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    alert("삭제되었습니다.");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleChange = (e) => {
    setEditedTodo(e.target.value);
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
        <SubButton
          data-testid="submit-button"
          onClick={() => handleEdit(item.id)}
        >
          제출
        </SubButton>
        <SubButton
          data-testid="cancel-button"
          onClick={() => setIsEdited(false)}
        >
          취소
        </SubButton>
      </Li>
    );
  } else {
    return (
      <Li key={item.id}>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => handleChecked(item.id)}
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

const Li = styled.li``;

const Span = styled.span``;

const SubButton = styled.button`
  outline: none;
  border: 1px solid #8258fa;
  background-color: #fff;
  color: #8258fa;
  margin: 5px;
  border-radius: 5px;
`;
