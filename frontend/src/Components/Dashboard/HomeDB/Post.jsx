import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProofModel from "./ProofModel";
import VerifyModel from "./VerifyModel";

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [currentProofData, setCurrentProofData] = useState(post.proofData || null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  if (!post || !post.content) {
    return <div>No post data available.</div>;
  }

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const navigateToDetail = () => {
    console.log(post.title);
    // navigate(`/read/home/${post.title.toLowerCase()}`);
  };
  const toggleComments = () => setIsCommentsVisible(!isCommentsVisible);

  const handleLike = () => {
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        userProfileImage: post.userProfileImage,
        userName: "Current User",
        date: new Date().toLocaleString(),
        content: newComment,
      };
      setComments([...comments, newCommentData]);
      setNewComment("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    }
  };

  const isContentLong = post.content.length > 180;

  const openProofModal = () => setIsProofModalOpen(true);
  const closeProofModal = () => setIsProofModalOpen(false);

  const openVerifyModal = () => setIsVerifyModalOpen(true);
  const closeVerifyModal = () => setIsVerifyModalOpen(false);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-full max-w-md mx-auto mb-6 flex flex-col justify-between h-full">
      <div onClick={navigateToDetail}>
        <div className="flex items-center mb-4">
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-bold text-white">John Doe</h2>
            <p className="text-xs text-gray-400">{post.date}</p>
          </div>
        </div>

        <h3 className="font-semibold text-white text-lg mb-2">{post.title}</h3>

        <p className="text-sm text-gray-200">
          {isExpanded ? post.content : `${post.content.substring(0, 180)}...`}
        </p>

        {isContentLong && (
          <button className="text-blue-500 text-sm mb-4" onClick={toggleExpand}>
            {isExpanded ? "Show less" : "...more"}
          </button>
        )}

        {post.image && (
          <img
            src={post.image}
            alt="Post Visual"
            className="mt-4 w-full h-auto rounded-lg mb-4"
          />
        )}
      </div>

      <div className="mb-4 flex justify-between">
        <button
          className="bg-primary hover:bg-secondary text-black font-semibold py-1 px-3 rounded shadow-sm"
          onClick={openProofModal}
        >
          See Proof
        </button>
      </div>

      <div className="flex justify-between mt-auto">
        <button
          className="text-gray-400 hover:text-white flex items-center space-x-1"
          onClick={toggleComments}
        >
          <i className="fa-regular fa-comment"></i>
          <span>{comments.length}</span>
        </button>

        <button
          className={`flex items-center space-x-1 ${
            isLiked ? "text-red-500" : "text-gray-400"
          } hover:text-white`}
          onClick={handleLike}
        >
          <i className="fa-solid fa-heart"></i>
          <span>{likesCount}</span>
        </button>

        <button
          className="text-green-500 hover:text-white font-semibold text-sm"
          onClick={openVerifyModal}
        >
          Verify
        </button>

        <button className="text-gray-400 hover:text-white flex items-center space-x-1">
          <i className="fa-solid fa-chart-column"></i>
          <span className="text-xs">791</span>
        </button>

        <div className="flex justify-end items-center space-x-5">
          <button className="text-gray-400 hover:text-white flex items-center">
            <i className="fa-regular fa-bookmark"></i>
          </button>

          <button className="text-gray-400 hover:text-white flex items-center">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </button>
        </div>
      </div>

      {isCommentsVisible && (
        <div className="bg-gray-700 rounded-lg shadow-md p-4 mt-4">
          <h4 className="text-white font-semibold mb-4">Comments</h4>
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
              style={{ minHeight: "40px" }}
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

      <ProofModel
        isOpen={isProofModalOpen}
        onClose={closeProofModal}
        existingProofData={currentProofData}
      />

      <VerifyModel isOpen={isVerifyModalOpen} onClose={closeVerifyModal} />
    </div>
  );
};

export default Post;
