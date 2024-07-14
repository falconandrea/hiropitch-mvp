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
import DirectoryTree from '@/components/admin/DirectoryTree';
import Link from 'next/link';
import NumberInput from '@/components/inputs/NumberInput';
import { getTransactions } from '@/lib/actions/transaction.actions';

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
  const [nftMinted, setNftMinted] = useState<number>(0);
  const [quantityToMint, setQuantityToMint] = useState<string>('1');

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
            if (data.length > 0) {
              console.log('data', data[0]);
              setIdeaContract(data[0].contractAddress);
              fetchNftMinted(data[0]._id);
            }
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

      const fetchNftMinted = async (smartContractId: string) => {
        try {
          if (smartContractId) {
            const data = await getTransactions(
              { smartContractId, description: 'Mint NFT' },
              {},
              0
            );
            setNftMinted(data.length);
          }
        } catch (error) {
          console.error('Error fetching idea contract:', error);
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

  const onChangeQuantityToMint = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuantityToMint(event.target.value);
  };

  const [errorMintNFT, setErrorMintNFT] = useState<string>('');
  const [showErrorMintNFT, setShowErrorMintNFT] = useState<boolean>(false);

  const mintNFT = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantityToMint && Number(quantityToMint) > 0 && idea) {
      try {
        setLoading(true);

        setShowErrorMintNFT(false);
        setErrorMintNFT('');

        const response = await fetch('/api/admin/ideas/mint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity: Number(quantityToMint),
            contractAddress: ideaContract,
            ideaId: idea._id,
            maxMintAmount: Number(idea.nftQty) - nftMinted,
          }),
        });
        if (response.ok) {
          // Success handling
          console.log('Mint NFT successfully!');
        } else {
          // Error handling
          console.error('Mint NFT failed.');

          const errorData = await response.json();
          setShowErrorMintNFT(true);
          setErrorMintNFT(errorData.message);
        }
      } catch (error) {
        console.error('Error submitting mint nft:', error);
      } finally {
        setLoading(false);

        // Reload page
        // window.location.reload();
      }
    }
  };

  return (
    <div className='max-w-2lg mx-auto'>
      {loading && <Loading />}

      {!loading && !idea && <p className='text-center'>No idea found.</p>}

      {!loading && idea && !nda && (
        <div className='flex flex-col border-2 p-4'>
          By clicking 'Submit,' you agree to the terms of the Non-Disclosure
          Agreement (NDA).
          {ideaContract ? (
            <button
              className='mx-auto mt-8 inline-block w-64 border-2 border-gray-800 px-4 py-2 hover:bg-gray-800 hover:text-white'
              onClick={signNDA}
            >
              Submit and Acknowledge NDA Agreement
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

              {idea.fileStructure && idea.file && (
                <div>
                  <div className='mb-4'>
                    <p>
                      <strong>Download archive with Idea files:</strong> <br />
                      <Link
                        className='underline'
                        href={idea.file.filePublicUrl}
                        title='Download archive file'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Download
                      </Link>
                    </p>
                  </div>
                  <div className='mb-4'>
                    <div>
                      <strong>Archive Structure:</strong>
                      <DirectoryTree treeData={idea.fileStructure} />
                    </div>
                  </div>
                </div>
              )}
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

          <hr className='mt-4' />

          {/* Mint NFT */}
          <div>
            <h3 className='mb-2 mt-6 text-xl font-bold'>Mint NFT</h3>
            <div className='md:flex'>
              <div className='w-full md:w-1/2'>
                <p className='mt-4'>
                  <strong>Mint NFT status:</strong> {nftMinted} / {idea.nftQty}{' '}
                  minted
                </p>
                <p className='mt-2'>
                  <strong>Your NFT quantity:</strong> {nftMinted}
                </p>
                <p className='mt-2'>
                  <strong>NFT price:</strong> {idea.nftPrice} Sol
                </p>
              </div>
              {nftMinted < Number(idea.nftQty) && (
                <form method='POST' className='w-full md:w-1/2' id='mint-form'>
                  <div className='w-64'>
                    <NumberInput
                      label='Quantity NFT to mint'
                      name='quantityToMint'
                      step='1'
                      max={Number(idea.nftQty) - nftMinted}
                      placeholder='How many NFTs to mint?'
                      value={quantityToMint}
                      onChange={onChangeQuantityToMint}
                    />
                  </div>
                  <button
                    type='submit'
                    disabled={loading}
                    onClick={mintNFT}
                    className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
                  >
                    Mint
                  </button>
                </form>
              )}
            </div>
            {showErrorMintNFT && <p className='text-red-500'>{errorMintNFT}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
