import React, { useState } from 'react';
import { useStore } from '../store/store';
import Editor from './Editor';
import ImageUpload from './ImageUpload';
import TodoList from './TodoList';
import ImageGallery from './ImageGallery';
import DailyGoals from './DailyGoals';

interface PageProps {
  id: string;
}

interface Section {
  id: string;
  type: 'todo' | 'goals' | 'gallery' | 'editor';
}

const Page: React.FC<PageProps> = ({ id }) => {
  const { pages, updatePage } = useStore();
  const page = pages[id];
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    { id: '1', type: 'todo' },
    { id: '2', type: 'goals' },
    { id: '3', type: 'gallery' },
    { id: '4', type: 'editor' }
  ]);

  if (!page) return <div>Page not found</div>;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePage(id, { title: e.target.value });
  };

  const handleContentChange = (newContent: string) => {
    updatePage(id, { content: newContent });
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updatePage(id, { coverImage: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleTodosUpdate = (todos: any[]) => {
    updatePage(id, { todos });
  };

  const handleImagesUpdate = (images: any[]) => {
    updatePage(id, { images });
  };

  const handleGoalsUpdate = (goals: any[]) => {
    updatePage(id, { goals });
  };

  const addNewSection = (type: 'todo' | 'goals' | 'gallery' | 'editor') => {
    setSections([...sections, { id: Date.now().toString(), type }]);
  };

  const removeSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'todo':
        return (
          <div className="content-section" key={section.id}>
            <div className="section-header">
              <button className="remove-section" onClick={() => removeSection(section.id)}>×</button>
            </div>
            <TodoList todos={page.todos} onUpdate={handleTodosUpdate} />
          </div>
        );
      case 'goals':
        return (
          <div className="content-section" key={section.id}>
            <div className="section-header">
              <button className="remove-section" onClick={() => removeSection(section.id)}>×</button>
            </div>
            <DailyGoals goals={page.goals} onUpdate={handleGoalsUpdate} />
          </div>
        );
      case 'gallery':
        return (
          <div className="content-section" key={section.id}>
            <div className="section-header">
              <button className="remove-section" onClick={() => removeSection(section.id)}>×</button>
            </div>
            <ImageGallery images={page.images} onUpdate={handleImagesUpdate} />
          </div>
        );
      case 'editor':
        return (
          <div className="content-section" key={section.id}>
            <div className="section-header">
              <button className="remove-section" onClick={() => removeSection(section.id)}>×</button>
            </div>
            <Editor content={page.content} onChange={handleContentChange} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page">
      <ImageUpload 
        onImageUpload={handleImageUpload}
        currentImage={page.coverImage}
      />
      <div className="page-header">
        <div className="page-icon">{page.icon}</div>
        {isEditingTitle ? (
          <input
            type="text"
            value={page.title}
            onChange={handleTitleChange}
            onBlur={() => setIsEditingTitle(false)}
            autoFocus
            className="page-title-input"
          />
        ) : (
          <h1 
            className="page-title"
            onClick={() => setIsEditingTitle(true)}
          >
            {page.title}
          </h1>
        )}
      </div>

      <div className="add-section-buttons">
        <button onClick={() => addNewSection('todo')}>Add Todo List</button>
        <button onClick={() => addNewSection('goals')}>Add Daily Goals</button>
        <button onClick={() => addNewSection('gallery')}>Add Image Gallery</button>
        <button onClick={() => addNewSection('editor')}>Add Text Editor</button>
      </div>

      <div className="page-content">
        {sections.map(renderSection)}
      </div>
    </div>
  );
};

export default Page;
