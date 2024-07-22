import prisma from '@/lib/prisma';

async function getData() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return feed;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  );
}
