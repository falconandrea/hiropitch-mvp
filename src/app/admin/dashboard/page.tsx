'use client';

import ListPost from '@/components/admin/dashboard/ListPost';
import { getPosts } from '@/lib/actions/post.actions';
import { useEffect, useState } from 'react';
import { InterfacePost } from '@/lib/interfaces';
import Loading from '@/components/Loading';
import { useUser } from '@clerk/nextjs';
import { getUserByClerkID } from '@/lib/actions/user.actions';

export default function Dashboard() {
  // Get Posts from db
  const [posts, setPosts] = useState<InterfacePost[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    if (!user) return;

    // Fetch data from API
    const fetchPosts = async () => {
      try {
        const data = await getPosts({}, { createdAt: -1 }, 10);
        console.log('data', data);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching posts:', error);
      }
    };

    const getUserInfo = async (clerkId: string) => {
      try {
        if (clerkId) {
          const data = await getUserByClerkID(clerkId);
          setCurrentUser(data._id);
          fetchPosts();
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    setLoading(true);
    getUserInfo(user.id);
  }, [user]);

  return (
    <div>
      {loading && <Loading />}
      {posts &&
        posts.map((post: InterfacePost) => (
          <ListPost key={post._id} post={post} currentUser={currentUser} />
        ))}
    </div>
  );
}
