import {
  createSmartContract,
  getSmartContracts,
} from '@/lib/actions/smartcontract.actions';
import { createTransaction } from '@/lib/actions/transaction.actions';
import { getUserByClerkID } from '@/lib/actions/user.actions';
import { mintNFT } from '@/lib/solana/mintNFT';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export const maxDuration = 40;

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get User DB Id searching by clerkID
    const currentUser = await getUserByClerkID(userId);
    const { _id } = currentUser;

    // Get form data
    const jsonData = await req.json();

    if (jsonData.quantity > jsonData.maxMintAmount) {
      return Response.json(
        { message: 'Quantity exceeds max mint amount' },
        { status: 500 }
      );
    }

    // Get Smart Contract
    const nftContract = await getSmartContracts(
      {
        ideaId: jsonData.ideaId,
        type: 'NFT',
        contractAddress: jsonData.contractAddress,
      },
      {},
      1
    );
    if (!nftContract.length) {
      return Response.json(
        { message: 'NFT Collection not found' },
        { status: 500 }
      );
    }

    const result = await mintNFT(
      jsonData.contractAddress,
      jsonData.quantity,
      jsonData.ideaId,
      [
        {
          trait_type: 'Contract address',
          value: jsonData.contractAddress,
        },
        {
          trait_type: 'User ID',
          value: _id,
        },
        {
          trait_type: 'Quantity',
          value: jsonData.quantity,
        },
        {
          trait_type: 'Timestamp',
          value: new Date(),
        },
      ]
    );

    if (!result) {
      return Response.json({ message: 'Failed to mint NFT' }, { status: 500 });
    }

    // Get NFT collection address and hash
    const { mintAddress, hash } = result;

    // Insert smart contract data in database
    const smartContract = await createSmartContract({
      ideaId: jsonData.ideaId,
      contractAddress: mintAddress,
      type: 'MINT',
      signer: _id,
    });

    // Insert transaction data in database
    const transaction = await createTransaction({
      smartContractId: smartContract._id,
      userId: _id,
      hash,
      description: 'NFT minted',
    });

    return Response.json({ message: 'NFT minted successfully' });
  } catch (error) {
    console.log('createIdea', error);
    return Response.json({ message: 'Failed to mint NFT' }, { status: 500 });
  }
}
