import React from 'react';

const NotionAI: React.FC = () => {
  return (
    <div className="ai-content">
      <div className="content-header">
        <h1>Notion AI</h1>
      </div>
      <div className="ai-features">
        <div className="ai-feature">
          <div className="feature-icon">✨</div>
          <h3>Writing assistant</h3>
          <p>Get help with writing, editing, and brainstorming</p>
        </div>
        <div className="ai-feature">
          <div className="feature-icon">📝</div>
          <h3>Analysis & Insights</h3>
          <p>Extract key insights and summaries from your content</p>
        </div>
        <div className="ai-feature">
          <div className="feature-icon">🎯</div>
          <h3>Task Management</h3>
          <p>Generate action items and organize your tasks</p>
        </div>
      </div>
    </div>
  );
};

export default NotionAI;
