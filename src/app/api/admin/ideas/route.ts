import { uploadFileToSupabase } from '@/lib/supabaseUpload';
import { createIdea } from '@/lib/actions/idea.actions';

// TODO: protect this route
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const contractType = formData.get('contractType');
    const authorsJSON = formData.getAll('authors');
    const referenceLinksJSON = formData.getAll('referenceLinks');
    const fileStructureJSON = formData.get('fileStructure');

    // Format authors and referenceLinks
    const authors = JSON.parse(authorsJSON as string)
      .map((author: { value: string; label: string }) => author.value)
      .filter((author: string) => author !== '');
    const referenceLinks = JSON.parse(referenceLinksJSON as string)
      .map((referenceLink: string) => referenceLink.toString())
      .filter((referenceLink: string) => referenceLink !== '');

    const fileStructure = JSON.parse(fileStructureJSON as string);

    // Check if required fields are present
    if (
      !title ||
      !description ||
      !category ||
      !contractType ||
      !authors ||
      !referenceLinks ||
      !fileStructure
    ) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload file
    let file = null;
    const uploadedFile = formData.getAll('file')[0];
    if (uploadedFile) {
      try {
        file = await uploadFileToSupabase(uploadedFile);
      } catch (error) {
        console.log('upload file', error);
      }
    } else {
      return Response.json({ message: 'Missing file' }, { status: 400 });
    }

    console.log('fileStructure', fileStructure);

    const idea = {
      title,
      description,
      category,
      contractType,
      authors,
      referenceLinks,
      filePath: file?.filePath,
      fileUrl: file?.publicUrl,
      fileStructure,
    };

    // Create idea
    const newIdea = await createIdea(idea);
    console.log('newIdea', newIdea);

    return Response.json({ message: 'Idea created successfully', newIdea });
  } catch (error) {
    console.log('createIdea', error);
    return Response.json({ message: 'Failed to create idea' }, { status: 500 });
  }
}
