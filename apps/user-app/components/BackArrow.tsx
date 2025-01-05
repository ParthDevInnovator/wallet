"use client";
import { useRouter } from "next/navigation";

export default function BackArrow() {
  const router = useRouter();

  return (
    <button
      className="flex items-center space-x-2 text-white bg-[#f32170] hover:bg-[#cf23cf] py-2 px-4 rounded-full shadow-md transition-all duration-300 ease-in-out fixed top-16 left-4 z-50"
      onClick={() => router.back()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Back</span>
    </button>
  );
}
