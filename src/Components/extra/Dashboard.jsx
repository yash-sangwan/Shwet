// src/components/Dashboard.js

import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { PostForm } from "src/components/PostForm";
import { useBlog } from "./BlogContext"; // Adjust the import path
import { useHistory } from "react-router-dom";

export const Dashboard = () => {
  const history = useHistory();
  const [connecting, setConnecting] = useState(false);
  const { connected, select } = useWallet();
  const {
    user,
    posts,
    initialized,
    initUser,
    createPost,
    showModal,
    setShowModal,
  } = useBlog();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const onConnect = () => {
    setConnecting(true);
    select(PhantomWalletName);
  };

  useEffect(() => {
    if (user) {
      setConnecting(false);
    }
  }, [user]);

  return (
    <div className="dashboard background-color overflow-auto h-screen">
      <header className="fixed z-10 w-full h-14 shadow-md">
        <div className="flex justify-between items-center h-full container">
          <h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br from-indigo-300 colorpink">
              Onaki
            </div>
          </h2>
          {connected ? (
            <div className="flex items-center">
              <p className="font-bold text-sm ml-2 capitalize underlinepink cursor-pointer">
                Home
              </p>
              <p className="font-bold text-sm ml-2 capitalize mr-4 underlinepink cursor-pointer">
                Blog
              </p>
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
                />
              )}
              <p className="font-bold text-sm ml-2 capitalize">
                {user?.name}
              </p>
              {initialized ? (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    initUser();
                  }}
                >
                  Initialize User
                </Button>
              )}
            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28"
              onClick={onConnect}
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
            >
              Connect
            </Button>
          )}
        </div>
      </header>
      <main className="dashboard-main pb-4 container flex relative pt-16">
        <div className="pt-3 w-full">
          {/* Featured Post */}
          <article className="best-post">
            <div
              className="best-post-image"
              style={{
                backgroundImage: `url("https://user-images.githubusercontent.com/62637513/184338364-a14b7272-d1dc-49f3-9f43-3ac37dacbe85.png")`,
              }}
            ></div>
            <div className="best-post-content">
              <div className="best-post-content-cat">
                December 2, 2021<span className="dot"> </span>Blog
              </div>
              <div className="best-post-content-title">
                Lorem ipsum dolor sit amet, consectetur
              </div>
              <div className="best-post-content-sub">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </div>
            </div>
          </article>

          {/* All Posts */}
          <div className="all__posts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {posts.length > 0 ? (
              posts.map((item) => (
                <article
                  className="post__card-2 cursor-pointer"
                  onClick={() => {
                    history.push(`/read-post/${item.publicKey.toString()}`);
                  }}
                  key={item.publicKey.toString()}
                >
                  <div className="post__card_-2 shadow-lg rounded-lg overflow-hidden">
                    <div
                      className="post__card__image-2 h-48 bg-cover bg-center"
                      style={{
                        backgroundImage: `url("https://user-images.githubusercontent.com/62637513/184338539-9cdbdc58-1e72-4c48-8203-0b7ec23d3eb0.png")`,
                      }}
                    ></div>
                    <div className="p-4">
                      <div className="post__card_meta-2">
                        <div className="post__card_cat text-gray-500 text-sm">
                          {new Date().toLocaleDateString()}<span className="dot">•</span>{" "}
                          {item.title}
                        </div>
                        <p className="post__card_alttitle-2 text-lg font-semibold mt-2">
                          {item.content.length > 100
                            ? `${item.content.substring(0, 100)}...`
                            : item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts available.</p>
            )}
          </div>
        </div>

        {/* Create Post Modal */}
        {showModal && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="modal-content bg-white rounded-lg p-6 relative w-11/12 md:w-1/2 lg:w-1/3">
              <span
                className="close-button absolute top-2 right-2 text-gray-600 text-2xl cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                &times;
              </span>
              <PostForm
                postTitle={postTitle}
                postContent={postContent}
                setPostTitle={setPostTitle}
                setPostContent={setPostContent}
                onSubmit={() => {
                  createPost(postTitle, postContent);
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
