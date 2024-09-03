import { AnchorProvider, Program } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../extra/getPostById";
import idl from "../../../idl.json";
import Sidebar from "../../../Components/Dashboard/Sidebar"

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

function getProgram(provider) {
  return new Program(idl, PROGRAM_KEY, provider);
}

const PostDetail = () => {
  const { postId } = useParams();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [provider, setProvider] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }
  }, [connection, wallet]);

  useEffect(() => {
    const fetchPost = async () => {
      if (provider) {
        try {
          const program = getProgram(provider);
          const fetchedPost = await getPostById(postId, program);
          setPost(fetchedPost);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    };

    fetchPost();
  }, [provider, postId]);

  if (!post) {
    return (
      <div className="grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 flex justify-center items-center">
          <h1 className="text-white text-2xl">Post not found.</h1>
        </div>
      </div>
    );
  }

  const relevantPosts = []; // Add logic to filter relevant posts if needed

  return (
    <>
      <NavbarDB />
      <div className="grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 overflow-y-auto">
          <DetailsContentSection post={post} relevantPosts={relevantPosts} />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
