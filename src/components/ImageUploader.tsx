import { ChangeEvent } from 'react';
interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  name: string;
  label: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileSelect,
  name,
  label,
}) => {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType !== 'jpg' && fileType !== 'jpeg' && fileType !== 'png') {
        alert('Puoi caricare solo immagini.');
        event.target.value = '';
        return;
      }

      onFileSelect(file);
    }
  };

  return (
    <div className='mb-4'>
      <label
        className='mb-2 block text-sm font-bold text-gray-700'
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type='file'
        name={name}
        onChange={handleFileUpload}
        className='block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100'
      />
    </div>
  );
};

export default ImageUploader;
