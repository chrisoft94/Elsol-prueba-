// app/posts/page.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/ui/Btn";



export default function PostsPage() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {console.log("PostsPage component rendered");
    console.log("Search query:", search);
    console.log("Sort order:", sortOrder);
    console.log("posts",posts)
    console.log("Filtered posts:", filteredPosts);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return res.json();
    },
  });

  if (isLoading) return <p>Cargando publicaciones...</p>;

  const filteredPosts = (posts ?? [])
  .filter((post: any) =>
    post?.title?.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a: any, b: any) =>
    sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
  Ordenar ({sortOrder === "asc" ? "A-Z" : "Z-A"})
</Button>
{/* <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}> Ordenar ({sortOrder === "asc" ? "A-Z" : "Z-A"})</Button> */}
        {/* <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Ordenar ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button> */}
      </div>

      <ul className="space-y-4">
        {filteredPosts.map((post: any) => (
          <li key={post.id} className="border p-4 rounded-lg shadow-md">
            <a href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
