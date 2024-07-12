import { CustomIcons } from '@/components/CustomIcons';
import { InterfacePost } from '@/lib/interfaces';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { toggleLike } from '@/lib/actions/post.actions';

const shortText = (text: string, length: number, isExpanded: boolean) => {
  if (isExpanded || text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
};

const getInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName ? firstName.charAt(0) : '';
  const lastInitial = lastName ? lastName.charAt(0) : '';
  return `${firstInitial}${lastInitial}`;
};

export default function ListPost({
  post,
  currentUser,
}: {
  post: InterfacePost;
  currentUser: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLikeValue = async (postId: string) => {
    await toggleLike(postId, currentUser).then(() => {
      window.location.reload();
    });
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const initials = getInitials(post.userId.firstName, post.userId.lastName);

  return (
    <div className='mb-10'>
      <div className='flex items-center'>
        <div className='mr-2 overflow-hidden rounded-full'>
          <div className='flex h-8 w-8 items-center justify-center bg-red-500 text-white'>
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
        {shortText(post.content, 200, isExpanded)}
        {post.content.length > 200 && (
          <>
            <a href='#' onClick={handleReadMore} className='underline'>
              {isExpanded ? 'Read less' : 'Read more'}
            </a>
          </>
        )}
      </p>
      <div className='mt-4 flex justify-between border-b-2 pb-4'>
        <div className='flex space-x-4'>
          <div
            className='flex cursor-pointer space-x-2'
            onClick={() => toggleLikeValue(post._id)}
          >
            <span>{post.likes.length || 0}</span>
            {post.likes.includes(currentUser) ? (
              <CustomIcons.thumbsUp color='#ef4444' fill='#ef4444' />
            ) : (
              <CustomIcons.thumbsUp />
            )}
          </div>
          <div className='flex space-x-2'>
            <Link
              href={`/admin/ideas/${post.ideaId._id}`}
              title=''
              className='flex space-x-2'
            >
              <span>{post.replies.length || 0}</span>
              <CustomIcons.messageCircle />
            </Link>
          </div>
        </div>
        <div className='flex space-x-8'>
          <div className=''>
            <Link
              href={`/admin/ideas/${post.ideaId._id}`}
              title=''
              className='flex space-x-2'
            >
              <CustomIcons.sparkles />
              <span>0</span>
            </Link>
          </div>
          <div className=''>
            <Link
              href={`/admin/ideas/${post.ideaId._id}`}
              title=''
              className='flex space-x-2'
            >
              <CustomIcons.handshake />
              <span>0</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
