import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { PeerTransactions } from "../../../components/PeerTransactions";
import BackArrow from "../../../components/BackArrow"; // Adjust the import path as needed

type PeerTransaction = {
  time: Date;
  amount: number;
  type: "sent" | "received";
  user: {
    id: number;
    name: string | null;
  };
};

interface PeerTransactionType {
  timestamp: Date;
  amount: number;
  fromUserId: number;
  fromUser: {
    id: number;
    name: string | null;
  };
  toUserId: number;
  toUser: {
    id: number;
    name: string | null;
  };
}

async function getSelfTransaction() {
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

async function getPeerTransaction(): Promise<PeerTransaction[]> {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          fromUserId: Number(session?.user?.id),
        },
        {
          toUserId: Number(session?.user?.id),
        },
      ],
    },
    include: {
      fromUser: true,
      toUser: true,
    },
  });
  return transactions.map((t: PeerTransactionType) => ({
    time: t.timestamp,
    amount: t.amount,
    type: t.fromUserId === userId ? "sent" : "received",
    user: t.fromUserId === userId ? t.toUser : t.fromUser,
  }));
}

export default async function TransactionsPage() {
  const selfTransaction = await getSelfTransaction();
  const peerTransaction = await getPeerTransaction();
  return (
    <div className="relative">
      <BackArrow /> {/* Added the BackArrow component */}
      <div className="w-screen">
        <div className="text-4xl pt-16 mb-4 font-bold text-[#6a51a6]">
          Transactions
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
          <div className="selfTransfer">
            <h1 className="text-xl font-semibold mb-4">
              Self Transactions History
            </h1>
            {selfTransaction.length > 0 ? (
              <OnRampTransactions transactions={selfTransaction} />
            ) : (
              <p>No Transaction Available</p>
            )}
          </div>
          <div className="peerTransactions">
            <h1 className="text-xl font-semibold mb-4">
              Peer Transaction History
            </h1>
            {peerTransaction.length > 0 ? (
              <PeerTransactions transactions={peerTransaction} />
            ) : (
              <p>No Transaction Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
