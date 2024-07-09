import { createSmartContract } from '@/lib/actions/smartcontract.actions';
import { createTransaction } from '@/lib/actions/transaction.actions';
import { getUserByClerkID } from '@/lib/actions/user.actions';
import { createNDACollection } from '@/lib/solana/createNDACollection';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

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

    const metadata = {
      ideaId: jsonData.ideaId,
      ideaContractAddress: jsonData.ideaContract,
      ideaVersion: 1, // TODO da aggiornare più avanti
      titleIdea: jsonData.ideaTitle,
      userId: _id,
      timestamp: Date.now(),
      authors: jsonData.authors,
    };

    const result = await createNDACollection(metadata);

    if (!result) {
      return Response.json({ message: 'Failed to sign NDA' }, { status: 500 });
    }

    // Get NFT collection address and hash
    const { collectionAddress, hash } = result;

    // Insert smart contract data in database
    const smartContract = await createSmartContract({
      ideaId: jsonData.ideaId,
      contractAddress: collectionAddress,
      type: 'NDA',
      signer: _id,
    });

    // Insert transaction data in database
    const transaction = await createTransaction({
      smartContractId: smartContract._id,
      userId: _id,
      hash,
      description: 'NDA signed',
    });

    return Response.json({ message: 'NDA signed successfully' });
  } catch (error) {
    console.log('createIdea', error);
    return Response.json({ message: 'Failed to sign NDA' }, { status: 500 });
  }
}
