import {
  Connection,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Get Payer wallet
const secretKey = Uint8Array.from(
  JSON.parse(process.env.SOLANA_SECRET_KEY || '[]')
);
const payer = Keypair.fromSecretKey(secretKey);

const getBalance = async () => {
  const balance = await connection.getBalance(payer.publicKey);
  return balance / 10 ** 9;
};
const requestAirdrop = async () => {
  console.log('Requesting airdrop...');
  const signature = await connection.requestAirdrop(
    payer.publicKey,
    1 * LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(signature, 'finalized');
};

export { requestAirdrop, getBalance };
