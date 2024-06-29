import { supabase } from './supabaseClient';

export async function uploadFileToSupabase(file: File) {
  const fileName = file.name;
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'hiropitch')
    .upload(fileName, file, { upsert: true });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  // Get the URL or path of the uploaded file
  const filePath = data?.path;

  const uploadedFile = supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'hiropitch')
    .getPublicUrl(filePath);

  return {
    publicUrl: uploadedFile.data.publicUrl,
    filePath: filePath,
  };
}
