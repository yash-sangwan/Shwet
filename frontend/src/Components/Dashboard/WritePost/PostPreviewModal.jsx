import React, { useEffect, useState } from "react";

const PostPreviewModal = ({
  isOpen,
  onClose,
  title,
  content,
  media,
  source,
  proofSignatures,
}) => {
  const [mediaUrl, setMediaUrl] = useState(media);

  useEffect(() => {
    // Use media directly if it's available
    if (media) {
      // console.log("Media provided:", media);
      setMediaUrl(media);
    } else {
      // Fallback to check if there's a stored media URL in localStorage
      const storedMedia = localStorage.getItem("selectedImage");
      if (storedMedia) {
        // console.log("Media loaded from localStorage:", storedMedia);
        setMediaUrl(storedMedia);
      } else {
        console.log("No media available");
      }
    }
  }, [media]);

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
          className="content mb-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Render Media Image */}
        {mediaUrl ? (
          <div className="mb-4">
            <img
              src={mediaUrl}
              alt="Preview Media"
              className="max-w-full h-auto"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
              onError={(e) => {
                console.error("Image failed to load", e);
                e.target.src = ""; // Optionally set a fallback image
              }}
            />
          </div>
        ) : (
          <div className="mb-4 text-red-500">Image not available</div>
        )}

      

        <div className="text-sm text-gray-500 mb-4">Source: {source}</div>
        {proofSignatures && (
          <div className="text-sm text-gray-500">
            Proof Signatures: {proofSignatures}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPreviewModal;
