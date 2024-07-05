import { getUsers } from '@/lib/actions/user.actions';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import { createNFTCollection } from '@/lib/solana/createNFTCollection';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // const { userId } = getAuth(req);

    // if (!userId) {
    //   return Response.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    const response = await createNFTCollection();
    console.log('response', response);
    return Response.json(true);
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
