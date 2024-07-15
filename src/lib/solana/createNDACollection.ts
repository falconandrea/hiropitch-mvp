import { SendTransactionError } from '@solana/web3.js';
import { umi } from './metaplex';
import { generateSigner, percentAmount } from '@metaplex-foundation/umi';
import { createNft } from '@metaplex-foundation/mpl-token-metadata';
import { base58 } from '@metaplex-foundation/umi/serializers';

const mappingAttributes = (json: any) => {
  const formattedArray = [];

  const keyMap = {
    ideaId: 'Idea ID',
    ideaContractAddress: 'Idea Contract Address',
    ideaVersion: 'Idea Version',
    titleIdea: 'Title Idea',
    userId: 'User ID',
    timestamp: 'Timestamp',
    authors: 'Authors',
  };

  // Itera su ogni proprietà del JSON
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const typedKey = key as keyof typeof keyMap;
      formattedArray.push({
        trait_type: keyMap[typedKey] || key,
        value: json[key],
      });
    }
  }

  return formattedArray;
};

export async function createNDACollection(json: any) {
  try {
    const metadata = {
      name: 'Hiropitch NDA - ' + json.ideaId,
      symbol: 'HIRONDA',
      description:
        'This is the NDA signed on Hiropitch for the Idea with the id ' +
        json.ideaId,
      attributes: mappingAttributes(json),
    };

    const uri = await umi.uploader.uploadJson(metadata);

    const mint = generateSigner(umi);
    const { signature, result } = await createNft(umi, {
      mint,
      name: 'HPNDA ' + json.ideaId, //max 32 chars
      uri,
      sellerFeeBasisPoints: percentAmount(0),
      isCollection: true,
    }).sendAndConfirm(umi);

    const collectionAddress = mint.publicKey.toString();
    const hash = base58.deserialize(signature)[0];

    console.log(
      `https://explorer.solana.com/address/${collectionAddress}?cluster=devnet`
    );

    return { collectionAddress, hash };
  } catch (error) {
    if (error instanceof SendTransactionError) {
      console.log('error', error.transactionError);
    } else {
      console.error('error', error);
    }
  }
}
