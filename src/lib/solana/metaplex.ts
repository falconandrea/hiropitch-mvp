import { clusterApiUrl } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import {
  createSignerFromKeypair,
  keypairIdentity,
} from '@metaplex-foundation/umi';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';

// Use the RPC endpoint of your choice.
const umi = createUmi(clusterApiUrl('devnet')).use(mplTokenMetadata());
const creatorWallet = umi.eddsa.createKeypairFromSecretKey(
  Uint8Array.from(JSON.parse(process.env.SOLANA_SECRET_KEY || '[]'))
);
const creator = createSignerFromKeypair(umi, creatorWallet);
umi.use(keypairIdentity(creator));
umi.use(mplTokenMetadata());
umi.use(irysUploader());

export { umi, creator };
