import React, { useEffect, useState } from 'react';

const ProofModel = ({ isOpen, onClose, existingProofData }) => {
  const [proofData, setProofData] = useState(existingProofData || null);

  useEffect(() => {
    if (!proofData) {
      // Attempt to load proofs from localStorage if not provided via props
      const savedProofs = localStorage.getItem("savedProofs");
      if (savedProofs) {
        console.log("Loading saved proofs from localStorage:", savedProofs);
        setProofData(JSON.parse(savedProofs));
      }
    }
  }, [proofData]);

  // Extract the first object if proofData is an array
  const firstProof = Array.isArray(proofData) && proofData.length > 0 ? proofData[0] : proofData;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-transform transform bg-gray-900 bg-opacity-75 p-6 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-4xl overflow-hidden shadow-lg"> {/* Increased max-w-lg to max-w-2xl */}
        <h2 className="text-white text-2xl font-semibold mb-6">Proof of Authentication</h2> {/* Increased text size for the title */}
        
        {/* Conditionally render the first object of the proof data */}
        {firstProof ? (
          <div className="text-gray-300 bg-gray-700 p-6 rounded-lg overflow-auto max-h-96"> {/* Increased padding and max height */}
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(firstProof, null, 2)}</pre> {/* Display the first object of proof data */}
          </div>
        ) : (
          <p className="text-gray-300">No proof data available yet.</p>
        )}

        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded mt-6"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProofModel;
