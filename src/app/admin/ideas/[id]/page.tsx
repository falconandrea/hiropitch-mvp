'use client';

import Loading from '@/components/Loading';
import { getIdea } from '@/lib/actions/idea.actions';
import { InferfaceIdea } from '@/lib/interfaces';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function IdeaDetailPage() {
  // Get id idea from url
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<InferfaceIdea>();
  const { id } = params;

  useEffect(() => {
    const fetchIdea = async (id: string) => {
      const data = await getIdea(id);
      setIdea(data);
      setLoading(false);
      console.log(data);
    };

    setLoading(true);
    fetchIdea(id);
  }, []);

  return (
    <div>
      <div>
        {loading && <Loading />}
        {idea ? (
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
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
