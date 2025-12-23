import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../api/axios";
import axios from "axios";

const EmailVerified: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState("Verifying your email...");

  // Extract token from URL after component mounts
  useEffect(() => {
    const t = searchParams.get("token");
    setToken(t);
  }, [searchParams]);

  // Call API to verify email when token is available
  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link. Token is missing.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await API.get(`/auth/verify-email?token=${token}`);
        setMessage(res.data.message || "Email verified successfully!");
      } catch (err: unknown) {
        console.error(err);
        if (axios.isAxiosError(err)) {
          setMessage(err.response?.data?.message || "Verification failed.");
        } else {
          setMessage("Verification failed due to an unknown error.");
        }
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold text-orange-500 mb-4">Email Verification</h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <Link
        to="/login"
        className="px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default EmailVerified;
