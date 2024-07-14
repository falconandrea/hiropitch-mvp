'use client';

import { CustomIcons } from '@/components/CustomIcons';
import Loading from '@/components/Loading';
import { getIdea } from '@/lib/actions/idea.actions';
import { getSmartContracts } from '@/lib/actions/smartcontract.actions';
import { InferfaceIdea, InterfacePost } from '@/lib/interfaces';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getUserByClerkID } from '@/lib/actions/user.actions';
import { getPosts, toggleLike } from '@/lib/actions/post.actions';
import { formatDate } from '@/lib/utils';
import TextareaInput from '@/components/inputs/TextareaInput';
import React from 'react';


export default function IdeaDetailPage() {
  // Get id idea from url
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<InferfaceIdea>();
  const { id } = params;
  const { user } = useUser();
  const [currentUserId, setCurrentUserId] = useState<string>();
  const [nda, setNda] = useState<boolean>(false);
  const [ideaContract, setIdeaContract] = useState<string>();
  const [posts, setPosts] = useState<InterfacePost[]>();
  const [reply, setReply] = useState<string>('');

  useEffect(() => {
    if (user && user.id) {
      const getUserInfo = async (clerkId: string) => {
        try {
          if (clerkId) {
            const data = await getUserByClerkID(clerkId);
            fetchIdea(id);
            setCurrentUserId(data._id);
            fetchIdeaContract(id, data._id);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          setLoading(false);
        }
      };

      const fetchIdea = async (id: string) => {
        try {
          if (id) {
            const data = await getIdea(id);
            setIdea(data);
          }
        } catch (error) {
          console.error('Error fetching idea:', error);
          setLoading(false);
        }
      };

      const fetchIdeaContract = async (ideaId: string, userId: string) => {
        try {
          if (ideaId) {
            const data = await getSmartContracts(
              { ideaId, type: 'NFT' },
              {},
              1
            );
            if (data.length > 0) setIdeaContract(data[0].contractAddress);
            fetchNDA(ideaId, userId);
          }
        } catch (error) {
          console.error('Error fetching idea contract:', error);
          setLoading(false);
        }
      };
      

      const fetchNDA = async (ideaId: string, userId: string) => {
        try {
          if (ideaId) {
            const data = await getSmartContracts(
              { ideaId, type: 'NDA', signer: userId },
              {},
              1
            );
            setNda(data && data.length > 0);
            fetchPosts(ideaId);
          }
        } catch (error) {
          console.error('Error fetching smart contract:', error);
          setLoading(false);
        }
      };

      const fetchPosts = async (ideaId: string) => {
        try {
          const data = await getPosts({ ideaId }, { createdAt: -1 }, 0);
          setPosts(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching comments:', error);
          setLoading(false);
        }
      };

      setLoading(true);
      getUserInfo(user.id);
    }
  }, [user, id]);

  const onChangeReply = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(event.target.value);
  };

  const submitReply = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();

    if (reply && idea) {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/posts/reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ideaId: idea._id,
            reply,
            postId,
          }),
        });
        if (response.ok) {
          // Reload page
          window.location.reload();
        } else {
          // Error handling
          console.error('Reply submission failed.', await response.text());
        }
      } catch (error) {
        console.error('Error submitting reply:', error);
      }
    }
  };

  const signNDA = async () => {
    if (idea && ideaContract) {
      try {
        setLoading(true);

        // Fix authors list
        let authorsData = '';
        for (let i = 0; i < idea.authors.length; i++) {
          authorsData +=
            idea.authors[i].firstName +
            ' ' +
            idea.authors[i].lastName +
            ' (' +
            idea.authors[i]._id +
            ')';
          if (i !== idea.authors.length - 1) {
            authorsData += ', ';
          }
        }

        const response = await fetch('/api/admin/ideas/nda', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ideaId: idea._id,
            ideaContract,
            ideaTitle: idea.title,
            authors: authorsData,
          }),
        });
        if (response.ok) {
          // Success handling
          console.log('NDA signed successfully!');
        } else {
          // Error handling
          console.error('NDA request submission failed.');
        }
      } catch (error) {
        console.error('Error submitting nda request:', error);
      } finally {
        setLoading(false);

        // Reload page
        window.location.reload();
      }
    }
  };

  const toggleLikeValue = async (postId: string) => {
    await toggleLike(postId, currentUserId as string).then(() => {
      window.location.reload();
    });
  };



  
  return (
    <div className='max-w-2lg mx-auto'>
      {loading && <Loading />}

      {!loading && !idea && <p className='text-center'>No idea found.</p>}

      {!loading && idea && !nda && (
        <div className='flex flex-col border-2 p-4'>
          You have to accept NDA to see the idea content.
          {ideaContract ? (
            <button
              className='mx-auto mt-8 inline-block w-32 border-2 border-gray-800 px-4 py-2 hover:bg-gray-800 hover:text-white'
              onClick={signNDA}
            >
              Accept NDA
            </button>
          ) : (
            <p className='mt-8 text-center font-bold text-red-400'>
              There is an error fetching the contract. Contact the support team
              to fix it, thanks.
            </p>
          )}
        </div>
      )}

      {!loading && idea && nda && (
        <div className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'>
          <h1 className='mb-2 text-center text-4xl font-bold'>{idea.title}</h1>
          <h2 className='w full mb-8 text-center font-sans text-xl'>
            {idea.description}
          </h2>

          <div className='xl:flex xl:gap-x-4'>
            {/* LEFT SECTION */}
            <div className='w-full xl:w-1/2'>
              <div className='mb-4'>
                <p>
                  <strong>ID:</strong>
                </p>
                <p>{idea._id}</p>
              </div>
              <div className='mb-4'>
                <p>
                  <strong>Category:</strong>
                </p>
                <p>{idea.category}</p>
              </div>
              <div className='mb-4'>
                <p>
                  <strong>Contract Type:</strong>
                </p>
                <p>{idea.contractType}</p>
              </div>
              <div className='mb-4'>
                <p>
                  <strong>Reference links:</strong>
                </p>
                <ul className='mb-0'>
                  {idea.referenceLinks.map((link) => (
                    <li key={link}>
                      <a
                        href={link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline'
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mb-4'>
                <p>
                  <strong>Creator:</strong>
                </p>
                <p>
                  {idea.creatorId.firstName + ' ' + idea.creatorId.lastName}
                </p>
              </div>
              <div className='mb-4'>
                <p>
                  <strong>Authors:</strong>
                </p>
                <ul>
                  {idea.authors.map((author) => (
                    <li key={author._id}>
                      {author.firstName + ' ' + author.lastName}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mb-4'>
                <p>
                  <strong>Contract Address NFT Collection:</strong>
                </p>
                <p>
                  <a
                    href={`https://explorer.solana.com/address/${ideaContract}?cluster=devnet`}
                    title=''
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                  >
                    {ideaContract}
                  </a>
                </p>
              </div>
              <div className='mb-4'>
                <p>
                  <strong>N. NFTs:</strong>
                </p>
                <p>{idea.nftQty}</p>
              </div>
              <div className='mb-4'>
                <p>
                  <strong>Price single NFT:</strong>
                </p>
                <p>{idea.nftPrice} Sol</p>
              </div>
              
              {/* Aggiunta del nuovo campo "Contenuto" */}
              <div className='mb-4'>
                <p>
                  <strong>Content:</strong>
                </p>
               
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className='w-full xl:w-1/2'>
              {idea.image && idea.image.filePublicUrl && (
                <Image
                  alt='Image Idea'
                  width={600}
                  height={300}
                  src={idea.image.filePublicUrl}
                />
              )}

              {/* List of comments */}
              {posts && (
                <div className='mt-4'>
                  <h3 className='mb-2 text-xl font-bold'>Comments</h3>
                  <ul>
                    {posts.map((post) => (
                      <li key={post._id} className='bg-gray-200 px-2 py-1'>
                        <p>
                          <i>
                            [{post.userId.firstName} {post.userId.lastName} -{' '}
                            {formatDate(post.createdAt)}]
                            <br />
                          </i>
                        </p>
                        <div>{post.content}</div>
                        <div
                          className='mb-4 flex cursor-pointer justify-end space-x-4'
                          onClick={() => toggleLikeValue(post._id)}
                        >
                          <div className='flex space-x-2'>
                            <span>{post.likes.length || 0}</span>
                            {post.likes.includes(currentUserId as string) ? (
                              <CustomIcons.thumbsUp
                                color='#ef4444'
                                fill='#ef4444'
                              />
                            ) : (
                              <CustomIcons.thumbsUp />
                            )}
                          </div>
                          <div className='flex space-x-2'>
                            <span>{post.replies.length || 0}</span>
                            <CustomIcons.messageCircle />
                          </div>
                        </div>
                        {post.replies.length > 0 && (
                          <div>
                            {post.replies.map((reply) => (
                              <p
                                key={reply._id}
                                className='mt-2 bg-slate-400 px-2 py-1'
                              >
                                <i>
                                  [{reply.author.firstName}{' '}
                                  {reply.author.lastName} -{' '}
                                  {formatDate(reply.date)}]
                                  <br />
                                </i>
                                {reply.text}
                              </p>
                            ))}
                          </div>
                        )}
                        {currentUserId && (
                          <form className='mt-4' method='POST'>
                            <TextareaInput
                              label='Message'
                              name='reply'
                              placeholder='Your message'
                              value={reply}
                              onChange={onChangeReply}
                            />
                            <div className='flex justify-end'>
                              <button
                                type='submit'
                                disabled={loading}
                                onClick={(event) =>
                                  submitReply(event, post._id)
                                }
                                className='focus:shadow-outline mb-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
                              >
                                Reply
                              </button>
                            </div>
                          </form>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
