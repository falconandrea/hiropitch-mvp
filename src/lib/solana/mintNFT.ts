import { umi, creator } from './metaplex';
import {
  createNft,
  findMetadataPda,
  verifyCollectionV1,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  generateSigner,
  percentAmount,
  publicKey,
} from '@metaplex-foundation/umi';
import { base58 } from '@metaplex-foundation/umi/serializers';

export async function mintNFT(
  contractAddress: string,
  quantity: number, // TODO per ora si minta solo 1, sarà da fare dinamico dopo
  ideaID: string,
  attributes: any
) {
  try {
    const mint = generateSigner(umi);
    const metadataPda = await findMetadataPda(umi, {
      mint: mint.publicKey,
    });

    const metadata = {
      name: 'Hiropitch Idea - ' + ideaID,
      symbol: 'HIROIDEAS',
      description: 'This is the idea on Hiropitch with the id ' + ideaID,
      attributes: attributes,
    };
    const jsonUri = await umi.uploader.uploadJson(metadata);

    const tx = await createNft(umi, {
      mint,
      uri: jsonUri,
      name: 'HPIdea ' + ideaID,
      updateAuthority: creator.publicKey,
      collection: {
        key: publicKey(contractAddress),
        verified: false,
      },
      sellerFeeBasisPoints: percentAmount(0),
    })
      .add(
        verifyCollectionV1(umi, {
          metadata: metadataPda,
          collectionMint: publicKey(contractAddress),
        })
      )
      .sendAndConfirm(umi);

    const hash = base58.deserialize(tx.signature)[0];
    const mintAddress = mint.publicKey.toString();

    return { mintAddress, hash };
  } catch (error) {
    console.error(error);
  }
}
