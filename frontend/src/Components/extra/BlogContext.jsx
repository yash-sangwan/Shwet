// src/context/BlogContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { Program } from "@project-serum/anchor";
import { getProgram } from "../../Utils/anchorClient"; // Assuming you have this utility
import { getPosts } from "./getPosts";
import { useWallet } from "@solana/wallet-adapter-react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const { wallet, connected } = useWallet();
  const [program, setProgram] = useState(null);
  const [user, setUser] = useState(null); // User object
  const [posts, setPosts] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (wallet && connected) {
      const programInstance = getProgram(wallet);
      setProgram(programInstance);
    }
  }, [wallet, connected]);

  useEffect(() => {
    if (program) {
      // Fetch posts when program is ready
      const [postsObservable, cancelFetch] = getPosts({ program });

      const subscription = postsObservable.subscribe({
        next: (post) => {
          setPosts((prevPosts) => [...prevPosts, post]);
        },
        error: (err) => {
          console.error("Error fetching posts:", err);
        },
        complete: () => {
          console.log("All posts fetched.");
        },
      });

      // Cleanup on unmount
      return () => {
        cancelFetch();
        subscription.unsubscribe();
      };
    }
  }, [program]);

  const initUser = async () => {
    // Implement user initialization logic
    // For example, create a user account on the Solana program
    try {
      // Example placeholder logic
      // const tx = await program.methods.initializeUser().rpc();
      // setInitialized(true);
      console.log("User initialized.");
      setInitialized(true);
    } catch (error) {
      console.error("Error initializing user:", error);
    }
  };

  const createPost = async (title, content) => {
    // Implement post creation logic
    try {
      // Example placeholder logic
      // const tx = await program.methods.createPost(title, content).rpc();
      console.log(`Post created: ${title}`);
      // Optionally, you can refetch posts or update state accordingly
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        user,
        posts,
        initialized,
        initUser,
        createPost,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
