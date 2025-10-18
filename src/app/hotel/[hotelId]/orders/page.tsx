"use client";

import { useEffect, useState } from "react";
import { getOrders } from "../../../../actions/actions";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Receipt, Clock, ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      router.push('/signin');
      return;
    }
    getOrders(token).then(setOrders).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* === Page Header === */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-4 bg-gradient-to-tr from-amber-100 to-pink-100 rounded-full shadow-lg"
            >
              <Receipt className="text-rose-600 w-8 h-8" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: 'var(--fg)' }}>
            Your Orders
          </h1>
          <p className="text-muted" style={{ color: 'var(--card-muted)' }}>
            Track your recent orders and see what’s cooking 🍴
          </p>
        </motion.div>

        {/* === Orders List === */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 dark:text-slate-400 py-20"
          >
            <ShoppingBag size={60} className="mx-auto mb-4 opacity-70" />
            <p className="text-lg">You haven’t placed any orders yet.</p>
            <p className="text-sm text-slate-400">
              Head to the <span className="font-semibold text-rose-500">Menu</span> and treat yourself.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((o, index) => {
              const created = o.createdAt ? new Date(o.createdAt) : null;
              const updated = o.updatedAt ? new Date(o.updatedAt) : null;
              const total = typeof o.total === 'number' ? o.total : (Array.isArray(o.items) ? o.items.reduce((s: number, it: any) => s + ((Number(it.product?.price) || Number(it.price) || 0) * (Number(it.quantity) || 0)), 0) : 0);
              return (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-amber-50">
                          <Receipt className="text-rose-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Order #{o.id}</div>
                          <div className="text-sm text-gray-500">
                            {created ? created.toLocaleString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                            {updated ? ` • updated ${updated.toLocaleString()}` : ''}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-500">Source</div>
                        <div className="mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                          {o.source || 'unknown'}
                        </div>
                        <div className="mt-3 text-lg font-semibold text-rose-600">${total.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <ul className="space-y-3">
                        {(Array.isArray(o.items) ? o.items : []).map((it: any) => {
                          const qty = Number(it.quantity) || 0;
                          const price = Number(it.product?.price ?? it.price) || 0;
                          const itemTotal = price * qty;
                          return (
                            <li key={it.id} className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-50 rounded-md flex items-center justify-center text-sm font-medium text-gray-600">
                                {it.product?.name?.slice(0,1) || '?'}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-800">{it.product?.name || it.name || 'Item'}</div>
                                <div className="text-sm text-gray-500">{it.product?.description}</div>
                                <div className="mt-1 text-sm text-gray-700">{qty} × ${price.toFixed(2)} = <span className="font-semibold text-gray-900">${itemTotal.toFixed(2)}</span></div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
