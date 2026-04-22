"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/admin/login`, data);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login successful!", { theme: "dark" });
        router.push("/");
      } else {
        toast.error(response.data.message, { theme: "dark" });
      }
    } catch (error) {
      toast.error("Invalid email or password", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/assets/logo.png" alt="Logo" className="w-32" />
        </div>

        <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-500 text-center mb-2">
          Admin Panel
        </p>
        <h1 className="text-2xl font-semibold text-slate-900 text-center mb-8">
          Sign in to your account
        </h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-full font-semibold text-sm transition-colors mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;