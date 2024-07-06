import { CustomIcons } from '@/components/CustomIcons';
import { InterfacePost } from '@/lib/interfaces';

const shortText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
};

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = ('0' + d.getDate()).slice(-2);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  const hours = ('0' + d.getHours()).slice(-2);
  const minutes = ('0' + d.getMinutes()).slice(-2);
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default function ListPost({ post }: { post: InterfacePost }) {
  return (
    <div className='mb-10'>
      <div className='flex items-center'>
        <div className='mr-2 overflow-hidden rounded-full'>
          <div className='h-8 w-8 bg-red-500' />
        </div>
        <h2 className='m-0 font-bold'>{post.ideaId.title}</h2>
      </div>
      <p className='mt-2'>
        <i>
          [{post.userId.firstName} {post.userId.lastName} -{' '}
          {formatDate(post.createdAt)}]
          <br />
        </i>
        {shortText(post.content, 200)}
        {post.content.length > 200 && (
          <>
            <a href='#' title='' className='underline'>
              Read more
            </a>
          </>
        )}
      </p>
      <div className='mt-4 flex justify-between border-b-2 pb-4'>
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
