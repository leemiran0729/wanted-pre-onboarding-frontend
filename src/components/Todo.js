import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
    }
  }, []);

  return <div>Todo</div>;
};

export default Todo;
