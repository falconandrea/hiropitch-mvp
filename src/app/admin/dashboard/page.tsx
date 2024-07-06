'use client';

import ListPost from '@/components/admin/dashboard/ListPost';
import { getPosts } from '@/lib/actions/post.actions';
import { useEffect, useState } from 'react';
import { InterfacePost } from '@/lib/interfaces';

export default function Dashboard() {
  // Get Posts from db
  const [posts, setPosts] = useState<InterfacePost[]>([]);

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
      {posts && posts.map((post: InterfacePost) => <ListPost post={post} />)}
    </div>
  );
}
