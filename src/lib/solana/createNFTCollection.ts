import { SendTransactionError } from '@solana/web3.js';
import { metaplex, payer } from './metaplex';

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

export async function createNFTCollection(json: any, maxSupply: number) {
  try {
    // Definisci i metadati dell'NFT
    const { uri, metadata } = await metaplex.nfts().uploadMetadata({
      name: 'Hiropitch Idea - ' + json.ideaId,
      symbol: 'HIROIDEAS',
      description: 'This is the idea on Hiropitch with the id ' + json.ideaId,
      attributes: mappingAttributes(json),
    });

    console.log('metadataUri', uri, metadata);

    // Creazione della collezione NFT
    const { nft, response } = await metaplex.nfts().create({
      uri: uri,
      name: 'Hiropitch Ideas',
      maxSupply: maxSupply,
      isCollection: true,
      symbol: 'HIROIDEAS',
      updateAuthority: payer,
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
