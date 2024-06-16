import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Dashboard() {
  const { userId } = auth();
  const { user } = useUser();

  if (!userId) {
    return <p>You are not signed in</p>;
  }

  console.log(userId);
  console.log(user);

  return <div>Dashboard</div>;
}
