import React from 'react';
import { useStore } from '../store/store';

const Home: React.FC = () => {
  const { pages } = useStore();

  const getCurrentTime = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="home-content">
      <div className="content-header">
        <h1>{getCurrentTime()}, Nithin .m</h1>
      </div>

      <div className="content-sections">
        <section className="recent-section">
          <h2>
            <span className="section-icon">🕒</span>
            Recently visited
          </h2>
          <div className="recent-pages">
            {Object.values(pages).slice(0, 3).map(page => (
              <div 
                key={page.id}
                className="recent-page-card"
              >
                <div className="card-icon">{page.icon}</div>
                <div className="card-title">{page.title}</div>
                <div className="card-date">
                  <span className="date-icon">N</span>
                  {new Date(page.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
