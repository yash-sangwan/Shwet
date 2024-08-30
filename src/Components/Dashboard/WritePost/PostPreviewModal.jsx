import React from 'react';

const PostPreviewModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Preview Sheet */}
      <div className="relative bg-white w-11/12 max-w-4xl h-3/4 p-8 rounded-lg shadow-lg overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
};

export default PostPreviewModal;
