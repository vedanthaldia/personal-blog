"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid password");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <header className="mb-8">
        <h1>Admin</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-sans text-muted mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            autoFocus
          />
        </div>
        
        {error && <p className="text-red-600 text-sm m-0">{error}</p>}
        
        <button type="submit" className="p-2 bg-foreground text-background rounded font-sans">
          Log In
        </button>
      </form>
    </div>
  );
}
