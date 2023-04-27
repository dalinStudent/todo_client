import { Todo } from "../../interfaces/todo";

export const fetchTodoService = async () => {
  const response = await fetch(`https://yl7qyo-5000.csb.app/api/todo`);
  return response.json();
};

export const createTodoService = async (newTodo: any) => {
  const existingTodos = await fetch(
    "https://yl7qyo-5000.csb.app/api/todo"
  ).then(res => res.json());
  const existingTodo = existingTodos.find(
    (todo: any) => todo.todo === newTodo.todo
  );

  if (existingTodo) {
    throw new Error("Todo already exists");
  }

  const response = await fetch(`https://yl7qyo-5000.csb.app/api/todo`, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.json();
};

export const updateTodoService = async (updateTodo: Todo) => {
  const existingTodos = await fetch(
    "https://yl7qyo-5000.csb.app/api/todo"
  ).then(res => res.json());
  const existingTodo = existingTodos.find(
    (todo: any) => todo.todo === updateTodo.todo
  );

  if (existingTodo) {
    throw new Error("Todo already exists");
  }
  const response = await fetch(
    `https://yl7qyo-5000.csb.app/api/todo/${updateTodo.id}`,
    {
      method: "PUT",
      body: JSON.stringify(updateTodo),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return response.json();
};

export const removeTodoService = async (id: any) => {
  const response = await fetch(`https://yl7qyo-5000.csb.app/api/todo/${id}`, {
    method: "DELETE"
  });
  return response.json();
};

export const test = "*";
