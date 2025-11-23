import React, { useState } from "react";
import {
  useGetLinksQuery,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
} from "../whatapplinks/whatappAPI";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

// Define color schemes based on the Profile component
const colors = {
  background: "bg-yellow-50",
  accent: "bg-yellow-400",
  text: "text-yellow-900",
  border: "border-yellow-200",
  input: "focus:ring-yellow-400",
  error: "bg-red-500/20 text-red-500",
  success: "bg-green-500/20 text-green-500",
};

const AdminManageLink: React.FC = () => {
  const { data: links, isLoading, refetch } = useGetLinksQuery();
  const [createLink] = useCreateLinkMutation();
  const [updateLink] = useUpdateLinkMutation();
  const [deleteLink] = useDeleteLinkMutation();
  const [form, setForm] = useState({
    whatsapp_link: "",
    group_link: "",
    hiring_manager_link: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      if (editingId) {
        await updateLink({ id: editingId, data: form }).unwrap();
        setMessage({ type: "success", text: "Link updated successfully!" });
      } else {
        await createLink(form).unwrap();
        setMessage({ type: "success", text: "Link created successfully!" });
      }
      setForm({ whatsapp_link: "", group_link: "", hiring_manager_link: "" });
      setEditingId(null);
      refetch();
    } catch (err) {
      setMessage({
        type: "error",
        text: "Operation failed. Please try again.",
      });
    }
  };

  const handleEdit = (link: any) => {
    setForm({
      whatsapp_link: link.whatsapp_link || "",
      group_link: link.group_link || "",
      hiring_manager_link: link.hiring_manager_link || "",
    });
    setEditingId(link.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await deleteLink(id).unwrap();
        setMessage({ type: "success", text: "Link deleted successfully!" });
        refetch();
      } catch {
        setMessage({ type: "error", text: "Failed to delete link." });
      }
    }
  };

  return (
    <div className={`p-6 max-w-3xl mx-auto ${colors.background}`}>
      <h1 className={`text-2xl font-bold mb-4 ${colors.text}`}>
        Admin Manage Links
      </h1>
      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded flex items-center gap-2 ${
            message.type === "success" ? colors.success : colors.error
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
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 mb-6 bg-white/10 p-4 rounded-xl backdrop-blur-md"
      >
        <input
          type="url"
          name="whatsapp_link"
          placeholder="WhatsApp Link"
          value={form.whatsapp_link}
          onChange={handleChange}
          className={`w-full p-2 rounded bg-white/15 ${colors.text} ${colors.input} border border-yellow-300`}
          required
        />
        <input
          type="url"
          name="group_link"
          placeholder="Group Link"
          value={form.group_link}
          onChange={handleChange}
          className={`w-full p-2 rounded bg-white/15 ${colors.text} ${colors.input} border border-yellow-300`}
          required
        />
        <input
          type="url"
          name="hiring_manager_link"
          placeholder="Hiring Manager Link"
          value={form.hiring_manager_link}
          onChange={handleChange}
          className={`w-full p-2 rounded bg-white/15 ${colors.text} ${colors.input} border border-yellow-300`}
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 ${colors.accent} rounded hover:bg-yellow-500 border border-yellow-300`}
        >
          {editingId ? "Update Link" : "Create Link"}
        </button>
      </form>
      {/* Links List */}
      {isLoading ? (
        <p className={colors.text}>Loading links...</p>
      ) : links && links.length > 0 ? (
        <div className="space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className={`bg-white/10 p-3 rounded flex justify-between items-center ${colors.border}`}
            >
              <div className="space-y-1 text-sm">
                <p>
                  <strong>WhatsApp:</strong> {link.whatsapp_link}
                </p>
                <p>
                  <strong>Group:</strong> {link.group_link}
                </p>
                <p>
                  <strong>Hiring Manager:</strong> {link.hiring_manager_link}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(link)}
                  className="p-1 bg-yellow-500 rounded hover:bg-yellow-600 border border-yellow-300"
                >
                  <PencilSquareIcon className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="p-1 bg-red-500 rounded hover:bg-red-600 border border-red-300"
                >
                  <TrashIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={colors.text}>No links found.</p>
      )}
    </div>
  );
};

export default AdminManageLink;
