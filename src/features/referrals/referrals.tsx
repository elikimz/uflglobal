import React, { useState } from "react";
import { useGetUserTeamQuery } from "../referrals/referralsAPI";
import { ClipboardCopy } from "lucide-react";

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
  A: "bg-[#5B4BFF]/20 text-[#5B4BFF]",
  B: "bg-[#F59E0B]/20 text-[#F59E0B]",
  C: "bg-[#EF4444]/20 text-[#EF4444]",
};

const Referrals: React.FC = () => {
  const { data, isLoading, isError } = useGetUserTeamQuery();
  const referrals = (data ?? []) as unknown as Referral[];
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#3B82F6]">Loading team...</p>
      </div>
    );
  }

  if (isError || !referrals || referrals.length === 0) {
    return (
      <div className="p-6 bg-[#0A0F2C] min-h-screen flex justify-center items-center">
        <p className="text-[#C7D2FE]/70 text-center">No team members found.</p>
      </div>
    );
  }

  const inviteCode = referrals[0]?.referred.invite_code ?? "";
  const inviteUrl = `${window.location.origin}/register?invite_code=${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 bg-[#0A0F2C] min-h-screen">
      {/* Invite Section */}
      <div className="mb-6 p-4 md:p-5 bg-[#1E2139] rounded-xl border border-[#5B4BFF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#C7D2FE]">
            Your Invite Link
          </h2>
          <p className="text-sm text-[#C7D2FE]/70 mt-1">
            Share this link to invite friends and earn rewards
          </p>
        </div>
        <div className="flex flex-1 sm:flex-none items-center space-x-2 bg-[#0A0F2C]/50 p-2 rounded-lg border border-[#5B4BFF]/30 overflow-x-auto w-full sm:w-auto">
          <span className="text-sm font-semibold text-[#C7D2FE] whitespace-nowrap">
            {inviteUrl}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-sm text-[#3B82F6] hover:text-[#2563EB]"
          >
            <ClipboardCopy size={16} />
            {copied ? "Copied!" : "Copy URL"}
          </button>
        </div>
      </div>

      {/* Team Members */}
      <h2 className="text-2xl md:text-3xl font-bold text-[#C7D2FE] mb-4 md:mb-6">
        My Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {referrals.map((referral: Referral) => (
          <div
            key={referral.id}
            className="bg-[#1E2139] rounded-xl border border-[#5B4BFF]/20 p-4 md:p-5 shadow hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center space-x-3 md:space-x-4 mb-3">
              <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-[#3B82F6]/20 text-[#C7D2FE] font-bold text-lg md:text-xl">
                {referral.referred.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-[#C7D2FE] text-base md:text-lg">
                  {referral.referred.username}
                </h3>
                <p className="text-xs md:text-sm text-[#C7D2FE]/70">
                  {referral.referred.phone_number || "No phone number"}
                </p>
              </div>
            </div>

            {/* Level & Status */}
            <div className="flex items-center justify-between mb-2">
              <span
                className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold ${
                  levelColors[referral.level] || "bg-gray-200 text-gray-800"
                }`}
              >
                Level {referral.level}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-full ${
                    referral.is_active ? "bg-[#10B981]" : "bg-[#EF4444]"
                  }`}
                ></span>
                <span className="text-xs md:text-sm text-[#C7D2FE] font-medium">
                  {referral.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Bonus & Join Date */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-[#C7D2FE]/70 mt-2 gap-2">
              <p>
                Bonus:{" "}
                <span className="text-[#10B981] font-semibold">
                  {referral.bonus_amount ?? 0}
                </span>
              </p>
              <p className="text-xs text-[#C7D2FE]/50">
                Joined: {new Date(referral.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Referrals;
