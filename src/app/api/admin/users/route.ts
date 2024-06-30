import { getUsers } from '@/lib/actions/user.actions';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const users = await getUsers({ _id: 1, firstName: 1, lastName: 1 });
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
