"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function PostDetail({ postId }: { postId: string }) {
  const params = useParams();
  const id = String(postId || params.id);
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState({ postId: id, name: "", body: "" });

  // Fetch del post
  const { data: post, isLoading: loadingPost } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return res.json();
    },
  });

  // Fetch de comentarios
  const { data: comments, isLoading: loadingComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      return res.json();
    },
  });

  interface Comment {
    postId: string;
    name: string;
    body: string;
  }

  // ✅ Mutación corregida (nuevo formato de React Query v5)
  const addCommentMutation = useMutation({
    mutationFn: async (newComment: Comment) => {
      return { id: Date.now(), ...newComment }; // Simula un comentario agregado
    },
    onSuccess: (newComment) => {
      queryClient.setQueryData(["comments", id], (oldComments: Comment[] = []) => [
        ...oldComments,
        newComment,
      ]);
    },
  });

  if (loadingPost || loadingComments) return <p>Cargando...</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.body) return;
    addCommentMutation.mutate({ postId: id, name: newComment.name, body: newComment.body });
    setNewComment({ postId: id, name: "", body: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
      
      <h2 className="mt-4 text-xl font-semibold">Comentarios</h2>
      {comments?.map((comment: { id: number; name: string; body: string }) => (
        <div key={comment.id} className="border p-2 mt-2 rounded-lg bg-gray-100">
          <strong>{comment.name}</strong>
          <p>{comment.body}</p>
        </div>
      ))}

      <h3 className="mt-4 text-lg font-semibold">Añadir un comentario</h3>
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          placeholder="Tu nombre"
          value={newComment.name}
          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
          className="border p-2 w-full rounded mb-2"
        />
        <textarea
          placeholder="Escribe un comentario"
          value={newComment.body}
          onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          className="border p-2 w-full rounded mb-2"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Añadir Comentario
        </button>
      </form>
    </div>
  );
}

export default PostDetail;
