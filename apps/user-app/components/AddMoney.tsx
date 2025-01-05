"use client";
import { useState } from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Select } from "@repo/ui/select";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";
import toast, { Toaster } from "react-hot-toast";

// List of supported banks
const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com",
  },
];

const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );

  const [value, setValue] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  const handleAddMoney = async () => {
    try {
      // Show loading notification
      const id = toast.loading("Processing your Transaction....");

      // Perform the transaction
      await createOnRampTransaction(provider, value);

      // Redirect the user
      window.location.href = redirectUrl || "";

      // Show success notification
      toast.success("Money added successfully!");

      toast.dismiss(id);
    } catch (error) {
      // Show error notification
      toast.error("An error occurred while adding money.");
    }
  };

  return (
    <>
      <Card title="Add Money">
        <div className="w-full">
          <TextInput
            label={"Amount"}
            placeholder={"Amount"}
            onChange={(val) => {
              setValue(Number(val));
            }}
          />
          <div className="py-4 text-left">Bank</div>
          <Select
            onSelect={(value) => {
              setRedirectUrl(
                SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
              );
              setProvider(
                SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
              );
            }}
            options={SUPPORTED_BANKS.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />
          <div className="flex justify-center pt-4">
            <Button onClick={handleAddMoney}>Add Money</Button>
          </div>
        </div>
      </Card>
      <Toaster /> {/* Add the Toaster component to render notifications */}
    </>
  );
};

export default AddMoney;
