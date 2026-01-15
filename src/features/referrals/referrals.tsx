


// import React, { useState, useMemo } from "react";
// import { ClipboardCopy } from "lucide-react";
// import { useGetUserTeamQuery } from "./referralsAPI";

// interface ReferredUser {
//   id: number;
//   username: string;
//   phone_number?: string;
//   invite_code?: string;
// }

// interface Referral {
//   id: number;
//   level: string;
//   is_active: boolean;
//   bonus_amount?: number | null;
//   referred: ReferredUser;
//   created_at: string;
// }

// const levelColors: Record<string, string> = {
//   A: "bg-yellow-500/20 text-yellow-500",
//   B: "bg-yellow-600/20 text-yellow-600",
//   C: "bg-yellow-700/20 text-yellow-700",
// };

// const Referrals: React.FC = () => {
//   const { data, isLoading, isError } = useGetUserTeamQuery();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const referrals = (data ?? []) as unknown as Referral[];
//   const [copied, setCopied] = useState(false);

//   const sortedReferrals = useMemo(() => {
//     return [...referrals].sort((a, b) => {
//       if (a.is_active && !b.is_active) return -1;
//       if (!a.is_active && b.is_active) return 1;
//       return (
//         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       );
//     });
//   }, [referrals]);

//   const activeCount = useMemo(
//     () => referrals.filter((r) => r.is_active).length,
//     [referrals]
//   );
//   const inactiveCount = useMemo(
//     () => referrals.filter((r) => !r.is_active).length,
//     [referrals]
//   );

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
//       </div>
//     );
//   }

//   if (isError || referrals.length === 0) {
//     return (
//       <div className="p-6 bg-yellow-50 min-h-screen flex flex-col justify-center items-center">
//         <p className="text-yellow-800/70 text-center mb-4">
//           No team members found.
//         </p>
//         <p className="text-yellow-800/50 text-sm text-center max-w-md">
//           Invite friends to join your team and start earning rewards together.
//         </p>
//       </div>
//     );
//   }

//   const inviteCode = referrals[0]?.referred.invite_code ?? "";
//   const inviteUrl = `${window.location.origin}/register?invite_code=${inviteCode}`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(inviteUrl);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 3000);
//   };

//   return (
//     <div className="p-4 md:p-6 bg-yellow-50 min-h-screen">
//       {/* Invite Section */}
//       <div className="mb-6 p-4 md:p-5 bg-yellow-100 rounded-xl border border-yellow-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//         <div className="flex-1">
//           <h2 className="text-xl md:text-2xl font-bold text-yellow-900">
//             Your Invite Link
//           </h2>
//           <p className="text-sm text-yellow-800 mt-1">
//             Share this link to invite friends and earn rewards
//           </p>
//         </div>
//         <div className="flex flex-1 sm:flex-none items-center space-x-2 bg-yellow-50 p-2 rounded-lg border border-yellow-200 overflow-x-auto w-full sm:w-auto">
//           <span className="text-sm font-semibold text-yellow-900 whitespace-nowrap">
//             {inviteUrl}
//           </span>
//           <button
//             onClick={handleCopy}
//             className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700"
//           >
//             <ClipboardCopy size={16} />
//             {copied ? "Copied!" : "Copy URL"}
//           </button>
//         </div>
//       </div>

//       {/* Team Summary - Small Boxes */}
//       <div className="mb-6 flex flex-wrap gap-3">
//         <div className="flex-1 min-w-[120px] bg-yellow-50 p-2 rounded-lg border border-yellow-200 flex flex-col items-center justify-center">
//           <p className="text-xs text-yellow-800 mb-1">Total Members</p>
//           <p className="text-lg font-bold text-yellow-900">
//             {referrals.length}
//           </p>
//         </div>
//         <div className="flex-1 min-w-[120px] bg-green-50 p-2 rounded-lg border border-green-200 flex flex-col items-center justify-center">
//           <p className="text-xs text-green-800 mb-1">Active Members</p>
//           <p className="text-lg font-bold text-green-900">{activeCount}</p>
//         </div>
//         <div className="flex-1 min-w-[120px] bg-red-50 p-2 rounded-lg border border-red-200 flex flex-col items-center justify-center">
//           <p className="text-xs text-red-800 mb-1">Inactive Members</p>
//           <p className="text-lg font-bold text-red-900">{inactiveCount}</p>
//         </div>
//       </div>

//       {/* Team Members Header */}
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-2xl md:text-3xl font-bold text-yellow-900">
//           My Team ({referrals.length})
//         </h2>
//         <div className="flex items-center gap-2 text-sm text-yellow-800">
//           <span className="flex items-center gap-1">
//             <span className="h-2 w-2 rounded-full bg-green-500"></span>Active:{" "}
//             {activeCount}
//           </span>
//           <span className="flex items-center gap-1">
//             <span className="h-2 w-2 rounded-full bg-red-500"></span>Inactive:{" "}
//             {inactiveCount}
//           </span>
//         </div>
//       </div>

//       {/* Team Members Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         {sortedReferrals.map((referral) => (
//           <div
//             key={referral.id}
//             className={`bg-yellow-100 rounded-xl border border-yellow-200 p-4 md:p-5 shadow hover:shadow-lg transition-all duration-200 flex flex-col justify-between ${
//               referral.is_active
//                 ? "ring-1 ring-green-200"
//                 : "ring-1 ring-red-200/50"
//             }`}
//           >
//             {/* Header */}
//             <div className="flex items-center space-x-3 md:space-x-4 mb-3">
//               <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-yellow-500/20 text-yellow-900 font-bold text-lg md:text-xl">
//                 {referral.referred.username.charAt(0).toUpperCase()}
//               </div>
//               <div className="flex flex-col">
//                 <h3 className="font-semibold text-yellow-900 text-base md:text-lg">
//                   {referral.referred.username}
//                 </h3>
//                 <p className="text-xs md:text-sm text-yellow-800">
//                   {referral.referred.phone_number || "No phone number"}
//                 </p>
//               </div>
//             </div>

//             {/* Level & Status */}
//             <div className="flex items-center justify-between mb-2">
//               <span
//                 className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold ${
//                   levelColors[referral.level] || "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 Level {referral.level}
//               </span>
//               <div className="flex items-center gap-2">
//                 <span
//                   className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-full ${
//                     referral.is_active ? "bg-green-500" : "bg-red-500"
//                   }`}
//                 ></span>
//                 <span className="text-xs md:text-sm text-yellow-900 font-medium">
//                   {referral.is_active ? "Active" : "Inactive"}
//                 </span>
//               </div>
//             </div>

//             {/* Bonus & Join Date */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-yellow-800 mt-2 gap-2">
//               <p>
//                 Bonus:{" "}
//                 <span className="text-green-600 font-semibold">
//                   KES {referral.bonus_amount?.toLocaleString() ?? "0"}
//                 </span>
//               </p>
//               <p className="text-xs text-yellow-800/50">
//                 Joined: {new Date(referral.created_at).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Referrals;





import React, { useState, useMemo } from 'react';
import { ClipboardCopy } from 'lucide-react';
import { useGetUserTeamQuery } from './referralsAPI';
import { useGetUserProfileQuery } from '../profile/profileAPI'; // Import the user profile hook

interface ReferredUser {
  id: number;
  username: string;
  phone_number?: string;
  invite_code?: string;
}

interface Referral {
  id: number;
  level: string;
  is_active: boolean;
  bonus_amount?: number | null;
  referred: ReferredUser;
  created_at: string;
}

const levelColors: Record<string, string> = {
  A: 'bg-yellow-500/20 text-yellow-500',
  B: 'bg-yellow-600/20 text-yellow-600',
  C: 'bg-yellow-700/20 text-yellow-700',
};

const Referrals: React.FC = () => {
  const {
    data: teamData,
    isLoading: isTeamLoading,
  } = useGetUserTeamQuery();
  const { data: userProfile, isLoading: isProfileLoading } =
    useGetUserProfileQuery();
  const [copied, setCopied] = useState(false);

  // Combine loading states
  const isLoading = isTeamLoading || isProfileLoading;

  // Get referrals from team data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const referrals = (teamData ?? []) as unknown as Referral[];

  // Get the user's invite code from their profile
  const userInviteCode = userProfile?.invite_code || '';

  // Use the user's invite code for the invite URL
  const inviteUrl = `${window.location.origin}/register?invite_code=${userInviteCode}`;

  const sortedReferrals = useMemo(() => {
    return [...referrals].sort((a, b) => {
      if (a.is_active && !b.is_active) return -1;
      if (!a.is_active && b.is_active) return 1;
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }, [referrals]);

  const activeCount = useMemo(
    () => referrals.filter((r) => r.is_active).length,
    [referrals],
  );
  const inactiveCount = useMemo(
    () => referrals.filter((r) => !r.is_active).length,
    [referrals],
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-yellow-50 min-h-scene">
      {/* Invite Section - Always visible */}
      <div className="mb-6 p-4 md:p-5 bg-yellow-100 rounded-xl border border-yellow-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-900">
            Your Invite Link
          </h2>
          <p className="text-sm text-yellow-800 mt-1">
            Share this link to invite friends and earn rewards
          </p>
        </div>
        <div className="flex flex-1 sm:flex-none items-center space-x-2 bg-yellow-50 p-2 rounded-lg border border-yellow-200 overflow-x-auto w-full sm:w-auto">
          <span className="text-sm font-semibold text-yellow-900 whitespace-nowrap">
            {inviteUrl}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700"
          >
            <ClipboardCopy size={16} />
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
        </div>
      </div>

      {/* Only show "No team members found" message when there are no team members */}
      {referrals.length === 0 ? (
        <div className="p-6 bg-yellow-50 flex flex-col justify-center items-center">
          <p className="text-yellow-800/70 text-center mb-4">
            No team members found.
          </p>
          <p className="text-yellow-800/50 text-sm text-center max-w-md">
            Invite friends to join your team and start earning rewards together.
          </p>
        </div>
      ) : (
        <>
          {/* Team Summary - Small Boxes */}
          <div className="mb-6 flex flex-wrap gap-3">
            <div className="flex-1 min-w-[120px] bg-yellow-50 p-2 rounded-lg border border-yellow-200 flex flex-col items-center justify-center">
              <p className="text-xs text-yellow-800 mb-1">Total Members</p>
              <p className="text-lg font-bold text-yellow-900">
                {referrals.length}
              </p>
            </div>
            <div className="flex-1 min-w-[120px] bg-green-50 p-2 rounded-lg border border-green-200 flex flex-col items-center justify-center">
              <p className="text-xs text-green-800 mb-1">Active Members</p>
              <p className="text-lg font-bold text-green-900">{activeCount}</p>
            </div>
            <div className="flex-1 min-w-[120px] bg-red-50 p-2 rounded-lg border border-red-200 flex flex-col items-center justify-center">
              <p className="text-xs text-red-800 mb-1">Inactive Members</p>
              <p className="text-lg font-bold text-red-900">{inactiveCount}</p>
            </div>
          </div>

          {/* Team Members Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-900">
              My Team ({referrals.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Active: {activeCount}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                Inactive: {inactiveCount}
              </span>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sortedReferrals.map((referral) => (
              <div
                key={referral.id}
                className={`bg-yellow-100 rounded-xl border border-yellow-200 p-4 md:p-5 shadow hover:shadow-lg transition-all duration-200 flex flex-col justify-between ${
                  referral.is_active
                    ? 'ring-1 ring-green-200'
                    : 'ring-1 ring-red-200/50'
                }`}
              >
                {/* Header */}
                <div className="flex items-center space-x-3 md:space-x-4 mb-3">
                  <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-yellow-500/20 text-yellow-900 font-bold text-lg md:text-xl">
                    {referral.referred.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-yellow-900 text-base md:text-lg">
                      {referral.referred.username}
                    </h3>
                    <p className="text-xs md:text-sm text-yellow-800">
                      {referral.referred.phone_number || 'No phone number'}
                    </p>
                  </div>
                </div>

                {/* Level & Status */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold ${
                      levelColors[referral.level] || 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    Level {referral.level}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-full ${
                        referral.is_active ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                    <span className="text-xs md:text-sm text-yellow-900 font-medium">
                      {referral.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Bonus & Join Date */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-yellow-800 mt-2 gap-2">
                  <p>
                    Bonus:{' '}
                    <span className="text-green-600 font-semibold">
                      KES {referral.bonus_amount?.toLocaleString() ?? '0'}
                    </span>
                  </p>
                  <p className="text-xs text-yellow-800/50">
                    Joined: {new Date(referral.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Referrals;
