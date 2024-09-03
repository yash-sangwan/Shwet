import React, { useEffect, useRef, useState } from "react";
import PostPreviewModal from "../Components/Dashboard/WritePost/PostPreviewModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram } from "../Utils/anchorClient";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import Notification from "../Components/Notification";
import RequestProof from "../Components/Dashboard/WritePost/RequestProof";

const AddPost = () => {
  const editorRef = useRef(null);
  const mediaUrlRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const [proofSignatures, setProofSignatures] = useState(null); // Store the signature
  const [isDropdownHidden, setIsDropdownHidden] = useState(false); // Manage dropdown visibilityvisibility
  const { connected, publicKey, wallet } = useWallet();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedProofId, setSelectedProofId] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");

  const navigate = useNavigate();

  const handleProofSelect = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "github") {
      setSelectedProofId(0);
    } else if (selectedValue === "aadhar") {
      setSelectedProofId(1);
    }

    setIsSheetOpen(true); // Open the sheet when proof type is selected
  };

  const handleProofGenerated = (signatures) => {
    setProofSignatures(signatures); // Set the proof signature
    setIsDropdownHidden(true); // Hide the dropdown
    setIsSheetOpen(false); // Close the sheet
    console.log(proofSignatures);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handlePublish = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    const program = getProgram(wallet.adapter);
    const title = document.querySelector(
      'input[placeholder="Enter title here"]'
    ).value;
    const content = editorRef.current?.innerHTML;
    const media = selectedImage || "";
    const source = document.querySelector(
      'input[placeholder="URL / Description"]'
    ).value;

    if (!title || !content || !source || !proofSignatures) {
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
        [
          Buffer.from("post"),
          publicKey.toBuffer(),
          new Uint8Array([lastPostId]),
        ],
        program.programId
      );

      // Submit the transaction to create the post on the blockchain
      await program.methods
        .createPost(title, media, content, source, proofSignatures)
        .accounts({
          userAccount: userPda,
          postAccount: postPda,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      alert("Post published successfully!");

      handleMoveToTrash();
      navigate("/read/home");
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

  const insertHTMLAtCursor = (html) => {
    const range = document.getSelection().getRangeAt(0);
    const fragment = range.createContextualFragment(html);
    range.insertNode(fragment);
  };

  useEffect(() => {
    const storedMedia = localStorage.getItem("selectedImage");
    if (storedMedia) {
      setSelectedImage(storedMedia);
      console.log("Loaded media from localStorage:", storedMedia);
    }
  }, []);

  const handleAddMedia = () => {
    const url = mediaUrlRef.current.value || "";
    if (url) {
      setSelectedImage(url);
      localStorage.setItem("selectedImage", url);
      console.log("Image URL set to state and localStorage:", url);

      // const imgTag = `<img src="${url}" alt="Uploaded Image" class="max-w-full h-auto my-2" style="max-width: 300px; max-height: 300px;" />`;
      // insertHTMLAtCursor(imgTag);
    }
  };
  
  const handleAddMediaClick = () => {
    handleAddMedia();
  };

  const handleContentInput = () => {
    const text = editorRef.current.innerText || "";
    const words = text.trim().split(/\s+/);
    const wordCount = words.filter((word) => word !== "").length;

    if (wordCount > 200) {
      // Truncate text to 45 words
      const truncatedText = words.slice(0, 200).join(" ");
      editorRef.current.innerText = truncatedText;
      setWordCount(200); // Update word count to 45
    } else {
      setWordCount(wordCount);
    }
    setContent(editorRef.current.innerHTML);
  };

  const handleMoveToTrash = () => {
    const handleMoveToTrash = () => {
      setTitle("");
      setContent("");
      setSource("");
      setSelectedImage("");
      setProofSignatures(null);
      editorRef.current.innerHTML = "";
      setWordCount(0);
    };
  };

  const handlePreviewClick = () => {
    const url = mediaUrlRef.current.value.trim();
    if (url) {
      setSelectedImage(url);
      setIsPreviewOpen(true);
    } else {
      alert("Please enter a valid image URL.");
    }
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
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update state on input change
          />
        </div>
        <div className="bg-gray-100 p-4 mb-4 shadow rounded-md">
          <h2 className="text-lg mb-2">Add Media URL</h2>
          <div className="flex items-center justify-between mb-2">
          
              <input
              ref={mediaUrlRef}
              onChange={handleAddMedia}
              type="text"
              className="w-1/2 p-2 border mb-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 min-h-[50px] bg-white text-black"
              placeholder="Enter media URL"
            />

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

          <div className="text-sm flex justify-between text-gray-500 mt-2">
            Word count: {wordCount} / 200
            <p>
              <b>Note</b>: Media size should be less than{" "}
              <b className="text-[12px]">200kb</b>.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
          <h4 className="pb-2 text-black text-xl">Source of Data</h4>
          <input
            type="text"
            placeholder="URL / Description"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={source}
            onChange={(e) => setSource(e.target.value)} // Update state on input change
          />
        </div>
        <div className="bg-gray-100 p-4 shadow rounded-md mb-4">
          <h4 className="pb-2 text-black text-xl">Proof of Authentication</h4>
          {!isDropdownHidden && (
            <select
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              defaultValue=""
              onChange={handleProofSelect} // Add onChange handler
            >
              <option value="" disabled>
                Select
              </option>
              <option value="aadhar">Aadhar Authentication</option>
              <option value="github">GitHub Authentication</option>
            </select>
          )}

          {proofSignatures && (
            <input
              type="text"
              value={proofSignatures}
              readOnly
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mt-2"
            />
          )}
        </div>

        {isSheetOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <button onClick={handleCloseSheet} className="text-black mb-4">
                Close
              </button>
              <RequestProof
                id={selectedProofId}
                onProofGenerated={handleProofGenerated}
              />
            </div>
          </div>
        )}
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
            Status: <span className="text-green-600 font-semibold">Draft</span>
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
              className={`bg-primary text-white w-1/2 p-2 rounded hover:bg-secondary ${
                transactionPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={transactionPending}
            >
              {transactionPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
       
      </div>



      {isPreviewOpen && (
        <PostPreviewModal
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          title={title}
          content={editorRef.current?.innerHTML}
          media={selectedImage}
          source={source}
          proofSignatures={proofSignatures}
        />
      )}
    </div>
  );
};

export default AddPost;
