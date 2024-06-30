import { ChangeEvent } from 'react';
import JSZip from 'jszip';

interface TreeNode {
  name: string;
  type: 'directory' | 'file';
  children?: TreeNode[];
}

interface FileUploaderProps {
  onFileSelect: (file: File, structure: TreeNode) => void;
  name: string;
  label: string;
}

const returnStructure = async (file: File): Promise<TreeNode> => {
  const zip = new JSZip();
  const content = await zip.loadAsync(file);

  const root: TreeNode = { name: '/', type: 'directory', children: [] };

  content.forEach((relativePath, zipEntry) => {
    const parts = relativePath.split('/');
    let currentNode = root;

    parts.forEach((part, index) => {
      if (part) {
        const isFile = /\.[0-9a-z]{1,5}$/i.test(part);

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

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  name,
  label,
}) => {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType !== 'zip' && fileType !== 'rar') {
        alert('Puoi caricare solo file ZIP o RAR.');
        event.target.value = '';
        return;
      }

      const structure = await returnStructure(file);

      onFileSelect(file, structure);
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

export default FileUploader;
