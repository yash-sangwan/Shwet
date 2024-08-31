import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getProgram } from '../../../Utils/anchorClient';
import { getPostById } from './functions/getPostById';
import Post from './Post';

const userPublicKeys = ['8SzEAvWdWoWyPKScZCfWRKMKTTdhCT3v1CknL7Aew9ar']; // Replace with your actual addresses

const PostLoop = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wallet } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const fetchPostsForUsers = async () => {
      try {
        if (!wallet || !connection) {
          console.error('Wallet or connection is not available');
          setLoading(false);
          return;
        }

        const program = getProgram(wallet.adapter);

        let allPosts = [];
        for (const userPubKey of userPublicKeys) {
          const userKey = new PublicKey(userPubKey);
          console.log('Fetching posts for user:', userKey.toBase58());

          try {
            // Fetch user details - Replace with actual method
            const userPosts = await program.account.user.fetch(userKey); // Replace 'user' with your actual account name

            console.log('Fetched user details:', userPosts);

            for (const postId of userPosts.postIds) { // Ensure 'postIds' is the correct property
              const post = await getPostById(postId, program);
              if (post) {
                allPosts.push(post);
              }
            }
          } catch (userError) {
            console.error('Error fetching user details:', userError);
          }
        }

        console.log('All posts:', allPosts);
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsForUsers();
  }, [wallet, connection]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="post-loop-container">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post key={index} post={post} />
        ))
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
};

export default PostLoop;
