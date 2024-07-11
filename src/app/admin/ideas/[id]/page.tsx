'use client';

import Loading from '@/components/Loading';
import { getIdea } from '@/lib/actions/idea.actions';
import { getSmartContracts } from '@/lib/actions/smartcontract.actions';
import { InferfaceIdea } from '@/lib/interfaces';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IDEAS_IMAGES } from '@/app/admin/consts';
import { useUser } from '@clerk/nextjs';
import { getUserByClerkID } from '@/lib/actions/user.actions';

export default function IdeaDetailPage() {
  // Get id idea from url
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<InferfaceIdea>();
  const { id } = params;
  const { user } = useUser();
  const [nda, setNda] = useState<boolean>(false);
  const image = `/ideas/${IDEAS_IMAGES[id]}`;
  const [ideaContract, setIdeaContract] = useState<string>();

  useEffect(() => {
    if (user && user.id) {
      const getUserInfo = async (clerkId: string) => {
        try {
          if (clerkId) {
            const data = await getUserByClerkID(clerkId);
            fetchIdea(id);
            fetchIdeaContract(id, data._id);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
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
            console.log('fetch idea contract');
          }
        } catch (error) {
          console.error('Error fetching idea contract:', error);
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
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching smart contract:', error);
        }
      };

      setLoading(true);
      getUserInfo(user.id);
    }
  }, [user]);

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

  return (
    <div className='max-w-2lg mx-auto'>
      {loading && <Loading />}

      {!loading && idea && !nda && (
        <div className='flex flex-col border-2 p-4'>
          You have to accept NDA to see the idea content.
          <button className='mt-8 inline-block border-2' onClick={signNDA}>
            Accept NDA
          </button>
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
            </div>

            {/* RIGHT SECTION */}
            <div className='w-full xl:w-1/2'>
              <Image alt='Image Idea' width={600} height={300} src={image} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
