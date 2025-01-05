import React from "react";
import { SideBar } from "./SideBar";

const MainPage = async () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Welcome to V Wallet!
      </h1>

      {/* Sidebar Options */}
      <div className="flex flex-col items-center space-y-6">
        <SideBar title="Transfer" href="/transfer" icon="" />
        <SideBar title="Transactions" href="/transactions" icon="" />
        <SideBar title="P2P" href="/peer" icon="" />
      </div>
    </div>
  );
};

export default MainPage;
