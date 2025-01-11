import React, { useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      {currentImage ? (
        <div className="image-preview" onClick={handleClick}>
          <img src={currentImage} alt="Page cover" />
          <div className="image-overlay">
            <span>Change cover</span>
          </div>
        </div>
      ) : (
        <div className="image-upload-placeholder" onClick={handleClick}>
          <span className="upload-icon">🖼️</span>
          <span>Add cover</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
