


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   BanknotesIcon,
//   CheckCircleIcon,
//   ExclamationCircleIcon,
// } from "@heroicons/react/24/solid";
// import { useUpdatePaymentDetailsMutation } from "../features/withdrawal/withdrawalAPI";

// interface PaymentDetailsProps {
//   initialData?: {
//     bank_name?: string;
//     bank_account_number?: string;
//     full_name?: string;
//   };
// }

// const PaymentDetails: React.FC<PaymentDetailsProps> = ({ initialData }) => {
//   const [updatePaymentDetails, { isLoading }] =
//     useUpdatePaymentDetailsMutation();
//   const [bankName, setBankName] = useState(initialData?.bank_name || "");
//   const [bankAccount, setBankAccount] = useState(
//     initialData?.bank_account_number || ""
//   );
//   const [fullName, setFullName] = useState(initialData?.full_name || "");
//   const [paymentFeedback, setPaymentFeedback] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const handleUpdatePaymentDetails = async () => {
//     if (!bankName && !bankAccount && !fullName) {
//       setPaymentFeedback({ type: "error", message: "Fill at least one field" });
//       return;
//     }

//     try {
//       await updatePaymentDetails({
//         bank_name: bankName,
//         bank_account_number: bankAccount,
//         full_name: fullName,
//       }).unwrap();

//       setPaymentFeedback({
//         type: "success",
//         message: "Payment details updated successfully!",
//       });

//       // Reset form fields after successful update
//       setBankName("");
//       setBankAccount("");
//       setFullName("");
//     } catch (err: any) {
//       setPaymentFeedback({
//         type: "error",
//         message: err.data?.detail || "Error updating payment details",
//       });
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="max-w-3xl mx-auto bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow"
//     >
//       <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center gap-2">
//         <BanknotesIcon className="h-6 w-6 text-yellow-600" /> Payment / Bank
//         Details
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-yellow-700 mb-1">Bank Name</label>
//           <input
//             type="text"
//             placeholder="e.g., KCB, Equity, Mpesa_Money"
//             value={bankName}
//             onChange={(e) => setBankName(e.target.value)}
//             className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           />
//         </div>
//         <div>
//           <label className="block text-yellow-700 mb-1">
//             Account Number
//           </label>
//           <input
//             type="text"
//             placeholder="e.g., 1234567890"
//             value={bankAccount}
//             onChange={(e) => setBankAccount(e.target.value)}
//             className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-yellow-700 mb-1">Full Name</label>
//           <input
//             type="text"
//             placeholder="e.g., John Doe"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           />
//         </div>
//       </div>
//       {paymentFeedback && (
//         <div
//           className={`flex items-center gap-2 p-3 rounded-lg mt-4 ${
//             paymentFeedback.type === "success"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {paymentFeedback.type === "success" ? (
//             <CheckCircleIcon className="h-5 w-5 text-green-600" />
//           ) : (
//             <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
//           )}
//           <span>{paymentFeedback.message}</span>
//         </div>
//       )}

//       <button
//         onClick={handleUpdatePaymentDetails}
//         disabled={isLoading}
//         className="w-full bg-yellow-600 hover:bg-yellow-700 transition-colors py-3 rounded-lg font-semibold text-white mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
//       >
//         {isLoading ? "Updating..." : "Update Payment Details"}
//       </button>
//     </motion.div>
//   );
// };

// export default PaymentDetails;





import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BanknotesIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import {
  useGetPaymentDetailsQuery,
  useUpdatePaymentDetailsMutation,
} from '../features/withdrawal/withdrawalAPI';

const PaymentDetails: React.FC = () => {
  const {
    data: paymentDetails,
    isLoading: isFetching,
    refetch,
  } = useGetPaymentDetailsQuery();
  const [updatePaymentDetails, { isLoading: isUpdating }] =
    useUpdatePaymentDetailsMutation();

  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [fullName, setFullName] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [paymentFeedback, setPaymentFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Initialize form with fetched data
  useEffect(() => {
    if (paymentDetails) {
      setBankName(paymentDetails.bank_name || '');
      setBankAccount(paymentDetails.bank_account_number || '');
      setFullName(paymentDetails.full_name || '');
      setMpesaNumber(paymentDetails.mpesa_number || '');
    }
  }, [paymentDetails]);

  const handleUpdatePaymentDetails = async () => {
    if (!bankName && !bankAccount && !fullName && !mpesaNumber) {
      setPaymentFeedback({ type: 'error', message: 'Fill at least one field' });
      return;
    }

    try {
      await updatePaymentDetails({
        bank_name: bankName || undefined,
        bank_account_number: bankAccount || undefined,
        full_name: fullName || undefined,
        mpesa_number: mpesaNumber || undefined,
      }).unwrap();

      setPaymentFeedback({
        type: 'success',
        message: 'Payment details updated successfully!',
      });

      // Reset form after successful update
      setBankName('');
      setBankAccount('');
      setFullName('');
      setMpesaNumber('');

      // Refresh the data after update
      await refetch();
      setIsEditing(false);
    } catch (err: any) {
      setPaymentFeedback({
        type: 'error',
        message: err.data?.detail || 'Error updating payment details',
      });
    }
  };


  if (isFetching) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow"
      >
        <p className="text-yellow-700">Loading payment details...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-yellow-800 flex items-center gap-2">
          <BanknotesIcon className="h-6 w-6 text-yellow-600" /> Payment Details
        </h2>
        {!isEditing && (
          <button
            onClick={() => {
              setIsEditing(true);
              setPaymentFeedback(null);
            }}
            className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            <PencilSquareIcon className="h-5 w-5" />
            <span>
              {paymentDetails?.has_payment_details
                ? 'Edit'
                : 'Add Payment Details'}
            </span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-yellow-700 mb-1">
                    M-Pesa Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 07654333"
                    value={mpesaNumber}
                    onChange={(e) => setMpesaNumber(e.target.value)}
                    className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-yellow-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., KCB, Equity, Co-operative"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-yellow-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 9876555"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-yellow-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Elijah Kimani"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </>
            ) : (
              <>
                {paymentDetails?.has_payment_details ? (
                  <>
                    {paymentDetails.mpesa_number && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-yellow-700 font-medium">
                          M-Pesa Number
                        </p>
                        <p className="text-yellow-900">
                          {paymentDetails.mpesa_number}
                        </p>
                      </div>
                    )}
                    {paymentDetails.bank_name && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-yellow-700 font-medium">Bank Name</p>
                        <p className="text-yellow-900">
                          {paymentDetails.bank_name}
                        </p>
                      </div>
                    )}
                    {paymentDetails.bank_account_number && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-yellow-700 font-medium">
                          Bank Account Number
                        </p>
                        <p className="text-yellow-900">
                          {paymentDetails.bank_account_number}
                        </p>
                      </div>
                    )}
                    {paymentDetails.full_name && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-yellow-700 font-medium">Full Name</p>
                        <p className="text-yellow-900">
                          {paymentDetails.full_name}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg text-center md:col-span-2">
                    <p className="text-yellow-700 mb-2">
                      No payment details found.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {paymentFeedback && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg mt-4 ${
              paymentFeedback.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {paymentFeedback.type === 'success' ? (
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
            )}
            <span>{paymentFeedback.message}</span>
          </div>
        )}

        {isEditing && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleUpdatePaymentDetails}
              disabled={isUpdating}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 transition-colors py-2 rounded-lg font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                // Reset to original values if canceling
                if (paymentDetails) {
                  setBankName(paymentDetails.bank_name || '');
                  setBankAccount(paymentDetails.bank_account_number || '');
                  setFullName(paymentDetails.full_name || '');
                  setMpesaNumber(paymentDetails.mpesa_number || '');
                } else {
                  // Clear all fields if adding new details
                  setBankName('');
                  setBankAccount('');
                  setFullName('');
                  setMpesaNumber('');
                }
                setPaymentFeedback(null);
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 transition-colors py-2 rounded-lg font-semibold text-gray-800"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentDetails;
