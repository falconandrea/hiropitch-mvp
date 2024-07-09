import { SendTransactionError } from '@solana/web3.js';
import { metaplex, payer } from './metaplex';

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
    // Definisci i metadati dell'NFT
    const { uri, metadata } = await metaplex.nfts().uploadMetadata({
      name: 'Hiropitch NDA - ' + json.ideaId,
      symbol: 'HIRONDA',
      description:
        'This is the NDA signed on Hiropitch for the Idea with the id ' +
        json.ideaId,
      attributes: mappingAttributes(json),
    });

    console.log('metadataUri', uri, metadata);

    // Creazione della collezione NFT
    const { nft, response } = await metaplex.nfts().create({
      uri: uri,
      name: 'Hiropitch NDA',
      maxSupply: 1,
      symbol: 'HIRONDA',
      sellerFeeBasisPoints: 0, // 0% di fee (5% = 500)
      creators: [{ address: payer.publicKey, share: 100 }],
    });

    const collectionAddress = nft.address.toString();
    const hash = response.signature;

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
