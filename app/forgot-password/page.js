"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg">
        <h1 className="text-2xl font-black text-[#0C1E35]">Reset your password</h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter the email associated with your account and we’ll send reset instructions.
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 text-red-700 text-sm p-3">{error}</div>
        )}

        {submitted ? (
          <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm text-green-700">
            If an account exists for <strong>{email}</strong>, you’ll receive a reset link shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: "#E8820C" }}
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm">
          <Link href="/login" className="font-semibold" style={{ color: "#E8820C" }}>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
