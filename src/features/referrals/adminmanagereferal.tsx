



// import React from "react";
// import { useGetAllReferralsQuery } from "../referrals/referralsAPI";

// interface ReferredUser {
//   id: number;
//   username: string;
//   phone_number?: string;
//   invite_code?: string;
//   children?: ReferredUser[];
//   level?: string;
//   is_active?: boolean;
//   bonus_amount?: number;
//   created_at?: string;
// }

// const levelColors: Record<string, string> = {
//   A: "bg-[#5B4BFF]/20 text-[#5B4BFF]",
//   B: "bg-[#F59E0B]/20 text-[#F59E0B]",
//   C: "bg-[#EF4444]/20 text-[#EF4444]",
// };

// // Recursive component
// const ReferralCard: React.FC<{ user: ReferredUser; levelIndent?: number }> = ({
//   user,
//   levelIndent = 0,
// }) => (
//   <div className={`ml-${levelIndent * 6}`}>
//     <div className="bg-[#1E2139] rounded-xl border border-[#5B4BFF]/20 p-5 shadow hover:shadow-lg transition-all duration-200 mb-4">
//       <div className="flex items-center space-x-4 mb-2">
//         <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#3B82F6]/20 text-[#C7D2FE] font-bold text-lg">
//           {user.username.charAt(0).toUpperCase()}
//         </div>
//         <div className="flex flex-col">
//           <h3 className="font-semibold text-[#C7D2FE] text-lg">
//             {user.username}
//           </h3>
//           <p className="text-sm text-[#C7D2FE]/70">
//             {user.phone_number || "No phone number"}
//           </p>
//           {user.invite_code && (
//             <p className="text-xs text-[#C7D2FE]/50">
//               Invite Code: {user.invite_code}
//             </p>
//           )}
//           {user.level && (
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                 levelColors[user.level] || "bg-gray-200 text-gray-800"
//               }`}
//             >
//               Level {user.level}
//             </span>
//           )}
//         </div>
//       </div>

//       {user.is_active !== undefined && (
//         <div className="mt-2 flex items-center gap-2 text-sm text-[#C7D2FE]">
//           <span
//             className={`h-3 w-3 rounded-full ${
//               user.is_active ? "bg-[#10B981]" : "bg-[#EF4444]"
//             }`}
//           ></span>
//           <span>{user.is_active ? "Active" : "Inactive"}</span>
//           {user.bonus_amount !== undefined && (
//             <span className="ml-4 text-[#10B981] font-medium">
//               Bonus: {user.bonus_amount}
//             </span>
//           )}
//         </div>
//       )}

//       {user.created_at && (
//         <p className="text-xs text-[#C7D2FE]/50 mt-1">
//           Joined: {new Date(user.created_at).toLocaleDateString()}
//         </p>
//       )}
//     </div>

//     {user.children?.length ? (
//       <div className="ml-6 border-l border-[#5B4BFF]/20 pl-4">
//         {user.children.map((child) => (
//           <ReferralCard
//             key={child.id}
//             user={child}
//             levelIndent={levelIndent + 1}
//           />
//         ))}
//       </div>
//     ) : null}
//   </div>
// );

// const AdminManageReferrals: React.FC = () => {
//   const { data: referrals, isLoading, isError } = useGetAllReferralsQuery();

//   if (isLoading)
//     return (
//       <p className="text-center text-[#3B82F6] mt-16">Loading referrals...</p>
//     );
//   if (isError || !referrals || referrals.length === 0)
//     return (
//       <p className="text-center text-[#C7D2FE]/70 mt-16">No referrals found.</p>
//     );

//   return (
//     <div className="p-6 bg-[#0A0F2C] min-h-screen">
//       <h2 className="text-3xl font-bold text-[#C7D2FE] mb-8">All Referrals</h2>
//       <div className="flex flex-col gap-4">
//         {referrals.map((rootUser) => (
//           <ReferralCard key={rootUser.id} user={rootUser} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminManageReferrals;






import React from "react";
import { useGetAllReferralsQuery } from "../referrals/referralsAPI";

interface ReferredUser {
  id: number;
  username: string;
  phone_number?: string;
  invite_code?: string;
  children?: ReferredUser[];
  level?: string;
  is_active?: boolean;
  bonus_amount?: number;
  created_at?: string;
}

const levelColors: Record<string, string> = {
  A: "bg-[#5B4BFF]/20 text-[#5B4BFF]",
  B: "bg-[#F59E0B]/20 text-[#F59E0B]",
  C: "bg-[#EF4444]/20 text-[#EF4444]",
};

// Recursive component
const ReferralCard: React.FC<{ user: ReferredUser; levelIndent?: number }> = ({
  user,
  levelIndent = 0,
}) => {
  const hasChildren = user.children && user.children.length > 0;

  return (
    <div className={`ml-${levelIndent * 6} mb-4`}>
      {hasChildren ? (
        <div className="bg-[#1A1F35] border-l-4 border-[#5B4BFF] rounded-lg p-4 shadow-lg">
          {/* Parent header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#3B82F6]/20 text-[#C7D2FE] font-bold text-lg">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-[#C7D2FE] text-lg">
                  {user.username}
                </h3>
                <p className="text-sm text-[#C7D2FE]/70">
                  {user.phone_number || "No phone number"}
                </p>
              </div>
            </div>
            {user.level && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  levelColors[user.level] || "bg-gray-200 text-gray-800"
                }`}
              >
                Level {user.level}
              </span>
            )}
          </div>

          {user.is_active !== undefined && (
            <div className="mb-3 flex items-center gap-2 text-sm text-[#C7D2FE]">
              <span
                className={`h-3 w-3 rounded-full ${
                  user.is_active ? "bg-[#10B981]" : "bg-[#EF4444]"
                }`}
              ></span>
              <span>{user.is_active ? "Active" : "Inactive"}</span>
              {user.bonus_amount !== undefined && (
                <span className="ml-4 text-[#10B981] font-medium">
                  Bonus: {user.bonus_amount}
                </span>
              )}
            </div>
          )}

          {user.created_at && (
            <p className="text-xs text-[#C7D2FE]/50 mb-2">
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>
          )}

          {/* Nested children */}
          <div className="ml-6 flex flex-col gap-3">
            {user.children!.map((child) => (
              <ReferralCard
                key={child.id}
                user={child}
                levelIndent={levelIndent + 1}
              />
            ))}
          </div>
        </div>
      ) : (
        // Regular card for users without children
        <div className="bg-[#1E2139] rounded-xl border border-[#5B4BFF]/20 p-5 shadow hover:shadow-lg transition-all duration-200">
          <div className="flex items-center space-x-4 mb-2">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#3B82F6]/20 text-[#C7D2FE] font-bold text-lg">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-[#C7D2FE] text-lg">
                {user.username}
              </h3>
              <p className="text-sm text-[#C7D2FE]/70">
                {user.phone_number || "No phone number"}
              </p>
            </div>
            {user.level && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  levelColors[user.level] || "bg-gray-200 text-gray-800"
                }`}
              >
                Level {user.level}
              </span>
            )}
          </div>

          {user.is_active !== undefined && (
            <div className="mt-2 flex items-center gap-2 text-sm text-[#C7D2FE]">
              <span
                className={`h-3 w-3 rounded-full ${
                  user.is_active ? "bg-[#10B981]" : "bg-[#EF4444]"
                }`}
              ></span>
              <span>{user.is_active ? "Active" : "Inactive"}</span>
              {user.bonus_amount !== undefined && (
                <span className="ml-4 text-[#10B981] font-medium">
                  Bonus: {user.bonus_amount}
                </span>
              )}
            </div>
          )}

          {user.created_at && (
            <p className="text-xs text-[#C7D2FE]/50 mt-1">
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const AdminManageReferrals: React.FC = () => {
  const { data: referrals, isLoading, isError } = useGetAllReferralsQuery();

  if (isLoading)
    return (
      <p className="text-center text-[#3B82F6] mt-16">Loading referrals...</p>
    );
  if (isError || !referrals || referrals.length === 0)
    return (
      <p className="text-center text-[#C7D2FE]/70 mt-16">No referrals found.</p>
    );

  return (
    <div className="p-6 bg-[#0A0F2C] min-h-screen">
      <h2 className="text-3xl font-bold text-[#C7D2FE] mb-8">All Referrals</h2>
      <div className="flex flex-col gap-4">
        {referrals.map((rootUser) => (
          <ReferralCard key={rootUser.id} user={rootUser} />
        ))}
      </div>
    </div>
  );
};

export default AdminManageReferrals;
