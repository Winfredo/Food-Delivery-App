"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";

const page = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = process.env.NEXT_PUBLIC_API_URL;

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        console.log("Fetched orders:", response.data.data);
        setOrders(response.data.data || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalOrders = useMemo(() => orders.length, [orders]);
  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0),
    [orders],
  );
  const activeCustomers = useMemo(
    () => new Set(orders.map((order) => order.userId)).size,
    [orders],
  );
  const pendingPayments = useMemo(
    () => orders.filter((order) => order.payment === false).length,
    [orders],
  );
  const foodProcessingCount = useMemo(() => orders.filter(order => order.status === "Food Processing").length, [orders]);
  const outForDeliveryCount = useMemo(() => orders.filter(order => order.status === "Out for Delivery").length, [orders]);
  const deliveredCount = useMemo(() => orders.filter(order => order.status === "Delivered").length, [orders]);

  return (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-6 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-500">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              Welcome back, Admin
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Review recent activity, monitor orders, and manage the platform from a single dashboard.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Quick actions</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/add" className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
                Add Product
              </Link>
              <Link href="/orders" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
                See All Orders
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total {isLoading ? 'Orders' : (totalOrders === 1 ? 'Order' : 'Orders')}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{isLoading ? "..." : totalOrders}</p>
            <p className="mt-2 text-sm text-slate-500">Total number of orders received</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Revenue</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">${isLoading ? "..." : totalRevenue.toFixed(2)}</p>
            <p className="mt-2 text-sm text-slate-500">Total order value collected so far</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Active Customers</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{isLoading ? "..." : activeCustomers}</p>
            <p className="mt-2 text-sm text-slate-500">Customers who placed orders recently</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Pending Payments</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{isLoading ? "..." : pendingPayments}</p>
            <p className="mt-2 text-sm text-slate-500">Orders with payment not confirmed</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Order Summary</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">Latest orders at a glance</p>
              </div>
              <Link href="/orders" className="rounded-full  px-4 py-2 text-sm font-semibold text-white transition ">
                See all orders
              </Link>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Food Processing</p>
                <p className="mt-2 text-sm text-slate-600">{foodProcessingCount} order{foodProcessingCount === 1 ? '' : 's'} {foodProcessingCount === 1 ? 'is' : 'are'} currently being prepared.</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Out for Delivery</p>
                <p className="mt-2 text-sm text-slate-600">{outForDeliveryCount} order{outForDeliveryCount === 1 ? '' : 's'} {outForDeliveryCount === 1 ? 'is' : 'are'} on {outForDeliveryCount === 1 ? 'its' : 'their'} way.</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Delivered</p>
                <p className="mt-2 text-sm text-slate-600">{deliveredCount} order{deliveredCount === 1 ? '' : 's'} {deliveredCount === 1 ? 'has' : 'have'} been delivered.</p>
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Recent Activity</p>
            <div className="mt-6 space-y-4">
              {[
                { label: "New order received", time: "2 mins ago" },
                { label: "New product added", time: "1 hr ago" },
                { label: "Payment completed", time: "3 hrs ago" },
              ].map((activity) => (
                <div key={activity.label} className="flex items-start justify-between rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{activity.label}</p>
                    <p className="mt-1 text-sm text-slate-500">{activity.time}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm">
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
