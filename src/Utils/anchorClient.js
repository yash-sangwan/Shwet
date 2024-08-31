import { AnchorProvider, Program } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '../idl.json'; // Make sure to import your IDL

const programID = new PublicKey('8SzEAvWdWoWyPKScZCfWRKMKTTdhCT3v1CknL7Aew9ar'); // Replace with your actual program ID
const network = 'https://api.devnet.solana.com'; // or your custom network

export const getProgram = (wallet) => {
  const connection = new Connection(network, 'processed');

  if (!wallet) {
    throw new Error('Wallet is required and must support signTransaction');
  }
  // kal jb ye wallet shi work krha tha tb tk, usk baad kya lgaya jbse ye error ara h,

  // aditi ye agr code glt hota to ye publish post aur initialized user mai use hora h udhr bhi err aata h , prb bs fetch post mai h isliye err aara h vrna bakio mai to shi chlra h , issi mai dikat h wt

  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: 'processed',
  });

  return new Program(idl, programID, provider);
};
