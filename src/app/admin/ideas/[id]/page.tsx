'use client';

import Loading from '@/components/Loading';
import { getIdea } from '@/lib/actions/idea.actions';
import { getSmartContracts } from '@/lib/actions/smartcontract.actions';
import { InferfaceIdea } from '@/lib/interfaces';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function IdeaDetailPage() {
  // Get id idea from url
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<InferfaceIdea>();
  const [smartContract, setSmartContract] = useState<string>();
  const { id } = params;

  useEffect(() => {
    const fetchIdea = async (id: string) => {
      const data = await getIdea(id);
      setIdea(data);
    };

    const fetchSmartContracts = async (ideaId: string) => {
      const data = await getSmartContracts({ ideaId, type: 'NFT' }, {}, 1);
      setSmartContract(data[0].contractAddress);
      setLoading(false);
    };

    setLoading(true);
    fetchIdea(id);
    fetchSmartContracts(id);
  }, []);

  return (
    <div className='max-w-2lg mx-auto'>
      {loading && <Loading />}
      <div>
        {idea && (
          <div className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'>
            <h1 className='mb-2 text-center text-4xl font-bold'>
              {idea.title}
            </h1>
            <h2 className='w full mb-8 text-center font-sans text-xl'>
              {idea.description}
            </h2>
            <div className='mb-4'>
              <p>
                <strong>ID:</strong>
              </p>
              <p>{idea._id}</p>
            </div>
            <div className='mb-4'>
              <p>
                <strong>Description:</strong>
              </p>
              <div>{idea.description}</div>
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
              <p>{idea.creatorId.firstName + ' ' + idea.creatorId.lastName}</p>
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
                  href='https://explorer.solana.com/address/DgVCwoPonMvQzcsWwN8SzJfh7f97nZEmArPiCpmdLdRs?cluster=devnet'
                  title=''
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  {smartContract}
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
        )}
      </div>
    </div>
  );
}
