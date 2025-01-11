import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type "/" for commands...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
