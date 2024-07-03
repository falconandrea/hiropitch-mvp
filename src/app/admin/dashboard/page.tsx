'use client';

import ListPosts from '@/components/admin/dashboard/ListPosts';
import { getPosts } from '@/lib/actions/post.actions';
import { useEffect, useState } from 'react';

export default async function Dashboard() {
  // Get Posts from db
  const [posts, setPosts] = useState<
    {
      id: number;
      content: string;
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
    const fetchPosts = async () => {
      try {
        const data = await getPosts({}, {}, 10);
        console.log('data', data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <ListPosts
            key={post.id}
            content={post.content}
            counters={post.counters}
          />
        ))}
    </div>
  );
}
