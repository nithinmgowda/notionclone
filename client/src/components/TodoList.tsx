import React, { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onUpdate: (todos: Todo[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate }) => {
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false
      };
      onUpdate([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    onUpdate(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    onUpdate(updatedTodos);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <h3>To-Do List</h3>
      </div>
      <div className="todo-items">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <div className="todo-checkbox" onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? '☑' : '☐'}
            </div>
            <div className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </div>
            <button 
              className="todo-delete"
              onClick={() => deleteTodo(todo.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a todo..."
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyPress={handleAddTodo}
      />
    </div>
  );
};

export default TodoList;
