

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  KeyIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  useGetPinStatusQuery,
  useSetPinMutation,
  useUpdatePinMutation,
} from "../features/withdrawal/withdrawalAPI";

const Security: React.FC = () => {
  // Queries & Mutations
  const { data: pinStatus, isLoading: pinLoading } = useGetPinStatusQuery();
  const [setPin] = useSetPinMutation();
  const [updatePin] = useUpdatePinMutation();

  // Local state for PIN
  const [newPin, setNewPin] = useState("");
  const [oldPin, setOldPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // Feedback state for PIN
  const [pinFeedback, setPinFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Handlers for PIN
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-6 py-8 bg-yellow-50 text-yellow-900"
    >
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-yellow-800">
        <LockClosedIcon className="h-8 w-8 text-yellow-600" />
        Security Settings
      </h1>

      {/* PIN Section */}
      <section className="max-w-3xl mx-auto bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center gap-2">
          <KeyIcon className="h-6 w-6 text-yellow-600" /> PIN Management
        </h2>
        {pinLoading ? (
          <p className="text-yellow-700">Loading PIN status...</p>
        ) : pinStatus?.has_pin ? (
          <>
            <p className="text-yellow-700 mb-4">
              You have a PIN set. Update it below.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-yellow-700 mb-1">Old PIN</label>
                <input
                  type="password"
                  placeholder="Enter old PIN"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-yellow-700 mb-1">New PIN</label>
                <input
                  type="password"
                  placeholder="Enter new PIN"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-yellow-700 mb-1">
                  Confirm New PIN
                </label>
                <input
                  type="password"
                  placeholder="Confirm new PIN"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              {pinFeedback && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    pinFeedback.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pinFeedback.type === "success" ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                  )}
                  <span>{pinFeedback.message}</span>
                </div>
              )}
              <button
                onClick={handleUpdatePin}
                className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors py-3 rounded-lg font-semibold text-white"
              >
                Update PIN
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-yellow-700 mb-4">
              You don't have a PIN set. Create one below.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-yellow-700 mb-1">New PIN</label>
                <input
                  type="password"
                  placeholder="Enter new PIN"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              {pinFeedback && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    pinFeedback.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {pinFeedback.type === "success" ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                  )}
                  <span>{pinFeedback.message}</span>
                </div>
              )}
              <button
                onClick={handleSetPin}
                className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors py-3 rounded-lg font-semibold text-white"
              >
                Set PIN
              </button>
            </div>
          </>
        )}
      </section>

    </motion.div>
  );
};

export default Security;
