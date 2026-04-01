"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    if (success === "true") {
      // Payment successful, redirect to home after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      // Payment failed, redirect to cart
      setTimeout(() => {
        router.push("/cart");
      }, 2000);
    }
  }, [searchParams, router]);

  const success = searchParams.get("success");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        {success === "true" ? (
          <>
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-4">
              Your order has been placed successfully. Redirecting to home...
            </p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Failed
            </h1>
            <p className="text-gray-600 mb-4">
              Your payment was not successful. Redirecting to cart...
            </p>
          </>
        )}
        <div className="mt-6">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6347]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
