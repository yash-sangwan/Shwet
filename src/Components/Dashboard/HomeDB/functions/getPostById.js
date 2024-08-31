import { PublicKey } from "@solana/web3.js";

export async function getPostById(postId, program) {
  try {
    const postAccount = await program.account.post.fetch(new PublicKey(postId));
    const userId = postAccount.user.toString();

    return {
      id: postId,
      title: postAccount.title,
      media: postAccount.media,
      content: postAccount.content,
      source: postAccount.source,
      proof: postAccount.proof,
      userId,
    };
  } catch (e) {
    console.error('Error fetching post by ID:', e.message);
    return null;
  }
}
