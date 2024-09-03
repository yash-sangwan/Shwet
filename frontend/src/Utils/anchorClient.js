import { AnchorProvider, Program } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '../idl.json'; // Make sure to import your IDL

const programID = new PublicKey('4jwLwSKQ1AM5PtfCFf6VppHdpEb3VfBAS26cbqYwU8rW'); // Replace with your actual program ID
const network = 'https://api.devnet.solana.com'; // or your custom network

export const getProgram = (wallet) => {
  const connection = new Connection(network, 'processed');

  if (!wallet) {
    throw new Error('Wallet is required and must support signTransaction');
  }


  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: 'processed',
  });

  return new Program(idl, programID, provider);
};
