import React, { useState } from 'react';
import { useStore } from '../store/store';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const { pages, addPage, setCurrentPage } = useStore();
  const [viewType, setViewType] = useState<'gallery' | 'list'>('gallery');
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'To-do', completed: false },
    { id: '2', text: 'Completed To-do', completed: true },
  ]);

  const handleAddPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      title: 'Untitled',
      icon: '📄',
      content: '',
      todos: [],
      images: [],
      goals: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addPage(newPage);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Nithin's Dashboard</h1>
        <div className="dashboard-actions">
          <div className="view-toggle">
            <button 
              className={`view-button ${viewType === 'gallery' ? 'active' : ''}`}
              onClick={() => setViewType('gallery')}
            >
              <span className="view-icon">⊞</span> Gallery view
            </button>
            <button className="new-button">
              <span>New</span>
              <span className="dropdown-arrow">▾</span>
            </button>
          </div>
          <div className="action-buttons">
            <button className="icon-button">≡</button>
            <button className="icon-button">↓</button>
            <button className="icon-button">⚡</button>
            <button className="icon-button">🔍</button>
            <button className="icon-button">⋯</button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="todo-section">
          {todos.map(todo => (
            <div 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              <span className="checkbox">
                {todo.completed ? '☑' : '☐'}
              </span>
              <span className="todo-text">{todo.text}</span>
            </div>
          ))}
        </div>

        <div className="pages-grid">
          {Object.values(pages).map(page => (
            <div 
              key={page.id} 
              className="page-card"
              onClick={() => setCurrentPage(page.id)}
            >
              <div className="page-card-icon">{page.icon}</div>
              <div className="page-card-title">{page.title}</div>
            </div>
          ))}
          <div 
            className="page-card add-page"
            onClick={handleAddPage}
          >
            <div className="add-page-content">
              <span>+</span>
              <span>New page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
