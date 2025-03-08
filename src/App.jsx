import React, { useEffect, useState } from 'react';
import './styles.css';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';

//REACT FORMAT
//hooks
//helper functions
//jsx

const App = () => {
  //NOTE: never render hooks conditionally
  //i.e you cant put hooks in ifs, in loops;
  //you cant put them after returns
  //ALWAYS put them at the very top of your file
  //hook 1
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  //hook 2
  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  //helper function 1
  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  //helper function 2
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
          };
        }
        return todo;
      });
    });
  }

  //helper function 3
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  //jsx
  return (
    <>
      <NewTodoForm onSubmit={addTodo} />

      <h1>Todo List</h1>

      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
};

export default App;
