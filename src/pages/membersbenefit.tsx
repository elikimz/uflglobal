

// const UFLDetails = () => {
//   // Complete level data from the image
//   const levels = [
//     {
//       level: 'Temporary Workers',
//       workDeposit: 0,
//       tasks: 5,
//       missionIncome: 16,
//       dailyIncome: 80,
//       monthlyIncome: 0,
//       annualIncome: 0,
//     },
//     {
//       level: 'LV1',
//       workDeposit: 2400,
//       tasks: 5,
//       missionIncome: 16,
//       dailyIncome: 80,
//       monthlyIncome: 2400,
//       annualIncome: 29200,
//     },
//     {
//       level: 'LV2',
//       workDeposit: 8100,
//       tasks: 10,
//       missionIncome: 25,
//       dailyIncome: 250,
//       monthlyIncome: 7500,
//       annualIncome: 91250,
//     },
//     {
//       level: 'LV3',
//       workDeposit: 22000,
//       tasks: 20,
//       missionIncome: 40,
//       dailyIncome: 800,
//       monthlyIncome: 24000,
//       annualIncome: 292000,
//     },
//     {
//       level: 'LV4',
//       workDeposit: 61000,
//       tasks: 40,
//       missionIncome: 68,
//       dailyIncome: 2700,
//       monthlyIncome: 81000,
//       annualIncome: 9855000,
//     },
//     {
//       level: 'LV5',
//       workDeposit: 153000,
//       tasks: 60,
//       missionIncome: 117,
//       dailyIncome: 7200,
//       monthlyIncome: 210000,
//       annualIncome: 2555000,
//     },
//     {
//       level: 'LV6',
//       workDeposit: 380000,
//       tasks: 100,
//       missionIncome: 150,
//       dailyIncome: 15000,
//       monthlyIncome: 150000,
//       annualIncome: 5475000,
//     },
//     {
//       level: 'LV7',
//       workDeposit: 860000,
//       tasks: 160,
//       missionIncome: 219,
//       dailyIncome: 32850,
//       monthlyIncome: 1050000,
//       annualIncome: 12775000,
//     },
//     {
//       level: 'LV8',
//       workDeposit: 1720000,
//       tasks: 240,
//       missionIncome: 417,
//       dailyIncome: 100000,
//       monthlyIncome: 3000000,
//       annualIncome: 36500000,
//     },
//     {
//       level: 'LV9',
//       workDeposit: 3600000,
//       tasks: 400,
//       missionIncome: 815,
//       dailyIncome: 140000,
//       monthlyIncome: 4200000,
//       annualIncome: 511000000,
//     },
//   ];

//   // Complete invitation rewards data from the image
//   const invitationRewards = [
//     {
//       level: 'LV1',
//       levelA: 288,
//       levelB: 72,
//       levelC: 24,
//     },
//     {
//       level: 'LV2',
//       levelA: 972,
//       levelB: 243,
//       levelC: 81,
//     },
//     {
//       level: 'LV3',
//       levelA: 2640,
//       levelB: 660,
//       levelC: 220,
//     },
//     {
//       level: 'LV4',
//       levelA: 7320,
//       levelB: 1830,
//       levelC: 610,
//     },
//     {
//       level: 'LV5',
//       levelA: 18360,
//       levelB: 4590,
//       levelC: 1530,
//     },
//     {
//       level: 'LV6',
//       levelA: 45600,
//       levelB: 11400,
//       levelC: 3800,
//     },
//     {
//       level: 'LV7',
//       levelA: 103200,
//       levelB: 25800,
//       levelC: 8600,
//     },
//     {
//       level: 'LV8',
//       levelA: 206400,
//       levelB: 51600,
//       levelC: 17200,
//     },
//     {
//       level: 'LV9',
//       levelA: 4320000,
//       levelB: 1080000,
//       levelC: 360000,
//     },
//   ];

//   return (
//     <div className="min-h-scene bg-gradient-to-br from-[#0077B6] to-[#00B4D8] p-4 md:p-8">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="flex justify-center items-center mb-4">
//           <div className="bg-yellow-400 text-white font-bold p-4 rounded-l-lg">
//             UFL
//           </div>
//           <div className="bg-white text-[#0077B6] font-bold p-4 rounded-r-lg text-4xl">
//             UFL
//           </div>
//         </div>
//         <h1 className="text-3xl font-bold text-white mb-2">
//            UFL Level and Invitation Reward Details
//         </h1>
//         <p className="text-white text-sm">
          
//         </p>
//       </div>

//       {/* Level Details Section */}
//       <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//         <h2 className="text-2xl font-bold text-[#0077B6] mb-4">
//           Level and Income Details
//         </h2>
//         <p className="text-[#005F73] mb-6">
//           Only 3 levels are open: Temporary Workers, LV1, and LV2. Temporary
//           Workers can join without any work deposit and complete a small number
//           of tasks, making it ideal for learning the system. LV1 requires a
//           basic deposit while keeping tasks manageable for steady participation.
//           LV2 involves a higher deposit and more tasks, suitable for users who
//           are ready for increased activity and commitment.
//         </p>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-[#E6F7FF] rounded-lg overflow-hidden">
//             <thead className="bg-[#0077B6] text-white">
//               <tr>
//                 <th className="py-3 px-4 text-left">Job grade</th>
//                 <th className="py-3 px-4 text-left">Work deposit (KSh)</th>
//                 <th className="py-3 px-4 text-left">Number of tasks</th>
//                 <th className="py-3 px-4 text-left">Mission income (KSh)</th>
//                 <th className="py-3 px-4 text-left">
//                   Mission day income (KSh)
//                 </th>
//                 <th className="py-3 px-4 text-left">
//                   Task monthly income (KSh)
//                 </th>
//                 <th className="py-3 px-4 text-left">
//                   Mission annual income (KSh)
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {levels.map((level, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? 'bg-white' : 'bg-[#E6F7FF]'}
//                 >
//                   <td className="py-3 px-4 text-[#005F73] font-medium">
//                     {level.level}
//                   </td>
//                   <td className="py-3 px-4 text-[#005F73]">
//                     {level.workDeposit.toLocaleString()}
//                   </td>
//                   <td className="py-3 px-4 text-[#005F73]">{level.tasks}</td>
//                   <td className="py-3 px-4 text-[#005F73]">
//                     {level.missionIncome}
//                   </td>
//                   <td className="py-3 px-4 text-[#005F73]">
//                     {level.dailyIncome.toLocaleString()}
//                   </td>
//                   <td className="py-3 px-4 text-[#005F73]">
//                     {level.monthlyIncome.toLocaleString()}
//                   </td>
//                   <td className="py-3 px-4 text-[#005F73]">
//                     {level.annualIncome.toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Invitation Rewards Section */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-[#0077B6] mb-4">
//           Invitation Reward Details
//         </h2>
//         <p className="text-[#005F73] mb-6">
//           Invitation rewards up to LV3 follow a three-level percentage
//           structure. You earn 12% from your direct invite (Level A), 3% from the
//           second-level invite (Level B), and 1% from the third-level invite
//           (Level C). This same 12%–3%–1% reward system applies consistently from
//           LV1 to LV3, promoting network growth and teamwork.
//         </p>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-[#E6F7FF] rounded-lg overflow-hidden">
//             <thead className="bg-[#0077B6] text-white">
//               <tr>
//                 <th className="py-3 px-4 text-left">Level</th>
//                 <th className="py-3 px-4 text-left">
//                   Invite subordinates level bonus percentage
//                 </th>
//                 <th className="py-3 px-4 text-left">
//                   Invitation Level Award (A) 12% (KSh)
//                 </th>
//                 <th className="py-3 px-4 text-left">
//                   Invitation Level Award (B) 3% (KSh)
//                 </th>
//                 <th className="py-3 px-4 text-left">
//                   Invitation Level Award (C) 1% (KSh)
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {invitationRewards.map((reward, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? 'bg-white' : 'bg-[#E6F7FF]'}
//                 >
//                   <td className="py-3 px-4 text-[#005F73] font-medium">
//                     {reward.level}
//                   </td>
//                   <td className="py-3 px-4 text-[#005F73]">12%-3%-1%</td>
//                   <td className="py-3 px-4 text-[#005F73]">
//                     {reward.levelA.toLocaleString()}
//                   </td>
//                   <td className="py-3 px-4 text-[#005F73]">
//                     {reward.levelB.toLocaleString()}
//                   </td>
//                   <td className="py-3 px-4 text-[#005F73]">
//                     {reward.levelC.toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UFLDetails;



const UFLDetails = () => {
  // Complete level data from the image
  const levels = [
    {
      level: 'Temporary Workers',
      workDeposit: 0,
      tasks: 5,
      missionIncome: 16,
      dailyIncome: 80,
      monthlyIncome: 0,
      annualIncome: 0,
    },
    {
      level: 'LV1',
      workDeposit: 2400,
      tasks: 5,
      missionIncome: 16,
      dailyIncome: 80,
      monthlyIncome: 2400,
      annualIncome: 29200,
    },
    {
      level: 'LV2',
      workDeposit: 8100,
      tasks: 10,
      missionIncome: 25,
      dailyIncome: 250,
      monthlyIncome: 7500,
      annualIncome: 91250,
    },
    {
      level: 'LV3',
      workDeposit: 22000,
      tasks: 20,
      missionIncome: 40,
      dailyIncome: 800,
      monthlyIncome: 24000,
      annualIncome: 292000,
    },
    {
      level: 'LV4',
      workDeposit: 61000,
      tasks: 40,
      missionIncome: 68,
      dailyIncome: 2700,
      monthlyIncome: 81000,
      annualIncome: 9855000,
    },
    {
      level: 'LV5',
      workDeposit: 153000,
      tasks: 60,
      missionIncome: 117,
      dailyIncome: 7200,
      monthlyIncome: 210000,
      annualIncome: 2555000,
    },
    {
      level: 'LV6',
      workDeposit: 380000,
      tasks: 100,
      missionIncome: 150,
      dailyIncome: 15000,
      monthlyIncome: 150000,
      annualIncome: 5475000,
    },
    {
      level: 'LV7',
      workDeposit: 860000,
      tasks: 160,
      missionIncome: 219,
      dailyIncome: 32850,
      monthlyIncome: 1050000,
      annualIncome: 12775000,
    },
    {
      level: 'LV8',
      workDeposit: 1720000,
      tasks: 240,
      missionIncome: 417,
      dailyIncome: 100000,
      monthlyIncome: 3000000,
      annualIncome: 36500000,
    },
    {
      level: 'LV9',
      workDeposit: 3600000,
      tasks: 400,
      missionIncome: 815,
      dailyIncome: 140000,
      monthlyIncome: 4200000,
      annualIncome: 511000000,
    },
  ];

  // Complete invitation rewards data from the image
  const invitationRewards = [
    {
      level: 'LV1',
      levelA: 288,
      levelB: 72,
      levelC: 24,
    },
    {
      level: 'LV2',
      levelA: 972,
      levelB: 243,
      levelC: 81,
    },
    {
      level: 'LV3',
      levelA: 2640,
      levelB: 660,
      levelC: 220,
    },
    {
      level: 'LV4',
      levelA: 7320,
      levelB: 1830,
      levelC: 610,
    },
    {
      level: 'LV5',
      levelA: 18360,
      levelB: 4590,
      levelC: 1530,
    },
    {
      level: 'LV6',
      levelA: 45600,
      levelB: 11400,
      levelC: 3800,
    },
    {
      level: 'LV7',
      levelA: 103200,
      levelB: 25800,
      levelC: 8600,
    },
    {
      level: 'LV8',
      levelA: 206400,
      levelB: 51600,
      levelC: 17200,
    },
    {
      level: 'LV9',
      levelA: 4320000,
      levelB: 1080000,
      levelC: 360000,
    },
  ];

  // Task Management Bonus data
  const taskManagementBonus = [
    { level: 'LV1', managerA: 5, managerB: 2.5, managerC: 1.25 },
    { level: 'LV2', managerA: 10, managerB: 5, managerC: 2.5 },
    { level: 'LV3', managerA: 20, managerB: 10, managerC: 5 },
    { level: 'LV4', managerA: 40, managerB: 20, managerC: 10 },
    { level: 'LV5', managerA: 60, managerB: 30, managerC: 15 },
    { level: 'LV6', managerA: 100, managerB: 50, managerC: 25 },
    { level: 'LV7', managerA: 180, managerB: 80, managerC: 40 },
    { level: 'LV8', managerA: 240, managerB: 120, managerC: 60 },
    { level: 'LV9', managerA: 400, managerB: 200, managerC: 100 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0077B6] to-[#00B4D8] p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-yellow-400 text-white font-bold p-4 rounded-l-lg">
            UFL
          </div>
          <div className="bg-white text-[#0077B6] font-bold p-4 rounded-r-lg text-4xl">
            UFL
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          UFL Level and Invitation Reward Details
        </h1>
        <p className="text-white text-sm"></p>
      </div>

      {/* Level Details Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#0077B6] mb-4">
          Level and Income Details
        </h2>
        <p className="text-[#005F73] mb-6">
          Only 3 levels are open: Temporary Workers, LV1, and LV2. Temporary
          Workers can join without any work deposit and complete a small number
          of tasks, making it ideal for learning the system. LV1 requires a
          basic deposit while keeping tasks manageable for steady participation.
          LV2 involves a higher deposit and more tasks, suitable for users who
          are ready for increased activity and commitment.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#E6F7FF] rounded-lg overflow-hidden">
            <thead className="bg-[#0077B6] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Job grade</th>
                <th className="py-3 px-4 text-left">Work deposit (KSh)</th>
                <th className="py-3 px-4 text-left">Number of tasks</th>
                <th className="py-3 px-4 text-left">Mission income (KSh)</th>
                <th className="py-3 px-4 text-left">
                  Mission day income (KSh)
                </th>
                <th className="py-3 px-4 text-left">
                  Task monthly income (KSh)
                </th>
                <th className="py-3 px-4 text-left">
                  Mission annual income (KSh)
                </th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#E6F7FF]'}
                >
                  <td className="py-3 px-4 text-[#005F73] font-medium">
                    {level.level}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">
                    {level.workDeposit.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">{level.tasks}</td>
                  <td className="py-3 px-4 text-[#005F73]">
                    {level.missionIncome}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">
                    {level.dailyIncome.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">
                    {level.monthlyIncome.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">
                    {level.annualIncome.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invitation Rewards Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#0077B6] mb-4">
          Invitation Reward Details
        </h2>
        <p className="text-[#005F73] mb-6">
          Invitation rewards up to LV3 follow a three-level percentage
          structure. You earn 12% from your direct invite (Level A), 3% from the
          second-level invite (Level B), and 1% from the third-level invite
          (Level C). This same 12%–3%–1% reward system applies consistently from
          LV1 to LV3, promoting network growth and teamwork.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#E6F7FF] rounded-lg overflow-hidden">
            <thead className="bg-[#0077B6] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Level</th>
                <th className="py-3 px-4 text-left">
                  Invite subordinates level bonus percentage
                </th>
                <th className="py-3 px-4 text-left">
                  Invitation Level Award (A) 12% (KSh)
                </th>
                <th className="py-3 px-4 text-left">
                  Invitation Level Award (B) 3% (KSh)
                </th>
                <th className="py-3 px-4 text-left">
                  Invitation Level Award (C) 1% (KSh)
                </th>
              </tr>
            </thead>
            <tbody>
              {invitationRewards.map((reward, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#E6F7FF]'}
                >
                  <td className="py-3 px-4 text-[#005F73] font-medium">
                    {reward.level}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">12%-3%-1%</td>
                  <td className="py-3 px-4 text-[#005F73]">
                    {reward.levelA.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">
                    {reward.levelB.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">
                    {reward.levelC.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Management Bonus Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#0077B6] mb-4">
          Task Management Bonus
        </h2>
        <p className="text-[#005F73] mb-6">
          For every task completed by a Level A subordinate, you earn 1 KES per
          task. For tasks completed by a Level B subordinate, you receive 0.5
          KES per task, while tasks done by a Level C subordinate earn you 0.25
          KES per task. As you progress from Level 1 to Level 3, the number of
          tasks and active subordinates increases, allowing you to earn higher
          total rebates through consistent task completion by your team.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#E6F7FF] rounded-lg overflow-hidden">
            <thead className="bg-[#0077B6] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Level</th>
                <th className="py-3 px-4 text-left">Team manager A</th>
                <th className="py-3 px-4 text-left">Team manager B</th>
                <th className="py-3 px-4 text-left">Team manager C</th>
              </tr>
            </thead>
            <tbody>
              {taskManagementBonus.map((bonus, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#E6F7FF]'}
                >
                  <td className="py-3 px-4 text-[#005F73] font-medium">
                    {bonus.level}
                  </td>
                  <td className="py-3 px-4 text-[#005F73]">{bonus.managerA}</td>
                  <td className="py-3 px-4 text-[#005F73]">{bonus.managerB}</td>
                  <td className="py-3 px-4 text-[#005F73]">{bonus.managerC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UFLDetails;
