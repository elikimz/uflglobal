import React from "react";
import { motion } from "framer-motion";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useGetAdminNetFundsQuery } from "../earnings/earningsAPI";

const AdminAnalysis: React.FC = () => {
  const { data, error, isLoading } = useGetAdminNetFundsQuery();

  // Skeleton loader for better UX
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );

  // Error component
  const ErrorDisplay = ({ message }: { message: string }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{message}</h3>
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Admin Net Funds Analysis
        </h2>
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Admin Net Funds Analysis
        </h2>
        <ErrorDisplay message="Failed to load financial data. Please try again later." />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Admin Net Funds Analysis
        </h2>
        <ErrorDisplay message="No financial data available." />
      </div>
    );
  }

  const { total_approved_deposits, total_approved_withdrawals, net_total } =
    data;

  // Format currency values
  // const formatCurrency = (value: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   }).format(value);
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <BanknotesIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">
              Financial Overview
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Admin net funds analysis and summary
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Summary Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Deposits Card */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <ArrowTrendingUpIcon className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-600">
                  Approved Deposits
                </h3>
              </div>
              <p className="text-2xl font-bold text-green-700">
                {(total_approved_deposits)}
              </p>
            </div>

            {/* Withdrawals Card */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center mb-2">
                <ArrowTrendingDownIcon className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-600">
                  Approved Withdrawals
                </h3>
              </div>
              <p className="text-2xl font-bold text-red-700">
                {(total_approved_withdrawals)}
              </p>
            </div>

            {/* Net Total Card */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <ChartBarIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-600">Net Total</h3>
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {(net_total)}
              </p>
            </div>
          </div>

          {/* Detailed Breakdown - Mobile-friendly table */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-2" />
              Financial Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-600">Total Approved Deposits</span>
                </div>
                <span className="font-medium text-green-600">
                  {(total_approved_deposits)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center">
                  <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-gray-600">
                    Total Approved Withdrawals
                  </span>
                </div>
                <span className="font-medium text-red-600">
                  {(total_approved_withdrawals)}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 font-bold">
                <div className="flex items-center">
                  <ChartBarIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-800">Net Total</span>
                </div>
                <span
                  className={net_total >= 0 ? "text-blue-600" : "text-red-600"}
                >
                  {(net_total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalysis;
