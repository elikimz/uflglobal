

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  BanknotesIcon,
  KeyIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  useGetPinStatusQuery,
  useSetPinMutation,
  useUpdatePinMutation,
  useUpdatePaymentDetailsMutation,
} from "../features/withdrawal/withdrawalAPI";

const Security: React.FC = () => {
  // Queries & Mutations
  const { data: pinStatus, isLoading: pinLoading } = useGetPinStatusQuery();
  const [setPin] = useSetPinMutation();
  const [updatePin] = useUpdatePinMutation();
  const [updatePaymentDetails] = useUpdatePaymentDetailsMutation();

  // Local state
  const [newPin, setNewPin] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [fullName, setFullName] = useState("");

  // Feedback state
  const [pinFeedback, setPinFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [paymentFeedback, setPaymentFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Handlers
  const handleSetPin = async () => {
    if (!newPin || newPin.length < 4) {
      setPinFeedback({ type: "error", message: "PIN must be 4 digits" });
      return;
    }
    try {
      await setPin({ pin: newPin }).unwrap();
      setPinFeedback({ type: "success", message: "PIN set successfully!" });
      setNewPin("");
    } catch (err: any) {
      setPinFeedback({
        type: "error",
        message: err.data?.detail || "Error setting PIN",
      });
    }
  };

  const handleUpdatePin = async () => {
    if (!oldPin || !newPin || newPin.length < 4) {
      setPinFeedback({ type: "error", message: "Fill all fields correctly" });
      return;
    }
    if (newPin !== confirmPin) {
      setPinFeedback({
        type: "error",
        message: "New PIN and Confirm PIN must match",
      });
      return;
    }
    try {
      await updatePin({ old_pin: oldPin, new_pin: newPin }).unwrap();
      setPinFeedback({ type: "success", message: "PIN updated successfully!" });
      setOldPin("");
      setNewPin("");
      setConfirmPin("");
    } catch (err: any) {
      setPinFeedback({
        type: "error",
        message: err.data?.detail || "Error updating PIN",
      });
    }
  };

  const handleUpdatePaymentDetails = async () => {
    if (!mpesaNumber && !bankName && !bankAccount && !fullName) {
      setPaymentFeedback({ type: "error", message: "Fill at least one field" });
      return;
    }
    try {
      await updatePaymentDetails({
        mpesa_number: mpesaNumber,
        bank_name: bankName,
        bank_account_number: bankAccount,
        full_name: fullName,
      }).unwrap();
      setPaymentFeedback({
        type: "success",
        message: "Payment details updated successfully!",
      });
      setMpesaNumber("");
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
      className="min-h-screen px-6 py-8 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 text-white"
    >
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <LockClosedIcon className="h-8 w-8 text-yellow-400" />
        Security Settings
      </h1>

      {/* PIN Section */}
      <section className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
          <KeyIcon className="h-6 w-6" /> PIN Management
        </h2>

        {pinLoading ? (
          <p className="text-yellow-100">Loading PIN status...</p>
        ) : pinStatus?.has_pin ? (
          <>
            <p className="text-yellow-100 mb-4">
              You have a PIN set. Update it below.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-yellow-100 mb-1">Old PIN</label>
                <input
                  type="password"
                  placeholder="Enter old PIN"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-yellow-100 mb-1">New PIN</label>
                <input
                  type="password"
                  placeholder="Enter new PIN"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-yellow-100 mb-1">
                  Confirm New PIN
                </label>
                <input
                  type="password"
                  placeholder="Confirm new PIN"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              {pinFeedback && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    pinFeedback.type === "success"
                      ? "bg-green-900/50 text-green-100"
                      : "bg-red-900/50 text-red-100"
                  }`}
                >
                  {pinFeedback.type === "success" ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5" />
                  )}
                  <span>{pinFeedback.message}</span>
                </div>
              )}
              <button
                onClick={handleUpdatePin}
                className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors py-3 rounded-lg font-semibold text-gray-900"
              >
                Update PIN
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-yellow-100 mb-4">
              You don’t have a PIN set. Create one below.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-yellow-100 mb-1">New PIN</label>
                <input
                  type="password"
                  placeholder="Enter new PIN"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              {pinFeedback && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    pinFeedback.type === "success"
                      ? "bg-green-900/50 text-green-100"
                      : "bg-red-900/50 text-red-100"
                  }`}
                >
                  {pinFeedback.type === "success" ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5" />
                  )}
                  <span>{pinFeedback.message}</span>
                </div>
              )}
              <button
                onClick={handleSetPin}
                className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors py-3 rounded-lg font-semibold text-gray-900"
              >
                Set PIN
              </button>
            </div>
          </>
        )}
      </section>

      {/* Payment / Bank Details Section */}
      <section className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
          <BanknotesIcon className="h-6 w-6" /> Payment / Bank Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-yellow-100 mb-1">M-Pesa Number</label>
            <input
              type="text"
              placeholder="e.g., 254712345678"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-yellow-100 mb-1">Bank Name</label>
            <input
              type="text"
              placeholder="e.g., KCB, Equity"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-yellow-100 mb-1">
              Bank Account Number
            </label>
            <input
              type="text"
              placeholder="e.g., 1234567890"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-yellow-100 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g., John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>
        {paymentFeedback && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg mt-4 ${
              paymentFeedback.type === "success"
                ? "bg-green-900/50 text-green-100"
                : "bg-red-900/50 text-red-100"
            }`}
          >
            {paymentFeedback.type === "success" ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5" />
            )}
            <span>{paymentFeedback.message}</span>
          </div>
        )}
        <button
          onClick={handleUpdatePaymentDetails}
          className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors py-3 rounded-lg font-semibold text-gray-900 mt-4"
        >
          Update Payment Details
        </button>
      </section>
    </motion.div>
  );
};

export default Security;
