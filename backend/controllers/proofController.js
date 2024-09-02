const { Reclaim } = require("@reclaimprotocol/js-sdk");
const axios = require('axios');
require("dotenv").config();

const requestProof = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Instantiate Reclaim for proof request
    const reclaimClient = new Reclaim.ProofRequest(
      process.env.RECLAIM_APPLICATION_ID
    );

    // Provider IDs for different proofing mechanism
    const providerIds = [
      "6d3f6753-7ee6-49ee-a545-62f1b1822ae5", // GitHub Provider ID
      "e83f3b89-cefa-4f63-bbed-deb0c94f7986", // Aadhar Provider ID
    ];

    const  APP_SECRET = process.env.RECLAIM_APP_SECRET;

    // Add context to proof for preventing proof reuse and duplication
    await reclaimClient.addContext(
      `user's address` /* put user's blockchain address here */,
      `for userId: ${userId} on ${Date(Date.now())}`
    );

    const sessionData = await reclaimClient.buildProofRequest(providerIds[req.query.id], true, 'V2Linking');

    // Add signature before proof generation to prevent phishing
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

      res.status(200).send({requestUrl, statusUrl});
    // Start the session and await its completion


  } catch (error) {
    res.status(500).send(error.message);
  }
};

const callbackHandler = async (req, res) => {
  try {
    const sessionId = req.query.callbackId
    const proof = req.body;
    // const proof = JSON.parse(decodeURIComponent(req.body))
   
    // const isProofVerified = await Reclaim.verifySignedProof(proof)
    // if (!isProofVerified) {
    //   return res.status(400).send({ message: 'Proof verification failed' })
    // }
   
    // const context = proof.claimData.context
    // const extractedParameterValues = proof.extractedParameterValues
    // // TODO: Verify with the context depending on your business logic
    // // TODO: Save the proof to your backend
   
    return res.status(200).send({ message: 'Proof verified', proof })
  } catch (error) {
    res.status(400).send(error.message)
  }

}

module.exports = { requestProof, callbackHandler };


//del
