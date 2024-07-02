import {
  Metaplex,
  keypairIdentity,
  irysStorage,
} from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('testnet'));

// Get Payer wallet
const secretKey = Uint8Array.from(
  JSON.parse(process.env.SOLANA_SECRET_KEY || '[]')
);
const payer = Keypair.fromSecretKey(secretKey);

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(payer))
  .use(irysStorage());

export default metaplex;
