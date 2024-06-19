import ListPost from '@/components/admin/dashboard/ListPost';

export default async function Dashboard() {
  const posts = [
    {
      id: 1,
      title: 'Man in Black',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      counters: {
        like: 10,
        comments: 20,
        tips: 5,
        investors: 15,
      },
    },
    {
      id: 2,
      title: "C'era una volta in America",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      counters: {
        like: 10,
        comments: 20,
        tips: 5,
        investors: 15,
      },
    },
    {
      id: 3,
      title: 'Inception',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      counters: {
        like: 10,
        comments: 20,
        tips: 5,
        investors: 15,
      },
    },
    {
      id: 4,
      title: 'I Sopranos',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      counters: {
        like: 10,
        comments: 20,
        tips: 5,
        investors: 15,
      },
    },
  ];

  return (
    <div>
      {posts.map((post) => (
        <ListPost
          key={post.id}
          title={post.title}
          description={post.description}
          counters={post.counters}
        />
      ))}
    </div>
  );
}
