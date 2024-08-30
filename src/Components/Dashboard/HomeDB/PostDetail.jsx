import React from 'react';
import { useParams } from 'react-router-dom';
import NavbarDB from '../NavbarDB';
import Sidebar from '../Sidebar';
import { posts } from '../../../assets/post';
import DetailsContentSection from '../HomeDB/DetailsContentSection';

const PostDetail = () => {
  const { postId } = useParams();
  const post = posts.find((post) => post.title.toLowerCase() === postId.toLowerCase());
  const relevantPosts = posts.filter((p) => p.id !== post?.id);

  return (
    <>
      <NavbarDB />

      <div className="grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-2">
          <Sidebar />
        </div>

        {/* Ensure this container can handle scrollable children */}
        <div className="col-span-10 overflow-y-auto">
          <DetailsContentSection post={post} relevantPosts={relevantPosts} />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
