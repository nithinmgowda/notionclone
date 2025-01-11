import React, { useRef } from 'react';

interface Image {
  id: string;
  url: string;
}

interface ImageGalleryProps {
  images: Image[];
  onUpdate: (images: Image[]) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: Image[] = [];
      
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage: Image = {
            id: Date.now().toString(),
            url: reader.result as string,
          };
          newImages.push(newImage);
          if (newImages.length === files.length) {
            onUpdate([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    onUpdate(updatedImages);
  };

  return (
    <div className="image-gallery-container">
      <div className="gallery-header">
        <h3>Image Gallery</h3>
        <button 
          className="add-image-button"
          onClick={() => fileInputRef.current?.click()}
        >
          Add Images
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </div>
      <div className="gallery-grid">
        {images.map(image => (
          <div key={image.id} className="gallery-item">
            <div className="gallery-image-container">
              <img src={image.url} alt="" />
              <button 
                className="remove-image"
                onClick={() => removeImage(image.id)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
