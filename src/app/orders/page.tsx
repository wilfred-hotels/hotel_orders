import React from "react";
import {
  Check,
} from "lucide-react";


export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your order. Your food will be delivered soon!
        </p>
        <p className="text-gray-500">Order #12345</p>
      </div>
    </div>
  );
}
