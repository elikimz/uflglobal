


import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BanknotesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { useUpdatePaymentDetailsMutation } from "../features/withdrawal/withdrawalAPI";

interface PaymentDetailsProps {
  initialData?: {
    bank_name?: string;
    bank_account_number?: string;
    full_name?: string;
  };
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ initialData }) => {
  const [updatePaymentDetails, { isLoading }] =
    useUpdatePaymentDetailsMutation();
  const [bankName, setBankName] = useState(initialData?.bank_name || "");
  const [bankAccount, setBankAccount] = useState(
    initialData?.bank_account_number || ""
  );
  const [fullName, setFullName] = useState(initialData?.full_name || "");
  const [paymentFeedback, setPaymentFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleUpdatePaymentDetails = async () => {
    if (!bankName && !bankAccount && !fullName) {
      setPaymentFeedback({ type: "error", message: "Fill at least one field" });
      return;
    }

    try {
      await updatePaymentDetails({
        bank_name: bankName,
        bank_account_number: bankAccount,
        full_name: fullName,
      }).unwrap();

      setPaymentFeedback({
        type: "success",
        message: "Payment details updated successfully!",
      });

      // Reset form fields after successful update
      setBankName("");
      setBankAccount("");
      setFullName("");
    } catch (err: any) {
      setPaymentFeedback({
        type: "error",
        message: err.data?.detail || "Error updating payment details",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow"
    >
      <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center gap-2">
        <BanknotesIcon className="h-6 w-6 text-yellow-600" /> Payment / Bank
        Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-yellow-700 mb-1">Bank Name</label>
          <input
            type="text"
            placeholder="e.g., KCB, Equity, Mpesa_Money"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block text-yellow-700 mb-1">
            Account Number
          </label>
          <input
            type="text"
            placeholder="e.g., 1234567890"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-yellow-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="e.g., John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
      {paymentFeedback && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg mt-4 ${
            paymentFeedback.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {paymentFeedback.type === "success" ? (
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
          ) : (
            <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
          )}
          <span>{paymentFeedback.message}</span>
        </div>
      )}

      <button
        onClick={handleUpdatePaymentDetails}
        disabled={isLoading}
        className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors py-3 rounded-lg font-semibold text-white mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? "Updating..." : "Update Payment Details"}
      </button>
    </motion.div>
  );
};

export default PaymentDetails;


