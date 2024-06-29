import { NextApiResponse } from 'next';
import { getUsers } from '@/lib/actions/user.actions';

// TODO: protect this route
export async function GET(res: NextApiResponse) {
  try {
    const users = await getUsers({ _id: 1, firstName: 1, lastName: 1 });
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
