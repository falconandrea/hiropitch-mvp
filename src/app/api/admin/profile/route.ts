import { getUsers, updateUser } from '@/lib/actions/user.actions';
import { uploadFileToSupabase } from '@/lib/supabaseUpload';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get user logged info
    const user = await getUsers({}, { clerkId: userId }, {}, 1);

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const mobile = formData.get('mobile');
    const about = formData.get('about');
    const address = formData.get('address');
    const vatNumber = formData.get('vatNumber');
    const fiscalCode = formData.get('fiscalCode');
    const companyName = formData.get('companyName');
    const birthDate = formData.get('birthDate');
    const linkedin = formData.get('linkedin');
    const twitter = formData.get('twitter');
    const instagram = formData.get('instagram');
    const facebook = formData.get('facebook');

    const user = await getUsers({}, { clerkId: userId }, {}, 1);
    const { _id } = user[0];

    if (!firstName || !lastName) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    let imagePath = null;
    const uploadedImage = formData.getAll('photo')[0];
    console.log('uploadedImage', uploadedImage);
    if (uploadedImage) {
      // Check if size of file is over 2MB
      if ((uploadedImage as File).size > 2097152) {
        return Response.json(
          { message: 'Image size has to be less than 2MB' },
          { status: 400 }
        );
      }

      try {
        imagePath = await uploadFileToSupabase(
          uploadedImage as File,
          `${_id}/avatars`
        );
        console.log('photo path', imagePath);
      } catch (error) {
        console.log('upload image', error);
      }
    }

    const userToUpdate = {
      firstName,
      lastName,
      mobile,
      about,
      address,
      vatNumber,
      fiscalCode,
      companyName,
      birthDate,
      socials: {
        linkedin,
        twitter,
        instagram,
        facebook,
      },
      photo: imagePath?.filePublicUrl || '',
    };
    console.log(userToUpdate);

    await updateUser(_id, userToUpdate);

    return Response.json({ message: 'User updated successfully' });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
