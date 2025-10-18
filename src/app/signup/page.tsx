"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHotels, Hotel, register } from "../../actions/actions";
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelId, setHotelId] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    getHotels().then(setHotels).catch(() => setHotels([]));
  }, []);

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please pick a username and password.");
      return;
    }
    if (!hotelId) {
      setError("Please select a hotel to join.");
      return;
    }
    setError("");
    toast.promise(
      register(username, password, undefined, hotelId).then((res) => {
        if (res?.status === 'ok' && res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          router.replace(`/hotel/${hotelId}/menu`);
          return res;
        }
        if (res?.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          router.replace(`/hotel/${hotelId}/menu`);
          return res;
        }
        throw new Error(res?.message || 'Registration failed');
      }),
      {
        loading: 'Creating account…',
        success: 'Account created ✓',
        error: (err: unknown) => String(err),
      }
    ).catch((e: unknown) => setError(String(e)));
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-hero bg-cover bg-center">
      <form onSubmit={handleSignUp} className="backdrop-blur-sm bg-white/85 p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-white/30">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white text-2xl font-bold">RS</div>
          <div>
            <h1 className="text-3xl font-extrabold">Create your account</h1>
            <p className="text-sm text-slate-600">Join a hotel's staff or order manager to get started</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        <label className="block text-sm font-medium mb-2">Select Hotel</label>
        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        >
          <option value="">-- choose a hotel --</option>
          {hotels.map(h => (
            <option key={h.id} value={h.id}>{h.name} — {h.city}</option>
          ))}
        </select>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-amber-400 text-white py-3 rounded-full font-semibold shadow-lg">Sign Up</button>

        <div className="mt-4 text-center text-sm">
          Already have an account? <a href="/signin" className="text-pink-600 underline">Sign In</a>
        </div>
      </form>
    </div>
  );
}
