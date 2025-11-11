





import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetLevelsQuery,
  useCreateLevelMutation,
  useUpdateLevelMutation,
  useDeleteLevelMutation,
} from "../levels/levelsAPI";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

// Custom Notification Component and Provider
const Notification: React.FC<{
  message: string;
  type: "success" | "error";
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } shadow-lg`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

const AdminManageLevels: React.FC = () => {
  const { data: levels, isLoading, refetch } = useGetLevelsQuery();
  const [createLevel] = useCreateLevelMutation();
  const [updateLevel] = useUpdateLevelMutation();
  const [deleteLevel] = useDeleteLevelMutation();
  const [form, setForm] = useState({
    id: null,
    name: "",
    work_deposit: "",
    number_of_tasks: "",
    mission_income: "",
    mission_day_income: "",
    task_monthly_income: "",
    mission_annual_income: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payloadData = {
        name: form.name,
        work_deposit: form.work_deposit ? Number(form.work_deposit) : 0,
        number_of_tasks: form.number_of_tasks ? Number(form.number_of_tasks) : 0,
        mission_income: form.mission_income ? Number(form.mission_income) : 0,
        mission_day_income: form.mission_day_income ? Number(form.mission_day_income) : 0,
        task_monthly_income: form.task_monthly_income ? Number(form.task_monthly_income) : 0,
        mission_annual_income: form.mission_annual_income ? Number(form.mission_annual_income) : 0,
      };
      if (isEditing && form.id != null) {
        await updateLevel({ level_id: Number(form.id), data: payloadData }).unwrap();
        showNotification("Level updated successfully!", "success");
      } else {
        await createLevel(payloadData).unwrap();
        showNotification("Level created successfully!", "success");
      }
      setForm({
        id: null,
        name: "",
        work_deposit: "",
        number_of_tasks: "",
        mission_income: "",
        mission_day_income: "",
        task_monthly_income: "",
        mission_annual_income: "",
      });
      setIsEditing(false);
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showNotification("Error saving level.", "error");
    }
  };

  const handleEdit = (level: any) => {
    setForm(level);
    setIsEditing(true);
  };

  const handleDelete = async (id: number | string) => {
    try {
      await deleteLevel(Number(id)).unwrap();
      showNotification("Level deleted successfully!", "success");
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showNotification("Failed to delete level.", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 text-white overflow-x-auto"
    >
      {/* Notification Component */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {/* Rest of your component remains unchanged */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-300 flex items-center gap-2">
          Manage Levels
        </h1>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </button>
      </div>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8 max-w-4xl mx-auto shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4 text-indigo-300">
          {isEditing ? "Update Level" : "Create New Level"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Level Name (e.g. LV1)"
            className="bg-white/10 border border-white/20 rounded-xl p-2 text-white"
          />
          <input
            name="work_deposit"
            value={form.work_deposit}
            onChange={handleChange}
            placeholder="Work Deposit"
            className="bg-white/10 border border-white/20 rounded-xl p-2 text-white"
          />
          <input
            name="number_of_tasks"
            value={form.number_of_tasks}
            onChange={handleChange}
            placeholder="Number of Tasks"
            className="bg-white/10 border border-white/20 rounded-xl p-2 text-white"
          />
          <input
            name="mission_income"
            value={form.mission_income}
            onChange={handleChange}
            placeholder="Mission Income"
            className="bg-white/10 border border-white/20 rounded-xl p-2 text-white"
          />
          <input
            name="mission_day_income"
            value={form.mission_day_income}
            onChange={handleChange}
            placeholder="Mission Day Income"
            className="bg-white/10 border border-white/20 rounded-xl p-2 text-white"
          />
          <input
            name="task_monthly_income"
            value={form.task_monthly_income}
            onChange={handleChange}
            placeholder="Task Monthly Income"
            className="bg-white/10 border border-white/20 rounded-xl p-2 text-white"
          />
          <input
            name="mission_annual_income"
            value={form.mission_annual_income}
            onChange={handleChange}
            placeholder="Mission Annual Income"
            className="bg-white/10 border border-white/20 rounded-xl p-2 text-white"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl transition"
          >
            <PlusCircleIcon className="h-5 w-5" />
            {isEditing ? "Update Level" : "Create Level"}
          </button>
        </div>
      </motion.form>
      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-700 text-white">
              <th className="px-4 py-2">Job Grade</th>
              <th className="px-4 py-2">Work Deposit</th>
              <th className="px-4 py-2">Tasks</th>
              <th className="px-4 py-2">Mission Income</th>
              <th className="px-4 py-2">Daily Mission</th>
              <th className="px-4 py-2">Monthly Task</th>
              <th className="px-4 py-2">Annual Mission</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-indigo-200">
                  Loading levels...
                </td>
              </tr>
            ) : levels && levels.length > 0 ? (
              levels.map((level: any) => (
                <tr
                  key={level.id}
                  className="even:bg-white/10 odd:bg-white/5 hover:bg-white/20 transition"
                >
                  <td className="px-4 py-2 font-medium text-indigo-300">
                    {level.name}
                  </td>
                  <td className="px-4 py-2">KES {level.work_deposit}</td>
                  <td className="px-4 py-2">{level.number_of_tasks}</td>
                  <td className="px-4 py-2">KES {level.mission_income}</td>
                  <td className="px-4 py-2">KES {level.mission_day_income}</td>
                  <td className="px-4 py-2">KES {level.task_monthly_income}</td>
                  <td className="px-4 py-2">KES {level.mission_annual_income}</td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(level)}
                      className="text-blue-400 hover:text-blue-500"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(level.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-indigo-200">
                  No levels available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminManageLevels;
