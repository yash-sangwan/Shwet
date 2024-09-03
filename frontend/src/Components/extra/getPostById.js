// src/context/functions/getPostById.js

import { PublicKey, SystemProgram } from "@solana/web3.js";

/**
 * Fetches a post by its ID from the Solana program.
 * @param {string} postId - The public key string of the post account.
 * @param {Program} program - The Anchor program instance.
 * @returns {Object|null} The post object or null if not found/invalid.
 */
export async function getPostById(postId, program) {
  try {
    const postPublicKey = new PublicKey(postId);
    const postAccount = await program.account.post.fetch(postPublicKey);

    // Validate the user field
    const userId = postAccount.user.toString();
    if (userId === SystemProgram.programId.toString()) {
      // Invalid user, skip this post
      return null;
    }

    return {
      id: postAccount.id, // Assuming id is stored as u8
      title: postAccount.title,
      media: postAccount.media,
      content: postAccount.content,
      source: postAccount.source,
      proof: postAccount.proof,
      userId,
      authority: postAccount.authority.toString(),
      publicKey: postPublicKey, // Include publicKey for navigation
    };
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error.message);
    return null;
  }
}
