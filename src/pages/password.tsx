


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   useUpdatePhoneMutation,
//   useChangePasswordMutation,
// } from "../features/login/loginAPI";

// const PasswordSetting: React.FC = () => {
//   const navigate = useNavigate(); // React Router navigation
//   // RTK Mutations
//   const [updatePhone, { isLoading: phoneLoading }] = useUpdatePhoneMutation();
//   const [changePassword, { isLoading: passLoading }] =
//     useChangePasswordMutation();
//   // Form states
//   const [newPhone, setNewPhone] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   // Messages
//   const [phoneMessage, setPhoneMessage] = useState<{
//     text: string;
//     type: "success" | "error";
//   } | null>(null);
//   const [passMessage, setPassMessage] = useState<{
//     text: string;
//     type: "success" | "error";
//   } | null>(null);
//   // Auto-clear messages after 5s
//   useEffect(() => {
//     if (phoneMessage) {
//       const timer = setTimeout(() => setPhoneMessage(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [phoneMessage]);
//   useEffect(() => {
//     if (passMessage) {
//       const timer = setTimeout(() => setPassMessage(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [passMessage]);
//   // Handlers
//   const handlePhoneUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newPhone) return;
//     try {
//       const result = await updatePhone({ new_phone: newPhone }).unwrap();
//       setPhoneMessage({
//         text: result.message || "Phone updated successfully!",
//         type: "success",
//       });
//       setNewPhone("");
//       // Logout user after phone update
//       localStorage.removeItem("access_token"); // Remove JWT or token key
//       navigate("/register"); // Redirect to login
//     } catch (err: any) {
//       const detailMessage =
//         err?.data?.detail || err?.error || "Failed to update phone number";
//       setPhoneMessage({ text: detailMessage, type: "error" });
//     }
//   };
//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!oldPassword || !newPassword) return;
//     try {
//       const result = await changePassword({
//         old_password: oldPassword,
//         new_password: newPassword,
//       }).unwrap();
//       setPassMessage({
//         text: result.message || "Password changed successfully!",
//         type: "success",
//       });
//       setOldPassword("");
//       setNewPassword("");
//       // Logout user after password change
//       localStorage.removeItem("token"); // Remove JWT or token key
//       navigate("/register"); // Redirect to login
//     } catch (err: any) {
//       const detailMessage =
//         err?.data?.detail || err?.error || "Failed to change password";
//       setPassMessage({ text: detailMessage, type: "error" });
//     }
//   };
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen px-4 py-6 bg-yellow-50 text-yellow-900"
//     >
//       <h1 className="text-2xl font-bold mb-6 text-yellow-800">
//         Account Settings
//       </h1>
//       {/* === Update Phone Number === */}
//       <section className="max-w-md mx-auto mb-8 bg-yellow-100 backdrop-blur-xl border border-yellow-200 rounded-2xl p-6 shadow">
//         <h2 className="text-lg font-semibold mb-4 text-yellow-800">
//           Update Phone Number
//         </h2>
//         <form onSubmit={handlePhoneUpdate} className="space-y-4">
//           <input
//             type="text"
//             placeholder="New Phone Number"
//             value={newPhone}
//             onChange={(e) => setNewPhone(e.target.value)}
//             className="w-full p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           />
//           <button
//             type="submit"
//             disabled={phoneLoading}
//             className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors p-3 rounded-xl font-semibold text-white"
//           >
//             {phoneLoading ? "Updating..." : "Update Phone"}
//           </button>
//         </form>
//         {phoneMessage && (
//           <p
//             className={`mt-2 text-sm ${
//               phoneMessage.type === "success"
//                 ? "text-green-600"
//                 : "text-red-600"
//             }`}
//           >
//             {phoneMessage.text}
//           </p>
//         )}
//       </section>
//       {/* === Change Password === */}
//       <section className="max-w-md mx-auto bg-yellow-100 backdrop-blur-xl border border-yellow-200 rounded-2xl p-6 shadow">
//         <h2 className="text-lg font-semibold mb-4 text-yellow-800">
//           Change Password
//         </h2>
//         <form onSubmit={handlePasswordChange} className="space-y-4">
//           <input
//             type="password"
//             placeholder="Old Password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           />
//           <button
//             type="submit"
//             disabled={passLoading}
//             className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors p-3 rounded-xl font-semibold text-white"
//           >
//             {passLoading ? "Changing..." : "Change Password"}
//           </button>
//         </form>
//         {passMessage && (
//           <p
//             className={`mt-2 text-sm ${
//               passMessage.type === "success" ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {passMessage.text}
//           </p>
//         )}
//       </section>
//     </motion.div>
//   );
// };
// export default PasswordSetting;





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  useUpdatePhoneMutation,
  useChangePasswordMutation,
} from "../features/login/loginAPI";

const PasswordSetting: React.FC = () => {
  const navigate = useNavigate();

  // RTK Mutations
  const [updatePhone, { isLoading: phoneLoading }] = useUpdatePhoneMutation();
  const [changePassword, { isLoading: passLoading }] =
    useChangePasswordMutation();

  // Form states
  const [newPhone, setNewPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Messages
  const [phoneMessage, setPhoneMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const [passMessage, setPassMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Auto-clear success/error messages
  useEffect(() => {
    if (phoneMessage) {
      const timer = setTimeout(() => setPhoneMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [phoneMessage]);

  useEffect(() => {
    if (passMessage) {
      const timer = setTimeout(() => setPassMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [passMessage]);

  // ----------- PHONE UPDATE -----------
  const handlePhoneUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone) return;

    try {
      const result: any = await updatePhone({ new_phone: newPhone }).unwrap();

      const message =
        typeof result === "string"
          ? result
          : result?.message || "Phone updated successfully!";

      setPhoneMessage({ text: message, type: "success" });
      setNewPhone("");

      // Logout user after phone update
      localStorage.removeItem("access_token");
      navigate("/register");
    } catch (err: any) {
      const detailMessage =
        err?.data?.detail || err?.error || "Failed to update phone number";

      setPhoneMessage({ text: detailMessage, type: "error" });
    }
  };

  // ----------- PASSWORD UPDATE -----------
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;

    try {
      const result: any = await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      }).unwrap();

      const message =
        typeof result === "string"
          ? result
          : result?.message || "Password changed successfully!";

      setPassMessage({ text: message, type: "success" });
      setOldPassword("");
      setNewPassword("");

      // Logout user
      localStorage.removeItem("access_token");
      navigate("/register");
    } catch (err: any) {
      const detailMessage =
        err?.data?.detail || err?.error || "Failed to change password";

      setPassMessage({ text: detailMessage, type: "error" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-6 bg-yellow-50 text-yellow-900"
    >
      <h1 className="text-2xl font-bold mb-6 text-yellow-800">
        Account Settings
      </h1>

      {/* Update Phone Number */}
      <section className="max-w-md mx-auto mb-8 bg-yellow-100 backdrop-blur-xl border border-yellow-200 rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4 text-yellow-800">
          Update Phone Number
        </h2>

        <form onSubmit={handlePhoneUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="New Phone Number"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="w-full p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={phoneLoading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors p-3 rounded-xl font-semibold text-white"
          >
            {phoneLoading ? "Updating..." : "Update Phone"}
          </button>
        </form>

        {phoneMessage && (
          <p
            className={`mt-2 text-sm ${
              phoneMessage.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {phoneMessage.text}
          </p>
        )}
      </section>

      {/* Change Password */}
      <section className="max-w-md mx-auto bg-yellow-100 backdrop-blur-xl border border-yellow-200 rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4 text-yellow-800">
          Change Password
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={passLoading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors p-3 rounded-xl font-semibold text-white"
          >
            {passLoading ? "Changing..." : "Change Password"}
          </button>
        </form>

        {passMessage && (
          <p
            className={`mt-2 text-sm ${
              passMessage.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {passMessage.text}
          </p>
        )}
      </section>
    </motion.div>
  );
};

export default PasswordSetting;
