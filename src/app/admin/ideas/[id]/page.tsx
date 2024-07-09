'use client';

import Loading from '@/components/Loading';
import { getIdea } from '@/lib/actions/idea.actions';
import { getSmartContracts } from '@/lib/actions/smartcontract.actions';
import { getUserByClerkID } from '@/lib/actions/user.actions';
import { InferfaceIdea, InterfaceSmartContract } from '@/lib/interfaces';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function IdeaDetailPage() {
  // Get id idea from url
  const params = useParams<{ id: string }>();

  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [idea, setIdea] = useState<InferfaceIdea>();
  const [ideaContract, setIdeaContract] = useState<InterfaceSmartContract>();
  const [nda, setNda] = useState<boolean>(false);
  const { id } = params;

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
            fetchSmartContract(ideaId, userId);
            console.log('fetch idea contract');
          }
        } catch (error) {
          console.error('Error fetching idea contract:', error);
        }
      };

      const fetchSmartContract = async (ideaId: string, userId: string) => {
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
    <div>
      <div>
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
          <div>
            <p>ID: {idea._id}</p>
            <p>Title: {idea.title}</p>
            <p>Description: {idea.description}</p>
            <p>Category: {idea.category}</p>
            <p>Contract Type: {idea.contractType}</p>
            <p>Reference links:</p>
            <ul className='pl-2'>
              {idea.referenceLinks.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
            <p>
              Creator:{' '}
              {idea.creatorId.firstName + ' ' + idea.creatorId.lastName}
            </p>
            <p>Authors:</p>
            <ul className='pl-2'>
              {idea.authors.map((author) => (
                <li key={author._id}>
                  {author.firstName + ' ' + author.lastName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
