import { uploadFileToSupabase } from '@/lib/supabaseUpload';
import { createIdea } from '@/lib/actions/idea.actions';
import { createPost } from '@/lib/actions/post.actions';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { getUserByClerkID } from '@/lib/actions/user.actions';

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();

    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const contractType = formData.get('contractType');
    const authorsJSON = formData.getAll('authors');
    const referenceLinksJSON = formData.getAll('referenceLinks');
    let fileStructure = null;
    let fileStructureJSON = null;
    if (formData.get('fileStructure')) {
      fileStructureJSON = formData.get('fileStructure');
      fileStructure = JSON.parse(fileStructureJSON as string);
    }

    // Format authors and referenceLinks
    const authors = JSON.parse(authorsJSON as unknown as string)
      .map((author: { value: string; label: string }) => author.value)
      .filter((author: string) => author !== '');
    const referenceLinks = JSON.parse(referenceLinksJSON as unknown as string)
      .map((referenceLink: string) => referenceLink.toString())
      .filter((referenceLink: string) => referenceLink !== '');

    console.log(authorsJSON);

    // Check if required fields are present
    if (
      !title ||
      !description ||
      !category ||
      !contractType ||
      !authors ||
      !referenceLinks
    ) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get User DB Id searching by clerkID
    const currentUser = await getUserByClerkID(userId);
    const { _id } = currentUser;

    // Upload file
    let file = {
      filePublicUrl: null,
      filePath: null,
      fileId: null,
    } as {
      filePublicUrl: string | null;
      filePath: string | null;
      fileId: string | null;
    };
    const uploadedFile = formData.getAll('file')[0];
    if (uploadedFile) {
      try {
        file = await uploadFileToSupabase(uploadedFile as File, _id);
      } catch (error) {
        console.log('upload file', error);
      }
    }

    const idea = {
      title,
      description,
      category,
      contractType,
      authors,
      referenceLinks,
      creatorId: _id,
      file,
      fileStructure,
    };

    // Create idea
    const newIdea = await createIdea(idea);

    // Create post
    if (formData.get('post')) {
      const newPost = await createPost({
        content: formData.get('post') as string,
        userId: _id,
        ideaId: newIdea._id,
      });
    }

    // Create NFT Collection
    const json = {
      title,
      category,
      contractType,
      authors,
    };

    return Response.json({ message: 'Idea created successfully', newIdea });
  } catch (error) {
    console.log('createIdea', error);
    return Response.json({ message: 'Failed to create idea' }, { status: 500 });
  }
}
