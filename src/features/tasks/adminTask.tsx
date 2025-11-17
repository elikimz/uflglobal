import React, { useState } from "react";
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../tasks/taskAPI";
import { Pencil, Trash2, PlusCircle, CheckCircle } from "lucide-react";

const CLOUDINARY_UPLOAD_PRESET = "task_images";
const CLOUDINARY_CLOUD_NAME = "doste1wr0";

const AdminTasks: React.FC = () => {
  const { data: tasks, isLoading, refetch } = useGetTasksQuery();
  const [createTask, { isLoading: creating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();

  const [form, setForm] = useState({
    level_id: "",
    app_name: "",
    app_picture: "",
    reward: "",
    is_completed: false,
  });

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setEditingTaskId(null);
    setForm({
      level_id: "",
      app_name: "",
      app_picture: "",
      reward: "",
      is_completed: false,
    });
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setMessage("Uploading image...");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setForm({ ...form, app_picture: data.secure_url });
      setMessage("Image uploaded successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload image ❌");
    } finally {
      setUploading(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!form.app_picture) {
      setMessage("Please upload an image first ❌");
      return;
    }

    const payload = {
      level_id: Number(form.level_id),
      app_name: form.app_name,
      app_picture: form.app_picture,
      reward: Number(form.reward),
      is_completed: form.is_completed,
    };

    try {
      if (editingTaskId) {
        await updateTask({ task_id: editingTaskId, data: payload }).unwrap();
        setMessage("Task updated successfully ✅");
      } else {
        await createTask(payload).unwrap();
        setMessage("Task created successfully ✅");
      }
      resetForm();
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessage(`Failed to ${editingTaskId ? "update" : "create"} task ❌`);
    }
  };

  const handleEdit = (task: any) => {
    setEditingTaskId(task.id);
    setForm({
      level_id: String(task.level_id),
      app_name: task.app_name,
      app_picture: task.app_picture,
      reward: String(task.reward),
      is_completed: task.is_completed,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id).unwrap();
      setMessage("Task deleted successfully ✅");
      refetch();
    } catch {
      setMessage("Failed to delete task ❌");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-[#0F6CBD]">Admin Task Manager</h1>

      {message && (
        <div className="my-3 p-2 rounded bg-green-100 text-green-800">
          {message}
        </div>
      )}

      {/* Create / Edit Form */}
      <div className="mt-6 bg-white p-5 shadow rounded-xl border border-[#0F6CBD]">
        <h2 className="font-semibold text-lg mb-3 text-[#0F6CBD]">
          {editingTaskId ? "Edit Task" : "Create Task"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          <input
            placeholder="Level ID"
            className="border p-2 rounded"
            value={form.level_id}
            onChange={(e) => setForm({ ...form, level_id: e.target.value })}
          />
          <input
            placeholder="App Name"
            className="border p-2 rounded"
            value={form.app_name}
            onChange={(e) => setForm({ ...form, app_name: e.target.value })}
          />
          <input
            type="file"
            className="border p-2 rounded"
            onChange={(e) =>
              e.target.files?.[0] && handleFileUpload(e.target.files[0])
            }
          />

          {/* Image preview */}
          {form.app_picture && (
            <img
              src={form.app_picture}
              alt="Preview"
              className="h-16 w-16 rounded object-cover border border-gray-300"
            />
          )}

          <input
            placeholder="Reward"
            className="border p-2 rounded"
            value={form.reward}
            onChange={(e) => setForm({ ...form, reward: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.is_completed ? "true" : "false"}
            onChange={(e) =>
              setForm({ ...form, is_completed: e.target.value === "true" })
            }
          >
            <option value="false">Not Completed</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleCreateOrUpdate}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              editingTaskId
                ? "bg-green-600 text-white"
                : "bg-[#0F6CBD] text-white"
            }`}
            disabled={creating || updating || uploading || !form.app_picture}
          >
            {editingTaskId ? (
              <CheckCircle size={18} />
            ) : (
              <PlusCircle size={18} />
            )}
            {editingTaskId ? "Update" : "Create"}
          </button>
          {editingTaskId && (
            <button
              onClick={resetForm}
              className="px-4 py-2 rounded border border-red-500 text-red-500"
            >
              Cancel
            </button>
          )}
          {uploading && (
            <span className="text-gray-500">Uploading image...</span>
          )}
        </div>
      </div>

      {/* Task Table */}
      <div className="mt-8 overflow-x-auto">
        <h2 className="text-2xl font-bold text-[#0F6CBD] mb-3">All Tasks</h2>
        <table className="min-w-full border border-[#0F6CBD]">
          <thead className="bg-[#0F6CBD] text-white">
            <tr>
              <th className="p-2 border">App</th>
              <th className="p-2 border">Level</th>
              <th className="p-2 border">Reward</th>
              <th className="p-2 border">Completed</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              tasks?.map((task) => (
                <tr key={task.id} className="text-center">
                  <td className="p-2 border flex items-center justify-center gap-2">
                    <img
                      src={task.app_picture}
                      alt={task.app_name}
                      className="h-10 w-10 object-cover rounded"
                    />
                    {task.app_name}
                  </td>
                  <td className="p-2 border">{task.level_id}</td>
                  <td className="p-2 border">{task.reward}</td>
                  <td className="p-2 border">
                    {task.is_completed ? "Yes" : "No"}
                  </td>
                  <td className="p-2 border flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-blue-500 flex items-center gap-1"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 flex items-center gap-1"
                      disabled={deleting}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTasks;
