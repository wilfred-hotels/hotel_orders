"use client";

import { getCart as getCartApi, updateCartItem as updateCartItemApi, createOrder, deleteCartItem as deleteCartItemApi } from "../../../../actions/actions";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useParams } from 'next/navigation';

// Helper to get userId from localStorage (client only)
function getUserIdFromLocalStorage() {
  if (typeof window === 'undefined') return undefined;
  const id = localStorage.getItem('userId');
  return id || undefined;
}

// Helper to get access token from localStorage (client only)
function getAccessTokenFromLocalStorage() {
  if (typeof window === 'undefined') return undefined;
  return localStorage.getItem('accessToken') || undefined;
}


export default function CartPage() {
  const router = useRouter();
  const params = useParams();
  const hotelId = params?.hotelId;
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [tempQty, setTempQty] = useState<Record<string, string>>({});
  const [cartId, setCartId] = useState<string | undefined>(undefined);

  // Fetch cart from backend on mount
  useEffect(() => {
    const userId = getUserIdFromLocalStorage();
    const token = getAccessTokenFromLocalStorage();
    if (!userId || !token) {
      toast.error("Not authenticated");
      return;
    }
    getCartApi(userId, token)
      .then((itemsOrObj) => {
        // backend may return array or { items: [], id: cartId }
        const arr = Array.isArray(itemsOrObj) ? itemsOrObj : (itemsOrObj && Array.isArray((itemsOrObj as any).items) ? (itemsOrObj as any).items : []);
        // cart id may be at top-level (id or cartId) or on each item as cartId
        const possibleCartId = Array.isArray(itemsOrObj)
          ? ((itemsOrObj as any)[0]?.cartId || undefined)
          : (itemsOrObj && (itemsOrObj as any).id ? (itemsOrObj as any).id : (itemsOrObj && (itemsOrObj as any).cartId ? (itemsOrObj as any).cartId : undefined));
        if (possibleCartId) setCartId(possibleCartId);
        setCartItems(arr);
        setTempQty(Object.fromEntries(arr.map((item: any) => [String(item.productId), String(item.quantity)])));
      })
      .catch((e) => {
        console.error(e);
        toast.error("Failed to load cart");
      });
  }, []);

  // Handle controlled input typing (temporary)
  function handleQtyChange(productId: string, value: string) {
    setTempQty((prev) => ({ ...prev, [productId]: value }));
  }

  async function handleDelete(productId: string) {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;
    if (!confirm(`Remove ${item.product?.name || 'this item'} from your basket?`)) return;
    const userId = getUserIdFromLocalStorage();
    const token = getAccessTokenFromLocalStorage();
    if (!userId || !token) {
      toast.error('Not authenticated');
      return;
    }
    try {
      await deleteCartItemApi(userId, token, item.id);
      const items = await getCartApi(userId, token);
      const arr = Array.isArray(items) ? items : (items && Array.isArray((items as any).items) ? (items as any).items : []);
      setCartItems(arr);
      setTempQty(Object.fromEntries(arr.map((it: any) => [it.productId, String(it.quantity)])));
      toast.success('Removed from basket');
    } catch (e) {
      console.error(e);
      toast.error('Failed to remove item');
    }
  }

  // Handle blur or Enter press — apply validated quantity
  async function applyQty(productId: string) {
    const rawValue = tempQty[productId]?.trim();
    const item = cartItems.find((i) => i.productId === productId);
    const available = item?.product?.stock ?? Infinity;

    // If empty input, revert
    if (!rawValue) {
      setTempQty((prev) => ({ ...prev, [productId]: String(item?.quantity || 1) }));
      return;
    }

    const qty = Number(rawValue);
    if (isNaN(qty) || qty <= 0) {
      toast.error("Invalid quantity.");
      setTempQty((prev) => ({ ...prev, [productId]: String(item?.quantity || 1) }));
      return;
    }

    if (qty > available) {
      toast("Only " + available + " available in stock.", { icon: '⚠️' });
      await update(productId, available);
      setTempQty((prev) => ({ ...prev, [productId]: String(available) }));
      return;
    }

    await update(productId, qty);
  }

  // Actual update logic — localStorage sync
  async function update(productId: string, qty: number) {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;
    const userId = getUserIdFromLocalStorage();
    const token = getAccessTokenFromLocalStorage();
    if (!userId || !token) {
      toast.error("Not authenticated");
      return;
    }
      try {
      await updateCartItemApi(userId, token, item.id, qty);
      // Refresh cart
      const items = await getCartApi(userId, token);
      const arr = Array.isArray(items) ? items : (items && Array.isArray((items as any).items) ? (items as any).items : []);
      setCartItems(arr);
      setTempQty(Object.fromEntries(arr.map((item: any) => [item.productId, String(item.quantity)])));
    } catch (e) {
      toast.error("Failed to update cart");
    }
  }

  // Submit order
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  async function submitOrder() {
  const cartId=cartItems[0].cartId
    setIsPlacingOrder(true);
    try {
      const token = getAccessTokenFromLocalStorage();
      const userId = getUserIdFromLocalStorage();
      if (!token || !userId) {
        toast.error("Not authenticated");
        setIsPlacingOrder(false);
        return;
      }
      if (!cartId) {
        toast.error('Cart is missing');
        setIsPlacingOrder(false);
        return;
      }
      // call new createOrder(cartId, userId) signature
      const o = await createOrder(token, cartId, userId);
      setCartItems([]);
      setTempQty({});
      toast.success(`Order confirmed: ${o.id}`);
      // redirect to orders list for this hotel
      if (hotelId) router.push(`/hotel/${hotelId}/orders`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  }

  const detailed = cartItems.map((item) => ({
    id: item.productId,
    qty: item.quantity,
    product: item.product,
  }));

  // Helper: compute the currently displayed quantity using tempQty (typing) or the committed qty
  function getDisplayQty(productId: string, committedQty: number) {
    const raw = tempQty[productId];
    if (raw === undefined || raw === "") return committedQty;
    const n = Number(raw);
    if (isNaN(n) || n <= 0) return committedQty;
    return n;
  }

  // Total respects the live input values (tempQty) so totals update while typing
  const total = detailed.reduce((s, it) => {
    const qty = getDisplayQty(it.id, it.qty);
    return s + ((it.product?.price ?? 0) * qty);
  }, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg mt-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🛒 Your Basket</h1>
          <p className="text-sm text-gray-500">Review items and confirm your order for delivery or pickup.</p>
        </div>
        <div className="text-right">
            <div className="text-lg font-semibold text-gray-600">Total</div>
            <div className="text-2xl font-bold text-rose-600">${total.toFixed(2)}</div>
          </div>
      </div>

      {detailed.length === 0 ? (
        <div className="text-gray-400 text-center py-20 text-lg">Your basket is empty.</div>
      ) : (
        <div className="space-y-4">
          {detailed.map((d) => {
            const displayQty = getDisplayQty(d.id, d.qty);
            return (
            <div key={d.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img src={d.product?.image || '/food-placeholder.jpg'} alt={d.product?.name} className="w-20 h-20 object-cover rounded-md bg-gray-50" />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{d.product?.name || 'Item ' + d.id}</div>
                <div className="text-sm text-gray-500 mt-1">{d.product?.description}</div>
                <div className="mt-2 text-sm text-gray-600">${(d.product?.price ?? 0).toFixed(2)} • {d.product?.stock ?? '—'} in stock</div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  className="w-20 p-2 border border-gray-200 rounded-md text-center focus:ring-2 focus:ring-rose-200 outline-none transition"
                  value={tempQty[d.id] ?? String(d.qty)}
                  min={1}
                  max={d.product?.stock ?? undefined}
                  onChange={(e) => handleQtyChange(d.id, e.target.value)}
                  onBlur={() => applyQty(d.id)}
                  onKeyDown={(e) => e.key === "Enter" && applyQty(d.id)}
                />
                <div className="font-semibold text-gray-800">${((d.product?.price ?? 0) * displayQty).toFixed(2)}</div>
                <button onClick={() => handleDelete(d.id)} className="text-sm text-rose-500 hover:text-rose-700">Remove</button>
              </div>
            </div>
          )})}

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="text-sm text-gray-600">Items: {detailed.length}</div>
            <div>
              <button onClick={() => router.push(`/hotel/${hotelId}/checkout?cartId=${encodeURIComponent(cartId || '')}`)} className={`px-6 py-3 rounded-xl font-semibold text-white bg-rose-600 hover:bg-rose-700`}>
                Go to payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
