"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getHotel, getProductsForHotel, Product, addItemsToCart } from "../../../actions/actions";
import ProductCard from "../../components/ProductCard";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function HotelMenuPage() {
  const { hotelId } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [addingIds, setAddingIds] = useState<number[]>([]);
  const [hotel, setHotel] = useState<Awaited<ReturnType<typeof getHotel>> | null>(null);
  useEffect(() => {
    if (!hotelId) return;
    getProductsForHotel(hotelId as string).then(setProducts).catch((e) => console.error(e));
    getHotel(hotelId as string).then(setHotel).catch((e) => console.error(e));
  }, [hotelId]);
  // Check login by access token presence
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  async function handleAddToCart(id: number) {
    if (addingIds.includes(id)) return; // already adding
    if (!accessToken) {
      router.push("/signin");
      return;
    }
    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    if (!userId) {
      router.push("/signin");
      return;
    }

    setAddingIds((s) => [...s, id]);
    const toastId = toast.loading('Adding to basket...', { style: { background: '#DBEAFE', color: '#1E3A8A' } });
    try {
      await addItemsToCart(userId, accessToken, [{ productId: id, quantity: 1 }]);
      toast.success('Added to basket!', { id: toastId });
    } catch (e) {
      toast.error('Failed to add to basket', { id: toastId });
    } finally {
      setAddingIds((s) => s.filter((x) => x !== id));
    }
  }
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition"
        >
          ← Back to Hotels
        </Link>
          <button
          className="ml-4 inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition"
          onClick={() => {
            if (!accessToken) router.push("/signin");
            else router.push(`/hotel/${hotelId}/cart`);
          }}
        >
          Go to Basket
        </button>
      </div>
      <div className="flex items-center gap-6 mb-6 bg-white p-4 rounded-lg shadow-sm">
        {hotel?.imageUrl && (
          <img src={hotel.imageUrl} alt={hotel.name} className="w-28 h-20 object-cover rounded-md" />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{hotel?.name || `Hotel ${hotelId}`}</h1>
              <div className="text-sm text-slate-500">{hotel?.address} • {hotel?.city}, {hotel?.country}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{hotel?.phone}</div>
              <div className="text-xs text-slate-400">Open: {hotel?.openingTime} — {hotel?.closingTime}</div>
            </div>
          </div>
          {hotel?.description && <p className="mt-3 text-slate-600">{hotel.description}</p>}
          <div className="mt-2 text-xs text-slate-500">Staff members: {hotel?.workersCount ?? '—'}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => handleAddToCart(p.id)} isAdding={addingIds.includes(p.id)} />
        ))}
      </div>
    </div>
  );
}
