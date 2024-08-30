import React, { useState } from 'react';
import Post from './Post';

// Mock backend request function for demo purposes
const mockBackendRequest = (action, data) => {
  console.log(`Backend request made for: ${action}`, data);
  return new Promise((resolve) => setTimeout(resolve, 500));
};

const DetailsContentSection = ({ post, relevantPosts }) => {
  if (!post) {
    return <p className="text-white">Post not found.</p>;
  }

  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments ? post.comments.length : 0);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  // Function to handle like button click
  const handleLike = async () => {
    if (!isLiked) {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
      await mockBackendRequest('like');
    } else {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
      await mockBackendRequest('unlike');
    }
  };

  // Function to toggle comment visibility
  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <div className="pt-16 bg-gray-900 h-full overflow-y-auto p-6 flex justify-center">
      <div className="max-w-4xl w-full">
        {/* Main Headline */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-4">{post.title}</h1>

        {/* Posted by and Date */}
        <div className="mb-6 text-gray-400 flex justify-between items-center">
          <span className="block">By {post.userName}</span>
          <span className="block text-xs">Published • {post.date}</span>
        </div>

        {/* Full Content with Images */}
        <div className="text-white leading-relaxed mb-8">
          <p className="mb-4">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post Image"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}
        </div>

        {/* Buttons for Proof and Verify */}
        <div className="mb-8 flex justify-between">
          <button className="bg-primary hover:bg-secondary text-black font-semibold py-1 px-3 rounded shadow-sm">
            See Proof
          </button>
         
        </div>

        {/* Bottom Action Bar */}
        <div className="flex justify-between items-center mt-4">
          {/* Comment Icon */}
          <button
            className="text-gray-400 hover:text-white flex items-center space-x-1"
            onClick={toggleComments}
          >
            <i className="fa-regular fa-comment"></i>
            <span>{commentsCount}</span>
          </button>

          {/* Like Icon */}
          <button
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-white`}
            onClick={handleLike}
          >
            <i className="fa-solid fa-heart"></i>
            <span>{likesCount}</span>
          </button>

          {/* Verify Button */}
          <button className="text-green-500 hover:text-white font-semibold text-sm">
            Verify
          </button>

          {/* Views Icon */}
          <button className="text-gray-400 hover:text-white flex items-center space-x-1">
            <i className="fa-solid fa-chart-column"></i>
            <span className='text-xs'>791</span>
          </button>

          <div className="flex items-center space-x-5">
            {/* Bookmark Icon */}
            <button className="text-gray-400 hover:text-white flex items-center">
              <i className="fa-regular fa-bookmark"></i>
            </button>

            {/* Share Icon */}
            <button className="text-gray-400 hover:text-white flex items-center">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </button>
          </div>
        </div>

        {/* Relevant Posts Section */}
        <div className="mt-6">
          <h2 className="text-white text-2xl font-semibold mb-4">Relevant Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {relevantPosts.map((relevantPost) => (
              <Post key={relevantPost.id} post={relevantPost} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsContentSection;



