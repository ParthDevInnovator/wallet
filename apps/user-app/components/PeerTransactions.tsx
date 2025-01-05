import { Card } from "@repo/ui/card";

export const PeerTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    type: "sent" | "received"; // Add this type to distinguish between sent and received transactions
    user: {
      id: number;
      name: string | null;
    };
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((txn, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <div className="text-sm">
                {txn.type === "received" ? "Received" : "Sent"} INR
              </div>
              <div className="text-slate-600 text-xs">
                {txn.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span
                className={`text-lg font-semibold ${txn.type === "received" ? "text-green-600" : "text-red-600"}`}
              >
                {txn.type === "received"
                  ? `+ Rs ${txn.amount / 100}`
                  : `- Rs ${txn.amount / 100}`}
              </span>
            </div>
            <div className="receivedFrom">
              {/* If needed, display the name of the user involved in the transaction */}
              <div className="text-sm">{txn.user.name}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
