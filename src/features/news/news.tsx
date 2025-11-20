import React from "react";
import { motion } from "framer-motion";
import { useGetAllCompanyNewsQuery } from "../news/newsAPI";
import { NewspaperIcon } from "@heroicons/react/24/solid";

const UserNews: React.FC = () => {
  const { data: news, isLoading, isError } = useGetAllCompanyNewsQuery();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
    >
      {/* === HEADER === */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
          <NewspaperIcon className="h-8 w-8 text-indigo-300" />
          Company News & Updates
        </h1>
        <p className="text-indigo-200 text-sm">
          Stay updated with the latest announcements
        </p>
      </div>

      {/* === LOADING === */}
      {isLoading && (
        <p className="text-center text-indigo-300 animate-pulse">
          Loading news...
        </p>
      )}

      {/* === ERROR === */}
      {isError && (
        <p className="text-center text-red-400">
          Failed to load news. Please try again later.
        </p>
      )}

      {/* === NEWS LIST === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {news?.length === 0 && (
          <p className="text-center text-indigo-300 col-span-full">
            No news available at the moment.
          </p>
        )}

        {news?.map((item: any, index: number) => (
          <motion.div
            key={item.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:ring-2 hover:ring-indigo-400 transition-all"
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-indigo-300 mb-2">
              {item.title}
            </h2>

            {/* Content */}
            <p className="text-indigo-100 text-sm leading-relaxed">
              {item.content}
            </p>

            {/* Date */}
            <p className="text-xs text-indigo-400 mt-4 text-right">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserNews;
