import {
  Metaplex,
  keypairIdentity,
  irysStorage,
} from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Get Payer wallet
const secretKey = Uint8Array.from(
  JSON.parse(process.env.SOLANA_SECRET_KEY || '[]')
);
const payer = Keypair.fromSecretKey(secretKey);

const getBalance = async () => {
  const balance = await connection.getBalance(payer.publicKey);
  console.log(`Payer balance: ${balance / 10 ** 9} SOL`);
};

getBalance();

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(payer))
  .use(
    irysStorage({
      address: 'https://devnet.irys.xyz',
      providerUrl: 'https://api.devnet.solana.com',
      timeout: 60000,
    })
  );

export { metaplex, payer };
