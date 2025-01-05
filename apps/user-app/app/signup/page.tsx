"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GrPowerCycle } from "react-icons/gr";

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });

      if (response.ok) {
        setIsOtpSent(true);
        toast.success("OTP sent successfully");
      } else {
        toast.success("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendOtp = async () => {
    console.log("Resend OTP");
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });
      if (response.ok) {
        setIsOtpSent(true);
        toast.success("OTP sent Again !");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, password, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("User Created Successfully. Please Login now");
        router.push("/");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Sign Up
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Phone Number
        </label>
        <input
          type="text"
          placeholder="1231231231"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {isOtpSent && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">OTP</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="button"
              onClick={handleResendOtp}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <GrPowerCycle />
            </button>
          </div>
        </div>
      )}

      {!isOtpSent ? (
        <button
          type="button"
          onClick={handleSendOtp}
          className="w-full px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
        >
          Send OTP
        </button>
      ) : (
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
        >
          Sign Up
        </button>
      )}
    </form>
  );
}
