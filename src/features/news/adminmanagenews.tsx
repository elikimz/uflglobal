// // src/components/AdminManageNews.tsx
// import React, { useState } from "react";
// import {
//   useGetAllCompanyNewsQuery,
//   useCreateCompanyNewsMutation,
//   useUpdateCompanyNewsMutation,
//   useDeleteCompanyNewsMutation,
// } from "../news/newsAPI";
// import {
//   PencilIcon,
//   TrashIcon,
//   PlusCircleIcon,
//   CheckCircleIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/solid";

// interface NewsForm {
//   title: string;
//   content: string;
// }

// const AdminManageNews: React.FC = () => {
//   const { data: newsList, isLoading, refetch } = useGetAllCompanyNewsQuery();
//   const [createNews] = useCreateCompanyNewsMutation();
//   const [updateNews] = useUpdateCompanyNewsMutation();
//   const [deleteNews] = useDeleteCompanyNewsMutation();

//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [form, setForm] = useState<NewsForm>({ title: "", content: "" });
//   const [message, setMessage] = useState<{
//     type: "success" | "error";
//     text: string;
//   } | null>(null);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleCreate = async () => {
//     if (!form.title || !form.content) return;
//     try {
//       await createNews(form).unwrap();
//       setMessage({ type: "success", text: "News created successfully!" });
//       setForm({ title: "", content: "" });
//       refetch();
//     } catch (err: any) {
//       setMessage({
//         type: "error",
//         text: err?.data?.detail || "Failed to create news.",
//       });
//     }
//     setTimeout(() => setMessage(null), 5000);
//   };

//   const handleUpdate = async (id: number) => {
//     try {
//       await updateNews({ news_id: id, body: form }).unwrap();
//       setMessage({ type: "success", text: "News updated successfully!" });
//       setEditingId(null);
//       setForm({ title: "", content: "" });
//       refetch();
//     } catch (err: any) {
//       setMessage({
//         type: "error",
//         text: err?.data?.detail || "Failed to update news.",
//       });
//     }
//     setTimeout(() => setMessage(null), 5000);
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this news?")) return;
//     try {
//       await deleteNews(id).unwrap();
//       setMessage({ type: "success", text: "News deleted successfully!" });
//       refetch();
//     } catch (err: any) {
//       setMessage({
//         type: "error",
//         text: err?.data?.detail || "Failed to delete news.",
//       });
//     }
//     setTimeout(() => setMessage(null), 5000);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64 bg-yellow-50">
//         <p className="text-yellow-700 font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-yellow-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
//         Admin: Manage Company News
//       </h2>

//       {/* Message */}
//       {message && (
//         <div
//           className={`flex items-center gap-2 p-3 rounded-lg mb-6 text-white ${
//             message.type === "success" ? "bg-yellow-600" : "bg-yellow-800"
//           }`}
//         >
//           {message.type === "success" ? (
//             <CheckCircleIcon className="h-5 w-5" />
//           ) : (
//             <XCircleIcon className="h-5 w-5" />
//           )}
//           <span>{message.text}</span>
//         </div>
//       )}

//       {/* Form for Create / Edit */}
//       <div className="bg-yellow-100 p-6 rounded-xl shadow mb-8">
//         <h3 className="text-2xl font-semibold text-yellow-900 mb-4">
//           {editingId ? "Edit News" : "Add New News"}
//         </h3>
//         <input
//           type="text"
//           name="title"
//           value={form.title}
//           onChange={handleInputChange}
//           placeholder="News Title"
//           className="w-full mb-3 p-2 rounded border border-yellow-300"
//         />
//         <textarea
//           name="content"
//           value={form.content}
//           onChange={handleInputChange}
//           placeholder="News Content"
//           className="w-full mb-3 p-2 rounded border border-yellow-300"
//           rows={4}
//         />
//         <button
//           onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
//           className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2"
//         >
//           <PlusCircleIcon className="h-5 w-5" />
//           {editingId ? "Update News" : "Create News"}
//         </button>
//         {editingId && (
//           <button
//             onClick={() => {
//               setEditingId(null);
//               setForm({ title: "", content: "" });
//             }}
//             className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       {/* News Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-yellow-300 rounded-lg">
//           <thead className="bg-yellow-200">
//             <tr>
//               <th className="border p-3 text-left">Title</th>
//               <th className="border p-3 text-left">Content</th>
//               <th className="border p-3 text-center">Created At</th>
//               <th className="border p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {newsList?.map((news) => (
//               <tr key={news.id} className="hover:bg-yellow-100">
//                 <td className="border p-3 text-yellow-900">{news.title}</td>
//                 <td className="border p-3 text-yellow-900">{news.content}</td>
//                 <td className="border p-3 text-center text-yellow-800">
//                   {new Date(news.created_at).toLocaleDateString()}
//                 </td>
//                 <td className="border p-3 text-center flex justify-center gap-2">
//                   <button
//                     onClick={() => {
//                       setEditingId(news.id);
//                       setForm({ title: news.title, content: news.content });
//                     }}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1"
//                   >
//                     <PencilIcon className="h-4 w-4" /> Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(news.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
//                   >
//                     <TrashIcon className="h-4 w-4" /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminManageNews;





// src/components/AdminManageNews.tsx
import React, { useState } from "react";
import {
  useGetAllCompanyNewsQuery,
  useCreateCompanyNewsMutation,
  useUpdateCompanyNewsMutation,
  useDeleteCompanyNewsMutation,
} from "../news/newsAPI";
import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

interface NewsForm {
  title: string;
  content: string;
  image_url?: string; // 🔥 NEW
}

const AdminManageNews: React.FC = () => {
  const { data: newsList, isLoading, refetch } = useGetAllCompanyNewsQuery();
  const [createNews] = useCreateCompanyNewsMutation();
  const [updateNews] = useUpdateCompanyNewsMutation();
  const [deleteNews] = useDeleteCompanyNewsMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<NewsForm>({
    title: "",
    content: "",
    image_url: "",
  });
  const [uploading, setUploading] = useState(false); // 🔥 NEW: show upload status

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 CLOUDINARY IMAGE UPLOAD
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "task_images");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/doste1wr0/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const cloudinaryData = await res.json();
      setForm((prev) => ({ ...prev, image_url: cloudinaryData.secure_url }));

      setMessage({
        type: "success",
        text: "Image uploaded successfully!",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Image upload failed.",
      });
    }

    setUploading(false);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleCreate = async () => {
    if (!form.title || !form.content) return;
    try {
      await createNews(form).unwrap();
      setMessage({ type: "success", text: "News created successfully!" });
      setForm({ title: "", content: "", image_url: "" });
      refetch();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.data?.detail || "Failed to create news.",
      });
    }
    setTimeout(() => setMessage(null), 5000);
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateNews({ news_id: id, body: form }).unwrap();
      setMessage({ type: "success", text: "News updated successfully!" });
      setEditingId(null);
      setForm({ title: "", content: "", image_url: "" });
      refetch();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.data?.detail || "Failed to update news.",
      });
    }
    setTimeout(() => setMessage(null), 5000);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;
    try {
      await deleteNews(id).unwrap();
      setMessage({ type: "success", text: "News deleted successfully!" });
      refetch();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.data?.detail || "Failed to delete news.",
      });
    }
    setTimeout(() => setMessage(null), 5000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-yellow-50">
        <p className="text-yellow-700 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-yellow-50 min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
        Admin: Manage Company News
      </h2>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg mb-6 text-white ${
            message.type === "success" ? "bg-yellow-600" : "bg-yellow-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : (
            <XCircleIcon className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form */}
      <div className="bg-yellow-100 p-6 rounded-xl shadow mb-8">
        <h3 className="text-2xl font-semibold text-yellow-900 mb-4">
          {editingId ? "Edit News" : "Add New News"}
        </h3>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleInputChange}
          placeholder="News Title"
          className="w-full mb-3 p-2 rounded border border-yellow-300"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleInputChange}
          placeholder="News Content"
          className="w-full mb-3 p-2 rounded border border-yellow-300"
          rows={4}
        />

        {/* Image Upload */}
        <div className="mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <PhotoIcon className="h-6 w-6 text-yellow-700" />
            <span className="text-yellow-900 font-semibold">
              Upload Image (optional)
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          {uploading && <p className="text-yellow-700 mt-2">Uploading image...</p>}

          {form.image_url && (
            <img
              src={form.image_url}
              alt="Preview"
              className="mt-3 w-40 rounded shadow"
            />
          )}
        </div>

        <button
          onClick={editingId ? () => handleUpdate(editingId) : handleCreate}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2"
        >
          <PlusCircleIcon className="h-5 w-5" />
          {editingId ? "Update News" : "Create News"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", content: "", image_url: "" });
            }}
            className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      {/* News Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-yellow-300 rounded-lg">
          <thead className="bg-yellow-200">
            <tr>
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Content</th>
              <th className="border p-3 text-center">Image</th>
              <th className="border p-3 text-center">Created At</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList?.map((news) => (
              <tr key={news.id} className="hover:bg-yellow-100">
                <td className="border p-3">{news.title}</td>
                <td className="border p-3">{news.content}</td>

                {/* Display Image */}
                <td className="border p-3 text-center">
                  {news.image_url ? (
                    <img
                      src={news.image_url}
                      className="h-16 mx-auto rounded shadow"
                      alt="news"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>

                <td className="border p-3 text-center">
                  {new Date(news.created_at).toLocaleDateString()}
                </td>

                <td className="border p-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setEditingId(news.id);
                      setForm({
                        title: news.title,
                        content: news.content,
                        image_url: news.image_url || "",
                      });
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <PencilIcon className="h-4 w-4" /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(news.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <TrashIcon className="h-4 w-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageNews;
