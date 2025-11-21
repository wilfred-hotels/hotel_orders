"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHotel, register } from "../../actions/actions";
import { toast } from "sonner";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hotelId, setHotelId] = useState<string>("");
  const [hotelName, setHotelName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const paramHotelId =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("hotelId")
        : null;
    const storedHotelId =
      typeof window !== "undefined" ? localStorage.getItem("hotelId") : null;
    const id = paramHotelId || storedHotelId || "";
    if (id) {
      setHotelId(id);
      const storedHotelName =
        typeof window !== "undefined"
          ? localStorage.getItem("hotelName")
          : null;
      if (storedHotelName) setHotelName(storedHotelName);
      else
        getHotel(id)
          .then((h) => {
            if (h?.name) setHotelName(h.name);
          })
          .catch(() => {});
      try {
        router.replace(`/signup?hotelId=${encodeURIComponent(id)}`);
      } catch (e) {
        console.log(e);
      }
    }
  }, [router]);

  async function handleSignUp(e: React.FormEvent) {
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

    await toast.promise(
      (async () => {
        const res = await register(username, password, undefined, hotelId);

        if (res?.status === "ok" && res.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
          router.replace(`/hotel/${hotelId}/menu`);
          return res;
        }

        if (res?.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
          router.replace(`/hotel/${hotelId}/menu`);
          return res;
        }

        throw new Error(res?.message || "Registration failed");
      })(),
      {
        loading: "Creating account…",
        success: "Account created ✓", // ← your success toast
        error: (err) => String(err), // ← your error toast
      }
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-hero bg-cover bg-center">
      <form
        onSubmit={handleSignUp}
        className="backdrop-blur-sm bg-white/85 p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-white/30"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-linear-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            RS
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">Create your account</h1>
            <p className="text-sm text-slate-600">
              Join a hotel&apos;s staff or order manager to get started
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Hotel is determined by URL or stored hotelId */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Hotel</label>
          <div className="w-full p-3 border rounded bg-gray-50">
            {hotelName ?? (hotelId ? `Hotel ${hotelId}` : "No hotel selected")}
          </div>
        </div>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-linear-to-r from-blue-400 to-blue-600 text-white py-3 rounded-full font-semibold shadow-lg"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 underline">
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
}
