



import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BanknotesIcon,
  PlusCircleIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import {
  useGetDepositsQuery,
  useCreateDepositMutation,
} from "../deposit/depositAPI";
import { useGetContactsQuery } from "../contacts/contactsAPI";

// Icons for M-Pesa and Airtel Money
const MpesaIcon = () => (
  <img
    src="https://pbs.twimg.com/ext_tw_video_thumb/1181852139011936256/pu/img/1UCUl2bSj2RCyq6H.jpg"
    alt="M-Pesa"
    className="h-6 w-6"
  />
);
const AirtelMoneyIcon = () => (
  <img
    src="https://images.seeklogo.com/logo-png/52/1/airtel-money-tanzania-logo-png_seeklogo-527192.png"
    alt="Airtel Money"
    className="h-6 w-6"
  />
);

const Deposit: React.FC = () => {
  const { data: deposits, isLoading, refetch } = useGetDepositsQuery();
  const [createDeposit, { isLoading: creating }] = useCreateDepositMutation();
  const { data: contacts } = useGetContactsQuery();
  // Take the first contact (typed as any/nullable so TS won't error if shape is unknown)
  const contact: any = contacts?.[0] ?? null;
  const mpesaNumber = contact?.safaricom_number ?? "Loading...";
  const mpesaName = contact?.safaricom_name ?? "Loading...";
  const airtelNumber = contact?.airtel_number ?? "Loading...";
  const airtelName = contact?.airtel_name ?? "Loading...";
  const [form, setForm] = useState({
    amount: "",
    payer_name: "",
    payer_number: "",
    payment_message: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "airtel">(
    "mpesa"
  );
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (
      !form.amount ||
      !form.payer_name ||
      !form.payer_number ||
      !form.payment_message
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields, including the payment confirmation message.",
      });
      return;
    }
    if (Number(form.amount) < 1500) {
      setMessage({
        type: "error",
        text: "Minimum deposit amount is KES 1500.",
      });
      return;
    }
    try {
      await createDeposit({
        amount: Number(form.amount),
        payer_name: form.payer_name,
        payer_number: form.payer_number,
        payment_message: form.payment_message,
      }).unwrap();
      setMessage({
        type: "success",
        text: "Deposit request submitted successfully!",
      });
      setForm({
        amount: "",
        payer_name: "",
        payer_number: "",
        payment_message: "",
      });
      refetch();
    } catch {
      setMessage({
        type: "error",
        text: "Failed to create deposit. Please try again.",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Remove the alert to stop the Windows alert
  };

  // Color schemes
  const mpesaColors = {
    background: "bg-gradient-to-b from-green-900 via-green-800 to-green-950",
    accent: "bg-green-500",
    text: "text-green-300",
    border: "border-green-500/20",
    input: "focus:ring-green-400",
  };
  const airtelColors = {
    background: "bg-gradient-to-b from-red-900 via-red-800 to-red-950",
    accent: "bg-red-500",
    text: "text-red-300",
    border: "border-red-500/20",
    input: "focus:ring-red-400",
  };
  const colors = paymentMethod === "mpesa" ? mpesaColors : airtelColors;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative min-h-screen w-full text-white px-4 py-6 ${colors.background} overflow-x-hidden`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1
          className={`text-2xl font-bold mb-1 flex justify-center items-center gap-2 ${colors.text}`}
        >
          <BanknotesIcon className="h-6 w-6" /> My Deposits
        </h1>
        <p className={`text-sm ${colors.text.replace("text-", "text-")}300`}>
          View and create your deposits here
        </p>
      </div>
      {/* Deposit Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`bg-white/10 backdrop-blur-xl rounded-2xl ${colors.border} p-5 mb-8 shadow-xl max-w-md mx-auto`}
      >
        <h2
          className={`text-lg font-semibold mb-3 flex items-center gap-2 ${colors.text}`}
        >
          <PlusCircleIcon className="h-5 w-5" /> Create New Deposit
        </h2>
        {/* Payment Method Toggle */}
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setPaymentMethod("mpesa")}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
              paymentMethod === "mpesa" ? colors.accent : "bg-white/15"
            }`}
          >
            <MpesaIcon /> M-Pesa
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("airtel")}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
              paymentMethod === "airtel" ? colors.accent : "bg-white/15"
            }`}
          >
            <AirtelMoneyIcon /> Airtel Money
          </button>
        </div>
        {/* Payment Instructions */}
        <div
          className={`mb-4 p-3 bg-white/15 rounded-xl text-sm ${colors.text.replace(
            "text-",
            "text-"
          )}300`}
        >
          {paymentMethod === "mpesa" ? (
            <div>
              <p className="font-medium">M-Pesa Instructions:</p>
              <ol className="list-decimal pl-5 mt-1">
                <li>Go to M-Pesa on your phone.</li>
                <li>
                  Select <strong>Send Money</strong>.
                </li>
                <li>
                  Phone Number:{" "}
                  <span className="text-lg font-bold">{mpesaNumber}</span>
                </li>
                <li>
                  Name: <span className="text-lg font-bold">{mpesaName}</span>
                </li>
                <li>
                  Amount: <strong>KES {form.amount || "X"}</strong>
                </li>
                <li>Enter your M-Pesa PIN.</li>
                <li>Copy the confirmation message and paste it below.</li>
              </ol>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xl font-bold">
                  {mpesaNumber} {mpesaName}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(mpesaNumber)} // <-- only number
                  className="p-1 bg-white/20 rounded-lg hover:bg-white/30 transition"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-medium">Airtel Money Instructions:</p>
              <ol className="list-decimal pl-5 mt-1">
                <li>Go to Airtel Money on your phone.</li>
                <li>
                  Select <strong>Send Money</strong>.
                </li>
                <li>
                  Phone Number:{" "}
                  <span className="text-lg font-bold">{airtelNumber}</span>
                </li>
                <li>
                  Name: <span className="text-lg font-bold">{airtelName}</span>
                </li>
                <li>
                  Amount: <strong>KES {form.amount || "X"}</strong>
                </li>
                <li>Enter your Airtel Money PIN.</li>
                <li>Copy the confirmation message and paste it below.</li>
              </ol>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xl font-bold">
                  {airtelNumber} {airtelName}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(airtelNumber)} // <-- only number
                  className="p-1 bg-white/20 rounded-lg hover:bg-white/30 transition"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Inline Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-xl flex items-center gap-2 ${
              message.type === "error"
                ? "bg-red-500/20 text-red-300"
                : "bg-green-500/20 text-green-300"
            }`}
          >
            {message.type === "error" ? (
              <ExclamationCircleIcon className="h-5 w-5" />
            ) : (
              <CheckCircleIcon className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}
        {/* Form Fields */}
        <div className="space-y-3">
          <input
            type="number"
            name="amount"
            placeholder="Amount (KES, min 2400)"
            value={form.amount}
            onChange={handleChange}
            className={`w-full bg-white/15 ${
              colors.border
            } rounded-xl p-2.5 text-white placeholder-${colors.text.replace(
              "text-",
              ""
            )}300 focus:outline-none ${colors.input}`}
            required
            min="2400"
          />
          <input
            type="text"
            name="payer_name"
            placeholder="Your Name"
            value={form.payer_name}
            onChange={handleChange}
            className={`w-full bg-white/15 ${
              colors.border
            } rounded-xl p-2.5 text-white placeholder-${colors.text.replace(
              "text-",
              ""
            )}300 focus:outline-none ${colors.input}`}
            required
          />
          <input
            type="text"
            name="payer_number"
            placeholder="Phone Number"
            value={form.payer_number}
            onChange={handleChange}
            className={`w-full bg-white/15 ${
              colors.border
            } rounded-xl p-2.5 text-white placeholder-${colors.text.replace(
              "text-",
              ""
            )}300 focus:outline-none ${colors.input}`}
            required
          />
          <input
            type="text"
            name="payment_message"
            placeholder="Paste Payment Confirmation Message"
            value={form.payment_message}
            onChange={handleChange}
            className={`w-full bg-white/15 ${
              colors.border
            } rounded-xl p-2.5 text-white placeholder-${colors.text.replace(
              "text-",
              ""
            )}300 focus:outline-none ${colors.input}`}
            required
          />
          <button
            type="submit"
            disabled={creating}
            className={`w-full ${colors.accent} hover:${colors.accent.replace(
              "bg-",
              "hover:bg-"
            )}600 transition rounded-xl py-2.5 font-semibold shadow-md disabled:opacity-50`}
          >
            {creating ? "Submitting..." : "Submit Deposit"}
          </button>
        </div>
      </motion.form>
      {/* Deposit List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`bg-white/10 backdrop-blur-xl rounded-2xl ${colors.border} p-5 shadow-xl max-w-md mx-auto mb-10`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">My Deposit History</h2>
          <button
            onClick={() => refetch()}
            className={`text-sm flex items-center gap-1 ${colors.text.replace(
              "text-",
              "text-"
            )}300 hover:${colors.text.replace(
              "text-",
              "hover:text-"
            )}400 transition`}
          >
            <ArrowPathIcon className="h-4 w-4" /> Refresh
          </button>
        </div>
        {isLoading ? (
          <p
            className={`${colors.text.replace(
              "text-",
              "text-"
            )}300 text-center`}
          >
            Loading deposits...
          </p>
        ) : deposits && deposits.length > 0 ? (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {deposits.map((deposit) => (
              <div
                key={deposit.id}
                className={`bg-white/15 ${
                  colors.border
                } rounded-xl p-3 text-sm ${colors.text.replace(
                  "text-",
                  "text-"
                )}100 shadow-sm hover:bg-white/20 transition`}
              >
                <div className="flex justify-between">
                  <span className="font-medium text-white">
                    KES {deposit.amount.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs ${
                      deposit.status === "approved"
                        ? "text-green-400"
                        : deposit.status === "pending"
                        ? "text-yellow-300"
                        : "text-red-400"
                    }`}
                  >
                    {deposit.status}
                  </span>
                </div>
                <div className="text-xs mt-1">
                  {deposit.payer_name} ({deposit.payer_number})
                </div>
                <div
                  className={`text-[11px] ${colors.text.replace(
                    "text-",
                    "text-"
                  )}300 mt-1`}
                >
                  {new Date(deposit.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className={`${colors.text.replace(
              "text-",
              "text-"
            )}300 text-center`}
          >
            You have no deposits yet.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Deposit;
