import { CustomIcons } from '@/components/CustomIcons';

interface InterfaceIdea {
  title: string;
  description: string;
  counters?: {
    like: number;
    comments: number;
    tips: number;
    investors: number;
  };
}

export default function ListIdeas(idea: InterfaceIdea) {
  return (
    <div className='mb-10'>
      <div className='flex items-center'>
        <div className='mr-2 overflow-hidden rounded-full'>
          <div className='h-8 w-8 bg-red-500' />
        </div>
        <h2 className='m-0 font-bold'>{idea.title}</h2>
      </div>
      <p className=''>
        {idea.description}...{' '}
        <a href='#' title='' className='underline'>
          Leggi di più
        </a>
      </p>
      <div className='flex justify-between'>
        <div className='flex space-x-4'>
          <div className='flex space-x-2'>
            <span>{idea.counters?.like || 0}</span>
            <CustomIcons.thumbsUp />
          </div>
          <div className='flex space-x-2'>
            <span>{idea.counters?.comments || 0}</span>
            <CustomIcons.messageCircle />
          </div>
        </div>
        <div className='flex space-x-8'>
          <div className='flex space-x-2'>
            <CustomIcons.sparkles />
            <span>{idea.counters?.tips || 0}</span>
          </div>
          <div className='flex space-x-2'>
            <CustomIcons.handshake />
            <span>{idea.counters?.investors || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
