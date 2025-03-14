// components/Comments.tsx
"use client";

import { useQuery } from "@tanstack/react-query";

export default function Comments({ postId }: { postId: string }) {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      return res.json();
    },
  });

  if (isLoading) return <p>Cargando comentarios...</p>;

  return (
    <ul className="mt-4 space-y-4">
      {comments.map((comment: any) => (
        <li key={comment.id} className="border p-4 rounded-lg shadow-md">
          <p className="font-semibold">{comment.name}</p>
        </li>
      ))}
    </ul>
  );
}
