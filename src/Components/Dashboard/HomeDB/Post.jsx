import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock backend request function for demo purposes
const mockBackendRequest = (action, data) => {
  console.log(`Backend request made for: ${action}`, data);
  // Simulate a backend request delay
  return new Promise((resolve) => setTimeout(resolve, 500));
};

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []); // State to hold comments
  const [newComment, setNewComment] = useState(''); // State to manage new comment input

  const textareaRef = useRef(null); // Reference to the textarea

  // Function to toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const navigate = useNavigate(); // Navigation hook

  const navigateToDetail = () => {
    navigate(`/read/home/${post.title.toLowerCase()}`);
  };

  // Function to toggle comment visibility
  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

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

  // Function to handle new comment input
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Function to dynamically adjust the height of the textarea
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  // Function to handle posting a new comment
  const handlePostComment = async () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        userProfileImage: post.userProfileImage,
        userName: 'Current User', // Replace with actual username
        date: new Date().toLocaleString(),
        content: newComment,
      };

      // Update comments state to include the new comment
      setComments([...comments, newCommentData]);
      setNewComment(''); // Clear input field

      // Reset textarea height after posting a comment
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      // Simulate a backend request to post a new comment
      await mockBackendRequest('postComment', newCommentData);
    }
  };

  // Check if the content length is more than 180 characters
  const isContentLong = post.content.length > 180;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-md mx-auto mb-6 flex flex-col justify-between h-full" >
      {/* User Information */}
      <div onClick={navigateToDetail}>
        <div className="flex items-center mb-4">
          <img
            src={post.userProfileImage}
            alt={post.userName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-bold text-white">{post.userName}</h2>
            <p className="text-xs text-gray-400">{post.date}</p>
          </div>
        </div>

        {/* Post Title */}
        <h3 className="font-semibold text-white text-lg mb-2">{post.title}</h3>

        {/* Post Content */}
        <p className="text-sm text-gray-200 ">
          {isExpanded ? post.content : `${post.content.substring(0, 180)}...`}
        </p>

        {/* Conditionally Render Expand/Collapse Button */}
        {isContentLong && (
          <button className="text-blue-500 text-sm mb-4" onClick={toggleExpand}>
            {isExpanded ? 'Show less' : '...more'}
          </button>
        )}

        {/* Image or Visual Element */}
        {post.image && (
          <img src={post.image} alt="Post Visual" className="mt-4 w-full h-auto rounded-lg mb-4" />
        )}
      </div>

      {/* New "See Proof" Button */}
      <div className="mb-4 flex justify-between">
        <button className="bg-primary hover:bg-secondary text-black font-semibold py-1 px-3 rounded shadow-sm">
          See Proof
        </button>
      </div>

      {/* Action Icons */}
      <div className="flex justify-between mt-auto">
        {/* Comment Icon */}
        <button
          className="text-gray-400 hover:text-white flex items-center space-x-1"
          onClick={toggleComments}
        >
          <i className="fa-regular fa-comment"></i>
          <span>{comments.length}</span>
        </button>

        {/* Like Icon */}
        <button
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-white`}
          onClick={handleLike}
        >
          <i className="fa-solid fa-heart"></i>
          <span>{likesCount}</span>
        </button>

      {/* New "Verify" Button */}
        <button className="text-green-500 hover:text-white font-semibold text-sm">
          Verify
        </button>

        {/* View Icon */}
        <button className="text-gray-400 hover:text-white flex items-center space-x-1">
          <i className="fa-solid fa-chart-column"></i>
          <span className='text-xs'>791</span>
        </button>
        

        <div className="flex justify-end items-center space-x-5">
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


      {/* Comment Section */}
      {isCommentsVisible && (
        <div className="bg-gray-700 rounded-lg shadow-md p-4 mt-4">
          <h4 className="text-white font-semibold mb-4">Comments</h4>
          {/* Display Existing Comments */}
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start mb-4">
              <img
                src={comment.userProfileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <h2 className="font-bold text-white">{comment.userName}</h2>
                <p className="text-xs text-gray-400">{comment.date}</p>
                <p className="text-sm text-gray-200 mb-2">{comment.content}</p>
              </div>
            </div>
          ))}

          {/* Add New Comment */}
          <div className="flex items-start mt-4">
            <img
              src={post.userProfileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <textarea
              ref={textareaRef}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-600 text-white p-2 rounded mr-2 resize-none overflow-hidden"
              value={newComment}
              onChange={handleCommentChange}
              onInput={autoResizeTextarea}
              style={{ minHeight: '40px' }}
            />
            <button
              className="bg-primary hover:bg-secondary text-black font-semibold py-1 px-3 rounded shadow-sm"
              onClick={handlePostComment}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
