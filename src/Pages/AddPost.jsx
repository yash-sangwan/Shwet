import React, { useRef, useState } from "react";
import PostPreviewModal from "../Components/Dashboard/WritePost/PostPreviewModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram } from "../Utils/anchorClient";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils";
import { Buffer } from "buffer";

const AddPost = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);

  const { connected, publicKey, wallet } = useWallet();

  const handlePublish = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first.");
      return;
    }
  
    const program = getProgram(wallet.adapter);
    const title = document.querySelector('input[placeholder="Enter title here"]').value;
    const content = editorRef.current?.innerHTML || "";
    const media = selectedImage || ""; 
    const source = document.querySelector('input[placeholder="URL / Description"]').value;
    const proof = "abcdefghijkl";
  
    if (!title || !content || !source || !proof) {
      alert("All fields are required.");
      return;
    }
  
    try {
      setTransactionPending(true);
  
      // Derive userAccount PDA
      const [userPda] = findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );
  
      // Fetch user account to get lastPostId
      const user = await program.account.user.fetch(userPda);
      const lastPostId = user.lastPostId;
  
      // Derive postAccount PDA using lastPostId
      const [postPda] = findProgramAddressSync(
        [Buffer.from("post"), publicKey.toBuffer(), new Uint8Array([lastPostId])],
        program.programId
      );
  
      // Submit the transaction to create the post on the blockchain
      await program.methods
        .createPost(title, media, content, source, proof)
        .accounts({
          userAccount: userPda,
          postAccount: postPda,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
  
      alert("Post published successfully!");
  
      // Skip updating lastPostId for now to isolate the issue
      // Comment out the following code to test
      // await program.methods
      //   .updateLastPostId(new Uint8Array([lastPostId + 1])) 
      //   .accounts({
      //     userAccount: userPda,
      //     authority: publicKey,
      //     systemProgram: SystemProgram.programId,
      //   })
      //   .rpc();
  
      handleMoveToTrash();
    } catch (error) {
      console.error("Error publishing post:", error);
      alert("Failed to publish post. See console for details.");
    } finally {
      setTransactionPending(false);
    }
  };
  


  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleAddMedia = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setSelectedImage(e.target.result);
      const imgTag = `<img src="${e.target.result}" alt="Uploaded Image" class="max-w-full h-auto my-2" style="max-width: 300px; max-height: 300px;" />`;
      insertHTMLAtCursor(imgTag);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const insertHTMLAtCursor = (html) => {
    const range = document.getSelection().getRangeAt(0);
    const fragment = range.createContextualFragment(html);
    range.insertNode(fragment);
  };

  const handleAddMediaClick = () => {
    fileInputRef.current.click();
  };

  const handleContentInput = () => {
    const text = editorRef.current.innerText || "";
    const words = text.trim().split(/\s+/);
    setWordCount(words.filter((word) => word !== "").length);
  };

  const handleMoveToTrash = () => {
    document.querySelector('input[placeholder="Enter title here"]').value = "";
    editorRef.current.innerHTML = "";
    setWordCount(0);
  };

  const handlePreviewClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="flex min-h-screen p-8 bg-gray-900">
      <div className="w-3/4 pr-4">
        <h1 className="text-white text-3xl pb-4 font-semibold">Add New Post</h1>
        <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
          <h4 className="pb-2 text-black text-xl">Heading</h4>
          <input
            type="text"
            placeholder="Enter title here"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="bg-gray-100 p-4 mb-4 shadow rounded-md">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleAddMediaClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Media
            </button>
            <div className="text-gray-500">Visual | Content</div>
          </div>

          <div className="flex items-center mb-4 space-x-2">
            <button
              onClick={() => formatText("bold")}
              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
            >
              B
            </button>
            <button
              onClick={() => formatText("italic")}
              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 italic"
            >
              I
            </button>
            <button
              onClick={() => formatText("underline")}
              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 underline"
            >
              U
            </button>
            <button
              onClick={() => formatText("strikeThrough")}
              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 line-through"
            >
              S
            </button>
            <button
              onClick={() => formatText("outdent")}
              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
            >
              &lt;
            </button>
            <button
              onClick={() => formatText("indent")}
              className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
            >
              &gt;
            </button>
          </div>

          <div
            ref={editorRef}
            contentEditable
            onInput={handleContentInput}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 min-h-[200px] bg-white text-black"
          ></div>

          <div className="text-sm text-gray-500 mt-2">
            Word count: {wordCount}
          </div>
        </div>

        <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
          <h4 className="pb-2 text-black text-xl">Source of Data</h4>
          <input
            type="text"
            placeholder="URL / Description"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
          <h4 className="pb-2 text-black text-xl">Proof of Authentication</h4>
          <select
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            <option value="aadhar">Aadhar Authentication</option>
            <option value="github">GitHub Authentication</option>
          </select>
        </div>
      </div>

      <div className="w-1/4 mt-32 mr-3 fixed right-0">
        <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
          <h3 className="font-semibold text-black mb-2">Publish</h3>

          <button
            onClick={handlePreviewClick}
            className="bg-gray-200 text-black w-full p-2 mb-2 rounded"
          >
            Preview
          </button>
          <div className="text-gray-500 text-sm mb-2">
            Status:{" "}
            <span className="text-green-600 font-semibold">Draft</span>
          </div>
          <div className="text-gray-500 text-sm mb-2">
            Visibility:{" "}
            <span className="text-blue-600 font-semibold">Public</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleMoveToTrash}
              className="bg-red-500 text-white w-1/2 p-2 rounded hover:bg-red-600"
            >
              Move to Trash
            </button>
            <button
              onClick={handlePublish}
              className={`bg-blue-500 text-white w-1/2 p-2 rounded hover:bg-blue-600 ${
                transactionPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={transactionPending}
            >
              {transactionPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAddMedia}
        accept="image/*"
        style={{ display: "none" }}
      />

      {isPreviewOpen && (
        <PostPreviewModal
          onClose={handleClosePreview}
          title={document.querySelector('input[placeholder="Enter title here"]')?.value}
          content={editorRef.current?.innerHTML}
          source={document.querySelector('input[placeholder="URL / Description"]')?.value}
        />
      )}
    </div>
  );
};

export default AddPost;
