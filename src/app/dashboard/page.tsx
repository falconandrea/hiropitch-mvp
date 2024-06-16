import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const { userId } = auth();
  console.log(userId);

  if (!userId) {
    return <p>You are not signed in</p>;
  }

  const { user } = useUser();
  console.log(user);

  return <div>Dashboard</div>;
}
