import { uploadFileToSupabase } from '@/lib/supabaseUpload';
import { createIdea } from '@/lib/actions/idea.actions';
import { createPost } from '@/lib/actions/post.actions';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { getUserByClerkID } from '@/lib/actions/user.actions';
import { createNFTCollection } from '@/lib/solana/createNFTCollection';
import { createSmartContract } from '@/lib/actions/smartcontract.actions';
import { createTransaction } from '@/lib/actions/transaction.actions';

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
    const nftQty = formData.get('nftQty');
    const nftPrice = formData.get('nftPrice');

    // Format authors and referenceLinks
    const authors = JSON.parse(authorsJSON as unknown as string)
      .map((author: { value: string; label: string }) => author.value)
      .filter((author: string) => author !== '');
    const referenceLinks = JSON.parse(referenceLinksJSON as unknown as string)
      .map((referenceLink: string) => referenceLink.toString())
      .filter((referenceLink: string) => referenceLink !== '');

    // Check if required fields are present
    if (
      !title ||
      !description ||
      !category ||
      !contractType ||
      !authors ||
      !referenceLinks ||
      !nftQty ||
      !nftPrice
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
      // Check if size of file is over 2MB
      if ((uploadedFile as File).size > 2097152) {
        return Response.json(
          { message: 'File size has to be less than 2MB' },
          { status: 400 }
        );
      }
      // Save
      try {
        file = await uploadFileToSupabase(uploadedFile as File, _id);
      } catch (error) {
        console.log('upload file', error);
      }
    }

    // Upload image
    let image = {
      filePublicUrl: null,
      filePath: null,
      fileId: null,
    } as {
      filePublicUrl: string | null;
      filePath: string | null;
      fileId: string | null;
    };
    const uploadedImage = formData.getAll('image')[0];
    if (uploadedImage) {
      // Check if size of file is over 2MB
      if ((uploadedImage as File).size > 2097152) {
        return Response.json(
          { message: 'Image size has to be less than 2MB' },
          { status: 400 }
        );
      }

      try {
        image = await uploadFileToSupabase(
          uploadedImage as File,
          `${_id}/covers`
        );
      } catch (error) {
        console.log('upload image', error);
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
      image,
      fileStructure,
      nftQty,
      nftPrice,
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

    // Get creator name and surname and list authors
    const creator =
      currentUser.firstName + ' ' + currentUser.lastName + ' (' + _id + ')';
    const listAuthors = JSON.parse(authorsJSON as unknown as string);
    let authorsData = '';
    for (let i = 0; i < authors.length; i++) {
      if (i === authors.length - 1) {
        authorsData += listAuthors[i].label + ' (' + listAuthors[i].value + ')';
      } else {
        authorsData +=
          listAuthors[i].label + ' (' + listAuthors[i].value + '), ';
      }
    }

    // Create list of reference links
    let referenceLinksText = '';
    for (let i = 0; i < referenceLinks.length; i++) {
      if (i === referenceLinks.length - 1) {
        referenceLinksText += referenceLinks[i];
      } else {
        referenceLinksText += referenceLinks[i] + ', ';
      }
    }

    // Create NFT Collection
    const json = {
      ideaId: newIdea._id,
      creationDate: new Date(),
      creator,
      authors: authorsData,
      IPType: category,
      IPReferenceLinks: referenceLinksText,
      title,
      description,
      category,
      contractType,
      NFTPrice: nftPrice,
      NFTSupply: nftQty,
      fileStructure: fileStructureJSON,
    };
    const result = await createNFTCollection(json);

    if (!result) {
      return Response.json(
        { message: 'Failed to create NFT collection' },
        { status: 500 }
      );
    }

    // Get NFT collection address and hash
    const { collectionAddress, hash } = result;

    // Insert smart contract data in database
    const smartContract = await createSmartContract({
      ideaId: newIdea._id,
      contractAddress: collectionAddress,
      type: 'NFT',
    });

    // Insert transaction data in database
    await createTransaction({
      smartContractId: smartContract._id,
      userId: _id,
      hash,
      description: 'NFT collection created',
    });

    return Response.json({ message: 'Idea created successfully', newIdea });
  } catch (error) {
    console.log('createIdea', error);
    return Response.json({ message: 'Failed to create idea' }, { status: 500 });
  }
}
