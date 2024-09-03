import React, { useState } from 'react';
import Notification from '../../Notification'; // Import the Notification component

const VerifyModel = ({ isOpen, onClose }) => {
  const [userSignature, setUserSignature] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleVerifySignature = () => {
    const savedSignature = JSON.parse(localStorage.getItem('savedSign'));
    // ye sign localStorage se kese uthare ho? wait 

    if (savedSignature && userSignature) {
      if (savedSignature === userSignature) {
        setNotification({ message: 'Signature matched successfully!', type: 'success' });
        setVerificationResult('Signature matched successfully!');
      } else {
        setNotification({ message: 'Signature does not match.', type: 'error' });
        setVerificationResult('Signature does not match.');
      }
    } else {
      setNotification({ message: 'No saved signature or input signature is empty.', type: 'info' });
      setVerificationResult('No saved signature or input signature is empty.');
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-transform transform bg-gray-900 bg-opacity-75 p-6 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-lg overflow-hidden shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-6">Verify Signature</h2>
        
        <input
          type="text"
          placeholder="Enter signature"
          value={userSignature}
          onChange={(e) => setUserSignature(e.target.value)}
          className="w-full p-4 mb-4 text-gray-900 rounded-lg"
        />

        <button
          onClick={handleVerifySignature}
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 mr-4 rounded mt-4"
        >
          Verify
        </button>

        {verificationResult && (
          <p className={`mt-4 text-lg font-semibold ${verificationResult.includes('matched') ? 'text-green-500' : 'text-red-500'}`}>
            {verificationResult}
          </p>
        )}

        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6"
        >
          Close
        </button>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default VerifyModel;
