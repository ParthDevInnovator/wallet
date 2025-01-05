import React from "react";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import AddMoney from "../../../components/AddMoney";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { BalanceCard } from "../../../components/BalanceCard";
import BackArrow from "../../../components/BackArrow"; // Import the BackArrow component

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return transactions.map(
    (t: {
      startTime: Date;
      amount: number;
      status: string;
      provider: string;
    }) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    })
  );
}

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="relative w-screen bg-gray-50">
      {/* Back Arrow positioned at the top-left corner */}
      <div className="absolute top-4 left-4">
        <BackArrow />
      </div>

      {/* Main Content */}
      <div className="pt-12 px-4">
        <div className="text-4xl mb-8 font-bold text-[#6a51a6]">Transfer</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <AddMoney />
          </div>
          <div>
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            <div className="pt-4">
              {transactions.length > 0 ? (
                <OnRampTransactions transactions={transactions} />
              ) : (
                <p>No transactions available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
