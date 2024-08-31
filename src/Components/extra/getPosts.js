// src/context/functions/getPosts.js

import { Observable } from "rxjs";
import { getPostById } from "./getPostById";

/**
 * Fetches all posts from the Solana program.
 * @param {Object} args - Arguments containing the program instance.
 * @param {Program} args.program - The Anchor program instance.
 * @returns {[Observable, Function]} An observable of posts and a cancel function.
 */
export function getPosts({ program }) {
  let isCancelled = false;

  const cancel = () => {
    isCancelled = true;
  };

  const observer = new Observable(async (subscriber) => {
    try {
      // Fetch all post accounts
      const allPosts = await program.account.post.all();

      for (const postAccount of allPosts) {
        if (isCancelled) {
          subscriber.complete();
          return;
        }

        const post = await getPostById(postAccount.publicKey.toString(), program);
        if (post) {
          subscriber.next(post);
        }
      }

      subscriber.complete();
    } catch (error) {
      subscriber.error(error);
    }
  });

  return [observer, cancel];
}
