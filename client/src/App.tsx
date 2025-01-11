import React from 'react';
import { useStore } from './store/store';
import Page from './components/Page';
import Search from './components/Search';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Inbox from './components/Inbox';
import NotionAI from './components/NotionAI';
import './App.css';

function App() {
  const { 
    pages, 
    currentPage,
    currentView, 
    setCurrentPage,
    setCurrentView,
    setSearchOpen,
    addPage
  } = useStore();

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
    setCurrentPage(newPage.id);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'inbox':
        return <Inbox />;
      case 'ai':
        return <NotionAI />;
      case 'dashboard':
        return <Dashboard />;
      case 'page':
        return currentPage ? <Page id={currentPage} /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-top">
          <div className="workspace-switcher">
            <span className="workspace-icon">N</span>
            <span className="workspace-name">Nithin .m's workspace</span>
            <span className="workspace-arrow">▾</span>
          </div>
          
          <div 
            className="search-bar"
            onClick={() => setSearchOpen(true)}
          >
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search" 
              readOnly
            />
          </div>

          <div className="quick-actions">
            <div 
              className={`action-item ${currentView === 'ai' ? 'active' : ''}`}
              onClick={() => setCurrentView('ai')}
            >
              <span className="action-icon">✨</span>
              <span>Notion AI</span>
            </div>
            <div 
              className={`action-item ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              <span className="action-icon">🏠</span>
              <span>Home</span>
            </div>
            <div 
              className={`action-item ${currentView === 'inbox' ? 'active' : ''}`}
              onClick={() => setCurrentView('inbox')}
            >
              <span className="action-icon">📥</span>
              <span>Inbox</span>
            </div>
          </div>

          <div className="section-header">
            <span>Private</span>
            <span className="section-toggle">▾</span>
          </div>

          <div className="pages-list">
            {Object.values(pages).map(page => (
              <div 
                key={page.id} 
                className={`page-item ${currentPage === page.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(page.id)}
              >
                <span className="page-icon">{page.icon}</span>
                <span className="page-title">{page.title}</span>
              </div>
            ))}
            <div 
              className="page-item add-page"
              onClick={handleAddPage}
            >
              <span className="page-icon">+</span>
              <span className="page-title">Add a page</span>
            </div>
          </div>
        </div>

        <div className="sidebar-bottom">
          {/* Empty sidebar bottom */}
        </div>
      </div>

      <div className="content">
        {renderContent()}
      </div>
      <Search />
    </div>
  );
}

export default App;
