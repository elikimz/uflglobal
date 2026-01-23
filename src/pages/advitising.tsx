import React from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  ClockIcon,
  BuildingOffice2Icon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";


const AdvertisingPosition: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-50 rounded-full">
              <BuildingOffice2Icon className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Upcoming Career Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            New positions opening soon for professional growth
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="p-8">
            {/* Main Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BriefcaseIcon className="h-6 w-6 text-indigo-600 mr-2" />
                Future Job Openings
              </h2>
              <div className="prose prose-indigo max-w-none space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  This position will be opened in the near future to allow
                  employees and interested applicants to apply for various
                  opportunities, including monthly salary, offline meetings, and
                  office management roles.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Those who meet the minimum qualifications will be able to
                  submit their applications once the positions become available.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-indigo-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <DocumentCheckIcon className="h-6 w-6 text-indigo-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Application Process
                  </h3>
                </div>
                <p className="text-gray-600">
                  A streamlined application process will be available through
                  our platform when positions open.
                </p>
              </div>

              <div className="bg-indigo-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <BriefcaseIcon className="h-6 w-6 text-indigo-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Career Opportunities
                  </h3>
                </div>
                <p className="text-gray-600">
                  Multiple roles available including monthly salary positions,
                  offline meeting coordination, and office management.
                </p>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-start">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <ClockIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Opening Soon
                  </h3>
                  <p className="text-gray-600">
                    We will announce when applications are open. Please check
                    back regularly for updates on how to apply for these
                    exciting new positions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvertisingPosition;
