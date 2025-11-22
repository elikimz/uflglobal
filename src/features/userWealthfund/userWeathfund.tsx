


// // src/components/UserWealthFund.tsx
// import React, { useState, useMemo } from "react";
// import {
//   useGetMyWealthFundsQuery,
//   useInvestInWealthFundMutation,
// } from "../userWealthfund/userWeathfundAPI";
// import { useGetAllWealthFundsQuery } from "../wealthfund/wealthfundAdmiAPI";
// import {
//   CheckCircleIcon,
//   ExclamationCircleIcon,
//   CurrencyDollarIcon,
// } from "@heroicons/react/24/solid";

// const UserWealthFund: React.FC = () => {
//   const { data: allFunds, isLoading: fundsLoading } = useGetAllWealthFundsQuery();
//   const { data: myInvestments, isLoading: investmentsLoading, refetch } = useGetMyWealthFundsQuery();
//   const [investInWealthFund, { isLoading: investing }] = useInvestInWealthFundMutation();

//   const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

//   // Merge fund info with investments
//   const investmentsWithFundInfo = useMemo(() => {
//     if (!myInvestments || !allFunds) return [];
//     return myInvestments.map((inv: any) => {
//       const fund = allFunds.find((f: any) => f.id === inv.wealth_fund_id);
//       return {
//         ...inv,
//         fund_name: fund?.name || `Fund #${inv.wealth_fund_id}`,
//         minimum_amount: fund?.minimum_amount || 0,
//         days: fund?.days || 0,
//         return_rate: fund?.return_rate || 0,
//       };
//     });
//   }, [myInvestments, allFunds]);

//   const handleInvest = async (fund_id: number) => {
//     try {
//       await investInWealthFund(fund_id).unwrap();
//       setMessage({ type: "success", text: "Investment successful!" });
//       refetch();
//     } catch (err: any) {
//       setMessage({
//         type: "error",
//         text: err?.data?.detail || "Investment failed.",
//       });
//     }
//     setTimeout(() => setMessage(null), 5000);
//   };

//   const getStatusIndicator = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "active":
//         return <span className="inline-block w-3 h-3 mr-2 rounded-full bg-green-500"></span>;
//       case "completed":
//         return <span className="inline-block w-3 h-3 mr-2 rounded-full bg-blue-500"></span>;
//       default:
//         return <span className="inline-block w-3 h-3 mr-2 rounded-full bg-gray-400"></span>;
//     }
//   };

//   if (fundsLoading || investmentsLoading) {
//     return (
//       <div className="flex justify-center items-center h-64 bg-yellow-50">
//         <p className="text-yellow-700 font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-yellow-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
//         Wealth Fund Dashboard
//       </h2>

//       {/* Wealth Fund Explanation */}
//       <div className="mb-8 p-6 bg-yellow-200 rounded-xl shadow text-yellow-900">
//         <h3 className="text-xl font-bold mb-2">How Our Wealth Funds Work</h3>
//         <p className="text-yellow-800 mb-2">
//           Invest in our carefully curated Wealth Funds and watch your money grow over time. Each fund has a fixed duration and a clearly defined return rate, so you know exactly what to expect.
//         </p>
//         <p className="text-yellow-800 mb-2">
//           Simply choose a fund, invest the minimum required amount, and track your investment in real-time. Your investments can be <span className="font-semibold">Active</span> (green) or <span className="font-semibold">Completed</span> (blue), making it easy to manage your portfolio.
//         </p>
//         <p className="text-yellow-800">
//           Start small, grow steadily, and enjoy the power of smart investing—all in one place. Our goal is to make wealth-building simple, transparent, and rewarding.
//         </p>
//       </div>

//       {/* Inline Message */}
//       {message && (
//         <div
//           className={`flex items-center gap-2 p-3 rounded-lg mb-6 text-white ${
//             message.type === "success" ? "bg-yellow-600" : "bg-yellow-800"
//           }`}
//         >
//           {message.type === "success" ? (
//             <CheckCircleIcon className="h-5 w-5" />
//           ) : (
//             <ExclamationCircleIcon className="h-5 w-5" />
//           )}
//           <span>{message.text}</span>
//         </div>
//       )}

//       {/* Available Funds */}
//       <h3 className="text-2xl font-semibold mb-4 text-yellow-900">Available Wealth Funds</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         {allFunds?.map((fund: any) => {
//           const invested = myInvestments?.find((inv: any) => inv.wealth_fund_id === fund.id);
//           return (
//             <div
//               key={fund.id}
//               className="bg-yellow-100 rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
//             >
//               <div>
//                 <h4 className="text-xl font-bold mb-2 text-yellow-900">{fund.name}</h4>
//                 <p className="text-yellow-800 mb-1">Minimum Amount: KES {fund.minimum_amount}</p>
//                 <p className="text-yellow-800 mb-1">Duration: {fund.days} days</p>
//                 <p className="text-yellow-800 mb-3">Return Rate: {fund.return_rate}%</p>
//               </div>
//               <button
//                 onClick={() => handleInvest(fund.id)}
//                 disabled={invested || investing}
//                 className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
//                   invested ? "bg-yellow-300 cursor-not-allowed text-yellow-900" : "bg-yellow-600 hover:bg-yellow-700"
//                 }`}
//               >
//                 <CurrencyDollarIcon className="h-5 w-5" />
//                 {invested ? "Already Invested" : investing ? "Investing..." : "Invest"}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* My Investments */}
//       <h3 className="text-2xl font-semibold mb-4 text-yellow-900">My Investments</h3>
//       {investmentsWithFundInfo.length === 0 ? (
//         <p className="text-yellow-800 mb-6">You have no active investments.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-yellow-300 rounded-lg">
//             <thead className="bg-yellow-200">
//               <tr>
//                 <th className="border p-3 text-left">Fund Name</th>
//                 <th className="border p-3 text-right">Amount Invested</th>
//                 <th className="border p-3 text-right">Start Date</th>
//                 <th className="border p-3 text-right">End Date</th>
//                 <th className="border p-3 text-right">Total Return</th>
//                 <th className="border p-3 text-center">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {investmentsWithFundInfo.map((inv: any) => (
//                 <tr key={inv.id} className="hover:bg-yellow-100">
//                   <td className="border p-3 text-yellow-900">{inv.fund_name}</td>
//                   <td className="border p-3 text-right text-yellow-900">{inv.amount_invested}</td>
//                   <td className="border p-3 text-right text-yellow-900">{inv.start_date || "-"}</td>
//                   <td className="border p-3 text-right text-yellow-900">{inv.end_date || "-"}</td>
//                   <td className="border p-3 text-right font-semibold text-yellow-800 bg-yellow-200 rounded-lg">
//                     {(inv.total_expected_return || 0).toFixed(2)}
//                   </td>
//                   <td className="border p-3 text-center capitalize text-yellow-900 flex items-center justify-center">
//                     {getStatusIndicator(inv.status || "")}
//                     {inv.status || "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserWealthFund;




// src/components/UserWealthFund.tsx
import React, { useState, useMemo } from "react";
import {
  useGetMyWealthFundsQuery,
  useInvestInWealthFundMutation,
} from "../userWealthfund/userWeathfundAPI";
import { useGetAllWealthFundsQuery } from "../wealthfund/wealthfundAdmiAPI";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

const UserWealthFund: React.FC = () => {
  const { data: allFunds, isLoading: fundsLoading } = useGetAllWealthFundsQuery();
  const { data: myInvestments, isLoading: investmentsLoading, refetch } =
    useGetMyWealthFundsQuery();
  const [investInWealthFund, { isLoading: investing }] =
    useInvestInWealthFundMutation();

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // investment modal state
  const [selectedFund, setSelectedFund] = useState<any | null>(null);
  const [amount, setAmount] = useState("");

  // merge fund info
  const investmentsWithFundInfo = useMemo(() => {
    if (!myInvestments || !allFunds) return [];
    return myInvestments.map((inv: any) => {
      const fund = allFunds.find((f: any) => f.id === inv.wealth_fund_id);
      return {
        ...inv,
        fund_name: fund?.name || `Fund #${inv.wealth_fund_id}`,
        minimum_amount: fund?.minimum_amount || 0,
        days: fund?.days || 0,
        return_rate: fund?.return_rate || 0,
      };
    });
  }, [myInvestments, allFunds]);

  // ----------------------------------------------------------------------
  // UPDATED submitInvestment — now includes minimum amount validation
  // ----------------------------------------------------------------------
  const submitInvestment = async () => {
    if (!selectedFund) return;

    const numericAmount = Number(amount);

    // Frontend validation
    if (numericAmount < selectedFund.minimum_amount) {
      setMessage({
        type: "error",
        text: `Minimum amount is KES ${selectedFund.minimum_amount}`,
      });
      return;
    }

    try {
      await investInWealthFund({
        fund_id: selectedFund.id,
        amount: numericAmount,
      }).unwrap();

      setMessage({ type: "success", text: "Investment successful!" });
      setSelectedFund(null);
      setAmount("");
      refetch();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.data?.detail || "Investment failed.",
      });
    }

    setTimeout(() => setMessage(null), 5000);
  };

  const getStatusIndicator = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <span className="inline-block w-3 h-3 mr-2 rounded-full bg-green-500"></span>;
      case "completed":
        return <span className="inline-block w-3 h-3 mr-2 rounded-full bg-blue-500"></span>;
      default:
        return <span className="inline-block w-3 h-3 mr-2 rounded-full bg-gray-400"></span>;
    }
  };

  if (fundsLoading || investmentsLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-yellow-50">
        <p className="text-yellow-700 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-yellow-50 min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
        Wealth Fund Dashboard
      </h2>

      {/* message */}
      {message && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg mb-6 text-white ${
            message.type === "success" ? "bg-yellow-600" : "bg-yellow-800"
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

      {/* Available funds */}
      <h3 className="text-2xl font-semibold mb-4 text-yellow-900">Available Wealth Funds</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {allFunds?.map((fund: any) => {
          const invested = myInvestments?.find((inv: any) => inv.wealth_fund_id === fund.id);

          return (
            <div
              key={fund.id}
              className="bg-yellow-100 rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <h4 className="text-xl font-bold mb-2 text-yellow-900">{fund.name}</h4>
                <p className="text-yellow-800 mb-1">Minimum Amount: KES {fund.minimum_amount}</p>
                <p className="text-yellow-800 mb-1">Duration: {fund.days} days</p>
                <p className="text-yellow-800 mb-3">Return Rate: {fund.return_rate}%</p>
              </div>

              <button
                onClick={() => setSelectedFund(fund)}
                disabled={!!invested}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-colors ${
                  invested
                    ? "bg-yellow-300 cursor-not-allowed text-yellow-900"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                <CurrencyDollarIcon className="h-5 w-5" />
                {invested ? "Already Invested" : "Invest"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Investments */}
      <h3 className="text-2xl font-semibold mb-4 text-yellow-900">My Investments</h3>

      {investmentsWithFundInfo.length === 0 ? (
        <p className="text-yellow-800 mb-6">You have no active investments.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-yellow-300 rounded-lg">
            <thead className="bg-yellow-200">
              <tr>
                <th className="border p-3 text-left">Fund Name</th>
                <th className="border p-3 text-right">Amount Invested</th>
                <th className="border p-3 text-right">Start Date</th>
                <th className="border p-3 text-right">End Date</th>
                <th className="border p-3 text-right">Total Return</th>
                <th className="border p-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {investmentsWithFundInfo.map((inv: any) => (
                <tr key={inv.id} className="hover:bg-yellow-100">
                  <td className="border p-3 text-yellow-900">{inv.fund_name}</td>
                  <td className="border p-3 text-right text-yellow-900">{inv.amount_invested}</td>
                  <td className="border p-3 text-right text-yellow-900">{inv.start_date}</td>
                  <td className="border p-3 text-right text-yellow-900">{inv.end_date}</td>
                  <td className="border p-3 text-right font-semibold text-yellow-800 bg-yellow-200 rounded-lg">
                    {inv.total_expected_return?.toFixed(2)}
                  </td>
                  <td className="border p-3 text-center capitalize text-yellow-900 flex items-center justify-center">
                    {getStatusIndicator(inv.status)}
                    {inv.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {selectedFund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4 text-yellow-900">
              Invest in {selectedFund.name}
            </h3>

            <p className="text-yellow-800 mb-2">
              Minimum Amount:{" "}
              <span className="font-semibold">KES {selectedFund.minimum_amount}</span>
            </p>

            <input
              type="number"
              min={selectedFund.minimum_amount}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full p-2 border rounded-lg mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedFund(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={submitInvestment}
                disabled={investing}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
              >
                {investing ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserWealthFund;
