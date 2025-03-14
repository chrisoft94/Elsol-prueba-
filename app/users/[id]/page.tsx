"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams(); // Ahora los parámetros son dinámicos
  const userId = params.id as string; // Asegurar que sea un string

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (!userId) return; // Asegurar que userId esté disponible

    const fetchData = async () => {
      const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const userData = await userRes.json();
      setUser(userData);

      const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const postsData = await postsRes.json();
      setPosts(postsData);
    };

    fetchData();
  }, [userId]);

  // Filtrar posts según el título
  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));

  if (!user) return <p className="text-center mt-10">Cargando usuario...</p>;

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>

      <h2 className="text-xl font-semibold mt-6">Posts:</h2>

      <div className="flex gap-4 mt-2 mb-4">
        <input
          type="text"
          placeholder="Buscar post..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {sortAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
        </button>
      </div>

      <ul className="mt-4 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.id} className="border p-4 rounded-lg shadow-md">
              <a href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No hay posts que coincidan con la búsqueda.</p>
        )}
      </ul>
    </main>
  );
}
