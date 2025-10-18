
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getHotels } from "../actions/actions";

export default function HotelLandingPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  useEffect(() => {
    getHotels().then(setHotels).catch((e) => { console.error(e); setHotels([]); });
  }, []);
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-amber-100 via-pink-100 to-sky-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-rose-600">Select a Hotel</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {hotels.map((hotel: any) => (
            <Link
              key={hotel.id}
              href={`/hotel/${hotel.id}`}
              className="block bg-white rounded-2xl shadow-xl hover:shadow-rose-200 transition overflow-hidden"
            >
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
                  <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">View Menu</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
