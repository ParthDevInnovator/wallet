"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { peerTransfer } from "../app/lib/actions/PeerTransfer";
import toast, { Toaster } from "react-hot-toast";
import BackArrow from "../components/BackArrow"; // Import your BackArrow component

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      // Show loading notification and store its ID
      const id = toast.loading("Processing your transfer...");

      // Perform the peer transfer
      const response = await peerTransfer(number, Number(amount) * 100);
      console.log("Peer transfer response:", response);

      // Show success notification
      toast.success("Transfer successful!");

      toast.dismiss(id);
    } catch (error) {
      // Show error notification
      toast.error("An error occurred while processing the transfer.");
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="relative h-[90vh] flex items-center justify-center flex-col px-4">
      {/* Back Arrow positioned at the top-left corner, away from the center */}
      <div className="absolute top-4 left-4">
        <BackArrow />
      </div>

      <div className="flex flex-col items-center">
        {/* Heading centered above the card */}
        <h1 className="text-2xl font-bold mb-4">Transfer to your Friend</h1>

        {/* Card for transfer details */}
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => setNumber(value)}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <Button onClick={handleSend}>Send</Button>
            </div>
            {message && (
              <div className="pt-4 text-center">
                <p>{message}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}
