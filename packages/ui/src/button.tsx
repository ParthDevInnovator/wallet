"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  colorScheme?: "primary" | "secondary" | "tertiary"; // Optional prop to choose color scheme
}

export const Button = ({
  onClick,
  children,
  colorScheme = "primary",
}: ButtonProps) => {
  // Define color schemes
  const colors = {
    primary: "bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-fuchsia-300",
    secondary: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-300",
    tertiary: "bg-pink-500 hover:bg-pink-600 focus:ring-pink-300",
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ${colors[colorScheme]} focus:outline-none focus:ring-4`}
    >
      {children}
    </button>
  );
};
