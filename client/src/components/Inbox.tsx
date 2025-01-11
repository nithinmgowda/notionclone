import React from 'react';

const Inbox: React.FC = () => {
  return (
    <div className="inbox-content">
      <div className="content-header">
        <h1>Inbox</h1>
      </div>
      <div className="inbox-empty">
        <div className="empty-icon">📥</div>
        <h2>Your inbox is empty</h2>
        <p>Mentions, comments, and notifications will show up here</p>
      </div>
    </div>
  );
};

export default Inbox;
