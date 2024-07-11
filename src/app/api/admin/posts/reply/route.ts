import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { getUserByClerkID } from '@/lib/actions/user.actions';
import { addReply } from '@/lib/actions/post.actions';

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const jsonData = await req.json();

    const text = jsonData.reply;
    const ideaId = jsonData.ideaId;
    const postId = jsonData.postId;

    // Check if required fields are present
    if (!text || !ideaId || !postId) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get User DB Id searching by clerkID
    const currentUser = await getUserByClerkID(userId);
    const { _id } = currentUser;

    const reply = {
      author: _id,
      text,
      date: new Date(),
    };

    console.log('reply', reply);

    // Add reply
    const postUpdated = await addReply(postId as string, reply);

    return Response.json({ message: 'Idea created successfully', postUpdated });
  } catch (error) {
    console.log('createIdea', error);
    return Response.json({ message: 'Failed to create idea' }, { status: 500 });
  }
}
