'use client';

import ListIdeas from '@/components/admin/dashboard/ListIdeas';
import { getIdeas } from '@/lib/actions/idea.actions';
import { useEffect, useState } from 'react';

export default async function Dashboard() {
  // Get Ideas from db
  const [ideas, setIdeas] = useState<
    {
      id: number;
      title: string;
      description: string;
      counters: {
        like: number;
        comments: number;
        tips: number;
        investors: number;
      };
    }[]
  >([]);
  useEffect(() => {
    // Fetch data from API
    const fetchIdeas = async () => {
      try {
        const data = await getIdeas({}, {}, 10);
        setIdeas(data);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <div>
      {ideas.map((idea) => (
        <ListIdeas
          key={idea.id}
          title={idea.title}
          description={idea.description}
          counters={idea.counters}
        />
      ))}
    </div>
  );
}
