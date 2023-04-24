import { Todo } from "../../interfaces/todo";

export const fetchTodoService = async () => {
    const response = await fetch(`http://localhost:5000/api/todo`);
    return (response.json());
};

export const createTodoService = async (newTodo: any) => {
    const existingTodos = await fetch('http://localhost:5000/api/todo').then((res) => res.json());
    const existingTodo = existingTodos.find((todo: any) => todo.todo === newTodo.todo);
  
    if (existingTodo) {
      throw new Error('Todo already exists');
    }
  
    const response = await fetch(`http://localhost:5000/api/todo`, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return response.json();
};
  
export const updateTodoService = async(updateTodo: Todo) => {
  const response = await fetch(`http://localhost:5000/api/todo/${updateTodo.id}`, {
    method: 'PUT',
    body: JSON.stringify(updateTodo),
      headers: {
        'Content-Type': 'application/json',
      },
  });
  return (response.json());
}

export const removeTodoService = async (id: any) => {
    const response = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: 'DELETE'
    },
    );
    return (response.json());
}

export const test = '*';