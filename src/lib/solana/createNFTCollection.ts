import { SendTransactionError } from '@solana/web3.js';
import { umi } from './metaplex';
import { generateSigner, percentAmount } from '@metaplex-foundation/umi';
import { createNft } from '@metaplex-foundation/mpl-token-metadata';
import { base58 } from '@metaplex-foundation/umi/serializers';

const mappingAttributes = (json: any) => {
  const formattedArray = [];

  const keyMap = {
    ideaId: 'Idea ID',
    creationDate: 'Creation Date',
    creator: 'Creator',
    authors: 'Authors',
    IPType: 'IP Type',
    IPReferenceLinks: 'IP Reference Links',
    title: 'Title',
    description: 'Description',
    category: 'Category',
    contractType: 'Contract Type',
    NFTPrice: 'NFT Price',
    NFTSupply: 'NFT Supply',
    fileStructure: 'File Structure',
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

export async function createNFTCollection(json: any) {
  try {
    // Metadata
    const metadata = {
      name: 'Hiropitch Idea - ' + json.ideaId,
      symbol: 'HIROIDEAS',
      description: 'This is the idea on Hiropitch with the id ' + json.ideaId,
      attributes: mappingAttributes(json),
    };

    const uri = await umi.uploader.uploadJson(metadata);

    const mint = generateSigner(umi);
    const { signature, result } = await createNft(umi, {
      mint,
      name: 'HPIdea ' + json.ideaId, //max 32 chars
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
