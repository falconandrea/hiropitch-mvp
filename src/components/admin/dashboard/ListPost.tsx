import { CustomIcons } from '@/components/CustomIcons';

interface InterfacePost {
  title: string;
  description: string;
  counters: {
    like: number;
    comments: number;
    tips: number;
    investors: number;
  };
}

export default function ListPost(post: InterfacePost) {
  return (
    <div className='mb-10'>
      <div className='flex items-center'>
        <div className='mr-2 overflow-hidden rounded-full'>
          <div className='h-8 w-8 bg-red-500' />
        </div>
        <h2 className='m-0 font-bold'>{post.title}</h2>
      </div>
      <p className=''>
        {post.description}...{' '}
        <a href='#' title='' className='underline'>
          Leggi di più
        </a>
      </p>
      <div className='flex justify-between'>
        <div className='flex space-x-4'>
          <div className='flex space-x-2'>
            <span>{post.counters.like}</span>
            <CustomIcons.thumbsUp />
          </div>
          <div className='flex space-x-2'>
            <span>{post.counters.comments}</span>
            <CustomIcons.messageCircle />
          </div>
        </div>
        <div className='flex space-x-8'>
          <div className='flex space-x-2'>
            <CustomIcons.sparkles />
            <span>{post.counters.tips}</span>
          </div>
          <div className='flex space-x-2'>
            <CustomIcons.handshake />
            <span>{post.counters.investors}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
