import { getUsers } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

// TODO: protect this route
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const users = await getUsers({ _id: 1, firstName: 1, lastName: 1 });
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
