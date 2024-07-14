import React from 'react';
import { CustomIcons } from '../CustomIcons';

const renderTree = (node: any) => {
  if (node.type === 'file') {
    if (
      node.name !== '__MACOSX' &&
      node.name !== '.DS_Store' &&
      node.name !== 'Thumbs.db' &&
      node.name !== '._.DS_Store'
    ) {
      return (
        <li key={node.name} className='flex items-center'>
          <CustomIcons.file className='mr-2 h-4 w-4' />
          {node.name}
        </li>
      );
    }
  } else if (node.type === 'directory') {
    if (
      node.name !== '__MACOSX' &&
      node.name !== '.DS_Store' &&
      node.name !== '._.DS_Store'
    ) {
      return (
        <li key={node.name} className='ml-2 pl-2'>
          <div className='flex items-center'>
            <CustomIcons.folder className='mr-2 h-4 w-4' />
            {node.name}
          </div>
          <ul>{node.children.map((child: any) => renderTree(child))}</ul>
        </li>
      );
    }
  }
};

const DirectoryTree = ({ treeData }: { treeData: any }) => {
  return (
    <div>
      <ul>{renderTree(treeData)}</ul>
    </div>
  );
};

export default DirectoryTree;
