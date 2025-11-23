


// import React from "react";
// import { motion } from "framer-motion";
// import { useGetAllCompanyNewsQuery } from "../news/newsAPI";
// import { NewspaperIcon } from "@heroicons/react/24/solid";

// const UserNews: React.FC = () => {
//   const { data: news, isLoading, isError } = useGetAllCompanyNewsQuery();

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen px-4 py-6 text-yellow-900 bg-yellow-50"
//     >
//       {/* === HEADER === */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-yellow-800">
//           <NewspaperIcon className="h-8 w-8 text-yellow-600" />
//           Company News & Updates
//         </h1>
//         <p className="text-yellow-700 text-sm">
//           Stay updated with the latest announcements
//         </p>
//       </div>

//       {/* === LOADING === */}
//       {isLoading && (
//         <p className="text-center text-yellow-700 animate-pulse">
//           Loading news...
//         </p>
//       )}

//       {/* === ERROR === */}
//       {isError && (
//         <p className="text-center text-red-600">
//           Failed to load news. Please try again later.
//         </p>
//       )}

//       {/* === NEWS LIST === */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
//         {news?.length === 0 && (
//           <p className="text-center text-yellow-700 col-span-full">
//             No news available at the moment.
//           </p>
//         )}
//         {news?.map((item: any, index: number) => (
//           <motion.div
//             key={item.id}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: index * 0.05 }}
//             className="bg-yellow-100 backdrop-blur-xl border border-yellow-200 rounded-2xl p-6 shadow-lg hover:ring-2 hover:ring-yellow-400 transition-all"
//           >
//             {/* Title */}
//             <h2 className="text-xl font-bold text-yellow-800 mb-2">
//               {item.title}
//             </h2>

//             {/* Content */}
//             <p className="text-yellow-700 text-sm leading-relaxed">
//               {item.content}
//             </p>

//             {/* Date */}
//             <p className="text-xs text-yellow-600 mt-4 text-right">
//               {new Date(item.created_at).toLocaleDateString()}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default UserNews;


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
      className="min-h-screen px-4 py-6 text-yellow-900 bg-yellow-50"
    >
      {/* === HEADER === */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-yellow-800">
          <NewspaperIcon className="h-8 w-8 text-yellow-600" />
          Company News & Updates
        </h1>
        <p className="text-yellow-700 text-sm">
          Stay updated with the latest announcements
        </p>
      </div>

      {/* === LOADING === */}
      {isLoading && (
        <p className="text-center text-yellow-700 animate-pulse">
          Loading news...
        </p>
      )}

      {/* === ERROR === */}
      {isError && (
        <p className="text-center text-red-600">
          Failed to load news. Please try again later.
        </p>
      )}

      {/* === NEWS LIST === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {news?.length === 0 && (
          <p className="text-center text-yellow-700 col-span-full">
            No news available at the moment.
          </p>
        )}

        {news?.map((item: any, index: number) => (
          <motion.div
            key={item.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-yellow-100 backdrop-blur-xl border border-yellow-200 rounded-2xl p-6 shadow-lg hover:ring-2 hover:ring-yellow-400 transition-all"
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-yellow-800 mb-2">
              {item.title}
            </h2>

            {/* Image (if exists) */}
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            {/* Content */}
            <p className="text-yellow-700 text-sm leading-relaxed">
              {item.content}
            </p>

            {/* Date */}
            <p className="text-xs text-yellow-600 mt-4 text-right">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserNews;
