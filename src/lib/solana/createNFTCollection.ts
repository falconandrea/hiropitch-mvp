import metaplex from '@/lib/solana/metaplex';

export async function createNFTCollection() {
  try {
    const { uri } = await metaplex.nfts().uploadMetadata({
      name: 'Hiropitch - Collection 123123',
      description: 'My description',
      image: '',
      authors: ['Max', 'Mario'],
      category: 'Videogame',
      contractType: 'Contratto',
    });

    console.log('uri nft', uri);

    const { nft } = await metaplex.nfts().create(
      {
        uri: uri,
        name: 'Hiropitch - Collection 123123',
        sellerFeeBasisPoints: 0,
        maxSupply: 200,
      },
      { commitment: 'finalized' }
    );

    console.log('nft', nft);
  } catch (error) {}

  return;
}
