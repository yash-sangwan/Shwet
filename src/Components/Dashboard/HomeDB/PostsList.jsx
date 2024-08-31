import React from 'react';
import Post from './Post'; // or PostLoop if it's a wrapper for multiple posts

const PostsList = ({ posts, isGridView }) => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} isGridView={isGridView} /> // Pass post data and isGridView to Post
      ))}
    </>
  );
};

export default PostsList;
