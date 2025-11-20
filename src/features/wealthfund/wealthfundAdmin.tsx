


// src/components/AdminWealthFund.tsx
import React, { useState } from "react";
import {
  useGetAllWealthFundsQuery,
  useCreateWealthFundMutation,
  useUpdateWealthFundMutation,
  useDeleteWealthFundMutation,
} from "../wealthfund/wealthfundAdmiAPI";
import { CheckCircleIcon, ExclamationCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

interface WealthFundForm {
  name: string;
  minimum_amount: string;
  days: string;
  return_rate: string;
}

const AdminWealthFund: React.FC = () => {
  const { data: funds, isLoading, refetch } = useGetAllWealthFundsQuery();
  const [createWealthFund] = useCreateWealthFundMutation();
  const [updateWealthFund] = useUpdateWealthFundMutation();
  const [deleteWealthFund] = useDeleteWealthFundMutation();

  const [form, setForm] = useState<WealthFundForm>({
    name: "",
    minimum_amount: "",
    days: "",
    return_rate: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        name: form.name,
        minimum_amount: Number(form.minimum_amount),
        days: Number(form.days),
        return_rate: Number(form.return_rate),
      };

      if (editingId) {
        await updateWealthFund({ fund_id: editingId, body }).unwrap();
        setMessage({ type: "success", text: "Wealth fund updated successfully." });
        setEditingId(null);
      } else {
        await createWealthFund(body).unwrap();
        setMessage({ type: "success", text: "Wealth fund created successfully." });
      }

      setForm({ name: "", minimum_amount: "", days: "", return_rate: "" });
      refetch();
    } catch (error: any) {
      setMessage({ type: "error", text: error?.data?.detail || "An error occurred." });
    }

    setTimeout(() => setMessage(null), 5000);
  };

  const handleEdit = (fund: any) => {
    setEditingId(fund.id);
    setForm({
      name: fund.name,
      minimum_amount: String(fund.minimum_amount),
      days: String(fund.days),
      return_rate: String(fund.return_rate),
    });
  };

  const handleDelete = async (fund_id: number) => {
    try {
      await deleteWealthFund(fund_id).unwrap();
      setMessage({ type: "success", text: "Wealth fund deleted successfully." });
      refetch();
    } catch (error: any) {
      setMessage({ type: "error", text: error?.data?.detail || "Failed to delete." });
    }
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Wealth Fund Management</h2>

      {/* === Inline Message === */}
      {message && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg mb-4 text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : (
            <ExclamationCircleIcon className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* === Form === */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Fund Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter fund name"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Minimum Amount</label>
            <input
              type="number"
              name="minimum_amount"
              value={form.minimum_amount}
              onChange={handleChange}
              placeholder="Enter minimum amount"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Duration (days)</label>
            <input
              type="number"
              name="days"
              value={form.days}
              onChange={handleChange}
              placeholder="Enter duration in days"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Return Rate (%)</label>
            <input
              type="number"
              name="return_rate"
              value={form.return_rate}
              onChange={handleChange}
              placeholder="Enter return rate %"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors w-full md:w-auto"
        >
          {editingId ? "Update Fund" : "Create Fund"}
        </button>
      </form>

      {/* === Funds Table === */}
      {isLoading ? (
        <p className="text-center text-indigo-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-right">Min Amount</th>
                <th className="border p-3 text-right">Days</th>
                <th className="border p-3 text-right">Return Rate (%)</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {funds?.map((fund: any) => (
                <tr key={fund.id} className="hover:bg-gray-50">
                  <td className="border p-3">{fund.name}</td>
                  <td className="border p-3 text-right">{fund.minimum_amount}</td>
                  <td className="border p-3 text-right">{fund.days}</td>
                  <td className="border p-3 text-right">{fund.return_rate}</td>
                  <td className="border p-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(fund)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                    >
                      <PencilIcon className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(fund.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                    >
                      <TrashIcon className="h-4 w-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminWealthFund;
