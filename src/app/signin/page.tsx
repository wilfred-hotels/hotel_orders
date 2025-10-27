"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHotel, Hotel, login } from "../../actions/actions";
import toast from 'react-hot-toast';

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hotelName, setHotelName] = useState<string | null>(null);
  const [hotelId, setHotelId] = useState<string>('');
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // prefer hotelId from URL query param, otherwise fall back to localStorage
    const paramHotelId = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('hotelId')) : null;
    const storedHotelId = typeof window !== 'undefined' ? localStorage.getItem('hotelId') : null;
    const id = paramHotelId || storedHotelId || '';
    if (id) {
      setHotelId(id);
      // try to get hotel name from localStorage first
      const storedHotelName = typeof window !== 'undefined' ? localStorage.getItem('hotelName') : null;
      if (storedHotelName) {
        setHotelName(storedHotelName);
      } else {
        getHotel(id).then(h => { if (h?.name) setHotelName(h.name); }).catch(() => {});
      }
      // ensure URL contains hotelId for clarity
      try { router.replace(`/signin?hotelId=${encodeURIComponent(id)}`); } catch (e) {}
    }
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
          // show a blue toast while navigating to hotel menu
          toast.custom(() => (
            <div style={{ padding: '8px 12px', background: '#DBEAFE', color: '#1E3A8A', borderRadius: 8 }}>
              Navigating to menu…
            </div>
          ));
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

        {/* Hotel is determined by URL or stored hotelId */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Hotel</label>
          <div className="w-full p-3 border rounded bg-gray-50">{hotelName ?? (hotelId ? `Hotel ${hotelId}` : 'No hotel selected')}</div>
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-amber-400 to-pink-500 text-white py-3 rounded-full font-semibold shadow-lg">Sign In</button>

        <div className="mt-4 text-center text-sm">
          Don't have an account? <a href="/signup" className="text-amber-600 underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
}
