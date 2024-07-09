'use client';

import ListPost from '@/components/admin/dashboard/ListPost';
import { getPosts } from '@/lib/actions/post.actions';
import { useEffect, useState } from 'react';
import { InterfacePost } from '@/lib/interfaces';
import Loading from '@/components/Loading';

export default function Dashboard() {
  // Get Posts from db
  const [posts, setPosts] = useState<InterfacePost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data from API
    const fetchPosts = async () => {
      try {
        const data = await getPosts({}, {}, 10);
        console.log('data', data);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching posts:', error);
      }
    };

    setLoading(true);
    fetchPosts();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {posts &&
        posts.map((post: InterfacePost) => (
          <ListPost key={post._id} post={post} />
        ))}
    </div>
  );
}
