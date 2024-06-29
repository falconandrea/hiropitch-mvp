import { ChangeEvent, useState } from 'react';
import JSZip from 'jszip';
import { supabase } from '@/lib/supabaseClient';

interface TreeNode {
  name: string;
  type: 'directory' | 'file';
  children?: TreeNode[];
}

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [fileTree, setFileTree] = useState<TreeNode | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setUploading(true);
      onFileSelect(file);

      try {
        const structure = await returnStructure(file);
        console.log('structure', structure);
        setFileTree(structure);

        const uploadResponse = await uploadToStorage(file);
        if (uploadResponse.error) {
          throw uploadResponse.error;
        }
      } catch (error) {
        console.error("Errore durante l'elaborazione del file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const returnStructure = async (file: File): Promise<TreeNode> => {
    const zip = new JSZip();
    const content = await zip.loadAsync(file);

    const root: TreeNode = { name: '/', type: 'directory', children: [] };

    content.forEach((relativePath, zipEntry) => {
      const parts = relativePath.split('/');
      let currentNode = root;

      parts.forEach((part, index) => {
        if (part) {
          const isFile = /\.[0-9a-z]{1,5}$/i.test(part); // Verifica se il segmento sembra essere un file

          let childNode = currentNode.children?.find(
            (child) => child.name === part
          );

          if (!childNode) {
            childNode = {
              name: part,
              type: isFile ? 'file' : 'directory',
              children: isFile ? undefined : [],
            };
            currentNode.children?.push(childNode);
          }
          currentNode = childNode;
        }
      });
    });

    return root;
  };

  const uploadToStorage = async (file: File) => {
    const { data, error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'hiropitch')
      .upload(file.name, file, { upsert: true });

    if (error) {
      console.error(
        'Errore durante il caricamento su Supabase Storage:',
        error
      );
      return { error };
    }

    console.log('File caricato su Supabase Storage:', data);
    return { data };
  };

  const renderTree = (node: TreeNode, level: number = 0) => (
    <ul key={node.name} className='pl-4'>
      <li className={`pl-${level * 4}`}>
        {node.name}
        {node.children && node.children.length > 0 && (
          <ul>{node.children.map((child) => renderTree(child, level + 1))}</ul>
        )}
      </li>
    </ul>
  );

  return (
    <div className='mx-auto max-w-md space-y-4 rounded-xl bg-white p-6 shadow-md'>
      <h1 className='text-2xl font-bold'>Carica un file ZIP/RAR</h1>
      <input
        type='file'
        onChange={handleFileUpload}
        className='block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100'
      />

      {uploading && <p>Caricamento in corso...</p>}

      {fileTree && (
        <div className='mt-4'>
          <h2 className='text-xl font-semibold'>Struttura del file:</h2>
          <pre className='text-left text-sm'>{renderTree(fileTree)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
