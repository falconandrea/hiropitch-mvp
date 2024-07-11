import { CustomIcons } from '@/components/CustomIcons';
import { InterfacePost } from '@/lib/interfaces';
import Link from 'next/link';

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

const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName ? firstName.charAt(0) : '';
  const lastInitial = lastName ? lastName.charAt(0) : '';
  return `${firstInitial}${lastInitial}`;
};

export default function ListPost({ post }: { post: InterfacePost }) {
  const initials = getInitials(post.userId.firstName, post.userId.lastName);

  return (
    <div className='mb-10'>
      <div className='flex items-center'>
        <div className='mr-2 overflow-hidden rounded-full'>
          <div className='h-8 w-8 bg-red-500 text-white flex items-center justify-center'>
            {initials}
          </div>
        </div>
        <h2 className='m-0 font-bold'>
          <Link
            href={`/admin/ideas/${post.ideaId._id}`}
            title=''
            className='hover:underline'
          >
            {post.ideaId.title}
          </Link>
        </h2>
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
            <span>{post.likes.length || 0}</span>
            <CustomIcons.thumbsUp />
          </div>
          <div className='flex space-x-2'>
            <span>{post.replies.length || 0}</span>
            <CustomIcons.messageCircle />
          </div>
        </div>
        <div className='flex space-x-8'>
          <div className='flex space-x-2'>
            <CustomIcons.sparkles />
            <span>0</span>
          </div>
          <div className='flex space-x-2'>
            <CustomIcons.handshake />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
