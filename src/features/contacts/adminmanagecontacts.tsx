import React, { useState } from "react";
import {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "../contacts/contactsAPI";

interface ContactForm {
  safaricom_number?: string;
  airtel_number?: string;
  safaricom_name?: string;
  airtel_name?: string;
  whatsapp_number?: string;
}

const AdminManageContact: React.FC = () => {
  const { data: contacts, isLoading, isError, refetch } = useGetContactsQuery();
  const [createContact] = useCreateContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [form, setForm] = useState<ContactForm>({});
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
      let res: any;
      if (editingId) {
        res = await updateContact({ id: editingId, data: form }).unwrap();
      } else {
        res = await createContact(form).unwrap();
      }
      setMessage({
        type: "success",
        text: res.message || "Operation successful",
      });
      // Reset form to empty ContactForm object
      setForm({
        safaricom_number: "",
        airtel_number: "",
        safaricom_name: "",
        airtel_name: "",
        whatsapp_number: "",
      });
      setEditingId(null);
      refetch();
    } catch (error: any) {
      setMessage({
        type: "error",
        text:
          error?.data?.message || error?.data?.detail || "Something went wrong",
      });
    }
  };

  const handleEdit = (contact: any) => {
    setForm(contact);
    setEditingId(contact.id);
    setMessage(null);
  };

  const handleDelete = async (id: number) => {
    setMessage(null);
    try {
      const res: any = await deleteContact(id).unwrap();
      setMessage({
        type: "success",
        text: res.message || "Contact deleted successfully",
      });
      refetch();
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error?.data?.message || error?.data?.detail || "Delete failed",
      });
    }
  };

  if (isLoading) return <div>Loading contacts...</div>;
  if (isError) return <div>Error fetching contacts.</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Contact Management</h1>
      {/* API Message */}
      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 space-y-2 bg-white p-4 rounded shadow"
      >
        {[
          "safaricom_number",
          "airtel_number",
          "safaricom_name",
          "airtel_name",
          "whatsapp_number",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={(form as any)[field] || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        ))}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            {editingId ? "Update Contact" : "Create Contact"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  safaricom_number: "",
                  airtel_number: "",
                  safaricom_name: "",
                  airtel_name: "",
                  whatsapp_number: "",
                });
                setEditingId(null);
                setMessage(null);
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {/* Contact List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts?.map((contact) => (
          <div
            key={contact.id}
            className="border p-4 rounded shadow flex flex-col justify-between bg-white"
          >
            <div className="space-y-1">
              <p>
                <strong>Safaricom:</strong> {contact.safaricom_name} -{" "}
                {contact.safaricom_number}
              </p>
              <p>
                <strong>Airtel:</strong> {contact.airtel_name} -{" "}
                {contact.airtel_number}
              </p>
              <p>
                <strong>WhatsApp:</strong> {contact.whatsapp_number}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(contact.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => handleEdit(contact)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageContact;
