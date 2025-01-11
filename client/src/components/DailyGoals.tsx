import React, { useState } from 'react';

interface Goal {
  id: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

interface DailyGoalsProps {
  goals: Goal[];
  onUpdate: (goals: Goal[]) => void;
}

const DailyGoals: React.FC<DailyGoalsProps> = ({ goals, onUpdate }) => {
  const [newGoal, setNewGoal] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleAddGoal = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && newGoal.trim()) {
      e.preventDefault();
      const goal: Goal = {
        id: Date.now().toString(),
        content: newGoal.trim(),
        priority: selectedPriority
      };
      onUpdate([...goals, goal]);
      setNewGoal('');
    }
  };

  const removeGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    onUpdate(updatedGoals);
  };

  const updateGoal = (id: string, content: string) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, content } : goal
    );
    onUpdate(updatedGoals);
  };

  const updatePriority = (id: string, priority: 'high' | 'medium' | 'low') => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, priority } : goal
    );
    onUpdate(updatedGoals);
  };

  return (
    <div className="daily-goals-container">
      <div className="goals-header">
        <h3>Daily Goals</h3>
        <div className="priority-selector">
          <button 
            className={`priority-btn high ${selectedPriority === 'high' ? 'active' : ''}`}
            onClick={() => setSelectedPriority('high')}
          >
            High
          </button>
          <button 
            className={`priority-btn medium ${selectedPriority === 'medium' ? 'active' : ''}`}
            onClick={() => setSelectedPriority('medium')}
          >
            Medium
          </button>
          <button 
            className={`priority-btn low ${selectedPriority === 'low' ? 'active' : ''}`}
            onClick={() => setSelectedPriority('low')}
          >
            Low
          </button>
        </div>
      </div>
      <div className="goals-list">
        {goals.map(goal => (
          <div key={goal.id} className={`goal-card ${goal.priority}`}>
            <textarea
              value={goal.content}
              onChange={(e) => updateGoal(goal.id, e.target.value)}
              className="goal-content"
            />
            <div className="goal-actions">
              <select
                value={goal.priority}
                onChange={(e) => updatePriority(goal.id, e.target.value as 'high' | 'medium' | 'low')}
                className="priority-select"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button 
                className="remove-goal"
                onClick={() => removeGoal(goal.id)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <textarea
        className="new-goal-input"
        placeholder="Add a new goal... (Press Enter to add)"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        onKeyPress={handleAddGoal}
      />
    </div>
  );
};

export default DailyGoals;
