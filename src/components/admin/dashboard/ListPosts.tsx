import { CustomIcons } from '@/components/CustomIcons';

interface InterfacePost {
  content: string;
  counters?: {
    like: number;
    comments: number;
    tips: number;
    investors: number;
  };
}

export default function ListPosts(post: InterfacePost) {
  return (
    <div className='mb-10'>
      <div className='flex items-center'>
        <div className='mr-2 overflow-hidden rounded-full'>
          <div className='h-8 w-8 bg-red-500' />
        </div>
        <h2 className='m-0 font-bold'>ASD</h2>
      </div>
      <p className=''>
        {post.content}...{' '}
        <a href='#' title='' className='underline'>
          Leggi di più
        </a>
      </p>
      <div className='flex justify-between'>
        <div className='flex space-x-4'>
          <div className='flex space-x-2'>
            <span>{post.counters?.like || 0}</span>
            <CustomIcons.thumbsUp />
          </div>
          <div className='flex space-x-2'>
            <span>{post.counters?.comments || 0}</span>
            <CustomIcons.messageCircle />
          </div>
        </div>
        <div className='flex space-x-8'>
          <div className='flex space-x-2'>
            <CustomIcons.sparkles />
            <span>{post.counters?.tips || 0}</span>
          </div>
          <div className='flex space-x-2'>
            <CustomIcons.handshake />
            <span>{post.counters?.investors || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
