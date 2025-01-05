"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import Link from "next/link";
import MainPage from "../components/MainPage";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!session ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white shadow-lg rounded-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to V Wallet!
          </h2>
          <p className="text-gray-600 text-center">
            Please sign up or sign in to continue.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 w-full">
            <Link
              href="/signup"
              className="w-full px-6 py-2 text-center bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition duration-300"
            >
              Sign Up
            </Link>
            <Link
              href="/api/auth/signin"
              className="w-full px-6 py-2 text-center bg-purple-500 text-white rounded-lg hover:bg-purple-400 transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      ) : (
        <MainPage />
      )}
    </div>
  );
}
