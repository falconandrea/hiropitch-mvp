import { SendTransactionError } from '@solana/web3.js';
import { metaplex, payer } from './metaplex';

export async function createNFTCollection() {
  try {
    console.log('start');

    // Definisci i metadati dell'NFT
    const { uri, metadata } = await metaplex.nfts().uploadMetadata({
      name: 'Test',
      symbol: 'HIRONFT123',
      description: 'This is a test',
      attributes: [
        { trait_type: 'Category', value: 'Test 123' },
        { trait_type: 'Author', value: 'Mario' },
      ],
    });

    console.log('metadataUri', uri, metadata);

    // Creazione della collezione NFT
    const { nft } = await metaplex.nfts().create({
      uri: uri,
      name: 'Test',
      maxSupply: 100,
      isCollection: true,
      symbol: 'HIRONFT123',
      updateAuthority: payer,
      sellerFeeBasisPoints: 0, // 0% di fee (5% = 500)
      creators: [{ address: payer.publicKey, share: 100 }],
    });

    const collectionAddress = nft.address.toString();

    console.log(
      `https://explorer.solana.com/address/${collectionAddress}?cluster=devnet`
    );

    return collectionAddress;
  } catch (error) {
    if (error instanceof SendTransactionError) {
      console.log('error', error.transactionError);
    } else {
      console.error('error', error);
    }
  }

  return;
}
