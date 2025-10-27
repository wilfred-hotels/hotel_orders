"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Footer() {
  const params = useParams();
  const hotelId = params?.hotelId;
  const [hotel, setHotel] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      if (!hotelId) return;
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE || '';
        const res = await fetch(`${base}/hotels/${hotelId}`);
        if (!res.ok) return;
        const data = await res.json();
        setHotel(data || null);
      } catch (e) {
        // ignore
      }
    })();
  }, [hotelId]);

  return (
    <footer className="text-sm text-center py-6 text-slate-600">
      © {new Date().getFullYear()} {hotel?.name ?? 'Hotel e-comm'}
    </footer>
  );
}
