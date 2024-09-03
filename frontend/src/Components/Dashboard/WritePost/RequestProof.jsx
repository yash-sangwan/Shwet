import React, { useState } from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";

const RequestProof = ({ id, onProofGenerated }) => {
  const [requestUrl, setRequestUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reclaimClient = new Reclaim.ProofRequest(
    import.meta.env.VITE_RECLAIM_APPLICATION_ID
  );

  const handleReqProof = async () => {
    try {
      setIsLoading(true);
      console.log("Requesting proof...");

      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `https://shwet-backend.vercel.app/proof/request-proof?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reqUrl = data.requestUrl;
        console.log("Request URL received:", reqUrl);

        setRequestUrl(reqUrl);
        reclaimClient.setStatusUrl(data.statusUrl);

        await reclaimClient.startSession({
          onSuccessCallback: (proofs) => {
            console.log("Proofs received:", proofs);
            localStorage.setItem("savedProofs", JSON.stringify(proofs));
            const signatures = proofs[0]?.signatures;
            if (signatures) {
              console.log("Signatures found:", signatures);
              // Save the proofs in localStorage
              // actually problm yhi h aise cases m jb apko multiple users aur unka data kahi store krna ho to localStorage is not a option because we dont know same device se kon kon kre konse account se kre, but isk liye prod level m jaane k baad hum ye proofs ko b solana pr save krenge then vha se nikalenge jese user aur posts fetch krhe h pr mvp k liye mne kya socha tha ki directly signature dalke jese wt a min
              localStorage.setItem("savedSign", JSON.stringify(signatures));
              onProofGenerated(signatures); // Send signatures to the ProofModel component
            } else {
              console.error("Signatures not found in the proofs object");
            }
          },
          onFailureCallback: (error) => {
            console.error("Session failed:", error.message);
          },
        });
      } else {
        console.error("Failed to fetch request proof");
      }
    } catch (err) {
      console.error("Error requesting proof:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg shadow-lg">
      {requestUrl && (
        <div className="mb-4 p-4 bg-white rounded-lg">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={requestUrl}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
      <button
        type="submit"
        onClick={handleReqProof}
        className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Generate Proof"}
      </button>
    </div>
  );
};

export default RequestProof;
