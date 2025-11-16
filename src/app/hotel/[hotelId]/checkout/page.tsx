"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { getCart as getCartApi, createOrder, initiateMpesaPayment } from "../../../../actions/actions";

function getUserId() {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("userId") || undefined;
}
function getToken() {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("accessToken") || undefined;
}

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const hotelId = params?.hotelId;
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartId, setCartId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<'mpesa' | 'stripe' | 'none'>('none');
  const [phone, setPhone] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const userId = getUserId();
    const token = getToken();
    const paramCartId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('cartId') : null;
    if (!userId || !token) {
      toast.error('Not authenticated');
      setLoading(false);
      return;
    }

    getCartApi(userId, token)
      .then((res) => {
        const parsed: any = res as any;
        const items = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.items) ? parsed.items : []);
        // prefer cartId passed in query string; otherwise use server-provided id
        const serverCartId = parsed?.id || parsed?.cartId;
        if (paramCartId) setCartId(paramCartId);
        else if (serverCartId) setCartId(serverCartId);
        setCartItems(items);
      })
      .catch(() => toast.error('Failed to load cart'))
      .finally(() => setLoading(false));
  }, []);

  const total = cartItems.reduce(
    (s, it) => s + ((it.product?.price ?? 0) * (it.quantity ?? 1)),
    0
  );

  function formattedPhone(raw: string) {
    if (!raw) return raw;
    const p = String(raw).trim();
    if (p.startsWith('0')) return '254' + p.slice(1);
    if (p.startsWith('+')) return p.slice(1);
    return p;
  }

  async function handleMpesa() {
    if (!cartId) return toast.error('No cart found');
    // if (!phone || !/^(\+?254|0)?7\d{8}$/.test(phone))
    //   return toast.error('Enter a valid Safaricom phone number');

    const userId = getUserId();
    const token = getToken();
    if (!token || !userId) return toast.error('Not authenticated');

    setIsPaying(true);
    const toastId = toast.loading('Sending MPesa STK push…');

    try {
      const res = await initiateMpesaPayment(token, { userId, cartId, phone: formattedPhone(phone), amount: total });
      toast.dismiss(toastId);
      if (res?.data?.ResponseCode === '0') {
        toast.success('Check your phone and enter your MPesa PIN to complete payment');
        // Wait for callback confirmation (handled server-side)
        router.push(`/hotel/${hotelId}/orders`);
      } else {
        toast.error(res?.errorMessage || 'Failed to initiate MPesa');
      }
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error('Error connecting to payment service');
    } finally {
      setIsPaying(false);
    }
  }

  async function handleStripe() {
    toast('Stripe integration coming soon');
  }

  if (loading) return <div className="text-center py-10">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg mt-8 border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Checkout</h1>
          <p className="text-sm text-gray-600">Select payment method and confirm your order.</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-600">Total</div>
          <div className="text-2xl font-bold text-blue-600">KES {total.toFixed(2)}</div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-gray-400 text-center py-10">Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {/* Payment Method Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label
              className={`border border-gray-200 hover:shadow-sm rounded-xl p-4 cursor-pointer flex flex-col items-start gap-3 transition-all ${selected === 'mpesa' ? 'ring-2 ring-green-300 bg-green-50' : ''
                }`}
            >
              <input type="radio" name="method" className="hidden" checked={selected === 'mpesa'} onChange={() => setSelected('mpesa')} />
              <div className="flex items-center gap-3">
                <img src="/mpesa.svg" alt="MPesa" className="w-28 h-9 object-contain" />
                <div className="text-sm text-gray-700 font-medium">MPesa (Mobile Money)</div>
              </div>
              <p className="text-xs text-gray-500">You will receive a payment prompt on your phone.</p>
            </label>

            <label
              className={`border border-gray-200 hover:shadow-sm rounded-xl p-4 cursor-pointer flex flex-col items-start gap-3 transition-all ${selected === 'stripe' ? 'ring-2 ring-blue-300 bg-blue-50' : ''
                }`}
            >
              <input type="radio" name="method" className="hidden" checked={selected === 'stripe'} onChange={() => setSelected('stripe')} />
              <div className="flex items-center gap-3">
                <img src="/stripe.svg" alt="Stripe" className="w-28 h-9 object-contain" />
                <div className="text-sm text-gray-700 font-medium">Credit / Debit Card</div>
              </div>
              <p className="text-xs text-gray-500">Pay securely with Stripe.</p>
            </label>
          </div>

          {/* MPesa Section */}
          {selected === 'mpesa' && (
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 254712345678"
                className="w-full p-3 border border-gray-200 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
              <button
                onClick={handleMpesa}
                disabled={isPaying}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${isPaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {isPaying ? 'Processing…' : 'Pay with MPesa'}
              </button>
            </div>
          )}

          {/* Stripe Section */}
          {selected === 'stripe' && (
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-600 mb-4">Card payments via Stripe are coming soon.</p>
              <button
                onClick={handleStripe}
                disabled={isPaying}
                className="w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700"
              >
                Pay with Stripe
              </button>
            </div>
          )}

          <div className="pt-4 text-right">
            <button onClick={() => router.push(`/hotel/${hotelId}/cart`)} className="px-4 py-2 rounded-md border">
              Back to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
