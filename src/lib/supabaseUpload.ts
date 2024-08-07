import { supabase } from './supabaseClient';

export async function uploadFileToSupabase(file: File, folder: string) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace('T', '')
    .split('.')[0];
  const fileName = `${timestamp}_${file.name}`;
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET || 'hiropitch')
    .upload(`${folder}/${fileName}`, file, { upsert: true });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  const uploadedFile = supabase.storage
    .from(process.env.SUPABASE_BUCKET || 'hiropitch')
    .getPublicUrl(data.path);

  return {
    filePublicUrl: uploadedFile.data.publicUrl,
    filePath: data.path,
    fileId: data.id,
  };
}
