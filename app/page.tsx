"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  // Filtrar usuarios según el texto de búsqueda
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>

      {/* Input para filtrar */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />

      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li key={user.id} className="border p-4 rounded-lg shadow-md">
            <a href={`/users/${user.id}`} className="text-blue-600 hover:underline">
              {user.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
