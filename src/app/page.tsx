
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { getHotels } from "../actions/actions";

export default function HotelLandingPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [navigating, setNavigating] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    getHotels().then(setHotels).catch((e) => { console.error(e); setHotels([]); });
  }, []);
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-amber-100 via-pink-100 to-sky-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-rose-600">Select a Hotel</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {hotels.map((hotel: any) => (
            <div key={hotel.id} className="block bg-white rounded-2xl shadow-xl hover:shadow-rose-200 transition overflow-hidden">
              <img src={hotel.imageUrl || hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-rose-700 mb-2">{hotel.name}</h2>
                  <div className="text-xs text-slate-500">Staff: {hotel.workersCount ?? '—'}</div>
                </div>
                <p className="text-slate-600 mb-3 text-sm line-clamp-2">{hotel.description}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500">{hotel.city}, {hotel.country}</div>
                    <div className="text-xs text-slate-400">{hotel.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{hotel.phone}</div>
                    <div className="text-xs text-slate-400">{hotel.openingTime} — {hotel.closingTime}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      if (navigating) return; // prevent double press
                      setNavigating(hotel.id);
                      localStorage.setItem("hotelId",hotel.id)
                      // show a blue toast indicating navigation
                      toast('Navigating…', { style: { background: '#e6f0ff', color: '#0b60ff' } });
                      try {
                        await router.push(`/hotel/${hotel.id}`);
                      } finally {
                        setNavigating(null);
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {navigating === hotel.id ? (
                      <svg className="animate-spin h-4 w-4 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    ) : (
                      'View Menu'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
