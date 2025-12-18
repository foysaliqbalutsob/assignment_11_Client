// import React, { useEffect, useState } from "react";
// import useAuth from "../../Hooks/useauth";
// import useAxios from "../../Hooks/useAxios";

// const MyTeam = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxios();

//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [employees, setEmployees] = useState([]);

//   // Load companies
//   useEffect(() => {
//     if (!user?.email) return;

//     axiosSecure
//       .get(`/employee/companies/${user.email}`)
//       .then((res) => {
//         setCompanies(res.data);
//         console.log('companies')
//         if (res.data.length) {
//           setSelectedCompany(res.data[0].companyName);
//         }
//       });
//   }, [user?.email]);
//   console.log(companies);
//   console.log(selectedCompany)

 

  

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">My Team</h2>

//       {/* Company Dropdown */}
//       <select
//         className="select select-bordered mb-6 max-w-xs"
//         value={selectedCompany}
//         onChange={(e) => setSelectedCompany(e.target.value)}
//       >
//         {companies.map((company) => (
//           <option
//             key={company.companyName}
//             value={company.companyName}
//           >
//             {company.companyName}
//           </option>
//         ))}
//       </select>

//       {/* Employee Cards */}
//       <div className="grid md:grid-cols-3 gap-6 mb-10">
//         {employees.map((emp) => (
//           <div
//             key={emp.email}
//             className="card bg-base-100 shadow-md"
//           >
//             <div className="card-body items-center text-center">
//               <img
//                 src={emp.photo || "/avatar.png"}
//                 className="w-16 h-16 rounded-full mb-2"
//               />
//               <h3 className="font-semibold">{emp.name}</h3>
//               <p className="text-sm text-gray-500">{emp.email}</p>
//               <p className="text-sm capitalize">{emp.position}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Upcoming Birthdays */}
     
//     </div>
//   );
// };

// export default MyTeam;


import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useauth";
import useAxios from "../../Hooks/useAxios";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [employees, setEmployees] = useState([]);

  // 1️⃣ Load companies for this employee
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/employee/companies/${user.email}`)
      .then((res) => {
        setCompanies(res.data);
        if (res.data.length) {
          setSelectedCompany(res.data[0].companyName);
        }
      })
      .catch(err => console.log(err));
  }, [user?.email]);

  // 2️⃣ Load employees for selected company
  useEffect(() => {
    if (!selectedCompany) return;

    axiosSecure
      .get(`/company/${selectedCompany}`)
      .then((res) => setEmployees(res.data))
      .catch(err => console.log(err));
  }, [selectedCompany]);

  // 3️⃣ Upcoming birthdays (current month)
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = employees.filter(emp => {
    if (!emp.dateOfBirth) return false;
    return new Date(emp.dateOfBirth).getMonth() === currentMonth;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Team</h2>

      {/* Company Dropdown */}
      <select
        className="select select-bordered mb-6 max-w-xs"
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        {companies.map((company) => (
          <option key={company.companyName} value={company.companyName}>
            {company.companyName}
          </option>
        ))}
      </select>

      {/* Employee Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {employees.map((emp) => (
          <div key={emp.email} className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center">
              <img
                src={emp.photo || "/avatar.png"}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h3 className="font-semibold">{emp.name}</h3>
              <p className="text-sm text-gray-500">{emp.email}</p>
              <p className="text-sm capitalize">{emp.position}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">
            🎂 Upcoming Birthdays This Month
          </h3>
          <ul className="space-y-2">
            {upcomingBirthdays.map(emp => (
              <li key={emp.email} className="flex items-center gap-3">
                <img
                  src={emp.photo || "/avatar.png"}
                  className="w-8 h-8 rounded-full"
                />
                <span>
                  {emp.name} –{" "}
                  {new Date(emp.dateOfBirth).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
