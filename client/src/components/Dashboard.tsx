import React from 'react';
import { useStore } from '../store/store';
import Templates from './Templates';

const Dashboard: React.FC = () => {
  const { pages, setCurrentPage, setCurrentView } = useStore();

  const sortedPages = Object.values(pages).sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const recentPages = sortedPages.slice(0, 6);

  const handlePageClick = (pageId: string) => {
    setCurrentPage(pageId);
    setCurrentView('page');
  };

  const getCurrentTime = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{getCurrentTime()}, Nithin .m</h1>
      </div>

      <div className="dashboard-sections">
        <section className="recent-section">
          <div className="section-header">
            <h2>
              <span className="section-icon">🕒</span>
              Recently visited
            </h2>
          </div>
          <div className="recent-pages">
            {recentPages.map(page => (
              <div 
                key={page.id}
                className="page-card"
                onClick={() => handlePageClick(page.id)}
              >
                <div className="card-icon">{page.icon}</div>
                <div className="card-content">
                  <div className="card-title">{page.title}</div>
                  <div className="card-date">
                    <span className="date-icon">📅</span>
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="templates-section">
          <Templates />
        </section>

        <section className="quick-actions">
          <div className="section-header">
            <h2>
              <span className="section-icon">⚡</span>
              Quick Actions
            </h2>
          </div>
          <div className="actions-grid">
            <button onClick={() => handlePageClick('new-page')} className="action-button">
              <span className="action-icon">📝</span>
              New Page
            </button>
            <button className="action-button">
              <span className="action-icon">📸</span>
              New Photo Collection
            </button>
            <button className="action-button">
              <span className="action-icon">📅</span>
              New Daily Log
            </button>
            <button className="action-button">
              <span className="action-icon">📊</span>
              New Project
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
