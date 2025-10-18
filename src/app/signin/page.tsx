"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHotels, Hotel, login } from "../../actions/actions";
import toast from 'react-hot-toast';

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelId, setHotelId] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    getHotels().then(setHotels).catch(() => setHotels([]));
  }, []);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError("Please enter username and password.");
      return;
    }
    if (!hotelId) {
      setError("Please select a hotel.");
      return;
    }

    toast.promise(
      login(username, password, hotelId).then((res) => {
        if (res?.access_token || res?.user) {
          // Store tokens/user fields individually
          if (res.access_token) localStorage.setItem('accessToken', res.access_token);
          if (res.refresh_token) localStorage.setItem('refreshToken', res.refresh_token);
          if (res.user) {
            localStorage.setItem('userId', res.user.id || '');
            localStorage.setItem('username', res.user.username || '');
            localStorage.setItem('role', res.user.role || '');
            localStorage.setItem('hotelId', res.user.hotelId || '');
          }
          router.replace(`/hotel/${hotelId}`);
          return res;
        }
        throw new Error(res?.message || 'Login failed');
      }),
      {
        loading: 'Signing in…',
        success: 'Signed in ✓',
        error: (err: unknown) => String(err),
      }
    ).catch((e: unknown) => setError(String(e)));
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-hero bg-cover bg-center">
      <form onSubmit={handleSignIn} className="backdrop-blur-sm bg-white/80 p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-white/30">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">GH</div>
          <div>
            <h1 className="text-3xl font-extrabold">Welcome back</h1>
            <p className="text-sm text-slate-600">Sign in to access your hotel's menu and orders</p>
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
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        <label className="block text-sm font-medium mb-2">Hotel</label>
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

        <button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-pink-500 text-white py-3 rounded-full font-semibold shadow-lg">Sign In</button>

        <div className="mt-4 text-center text-sm">
          Don't have an account? <a href="/signup" className="text-amber-600 underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
}
