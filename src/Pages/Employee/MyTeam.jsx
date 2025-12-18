import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useauth";
import useAxios from "../../Hooks/useAxios";
import axios from "axios";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [employees, setEmployees] = useState([]);
  useEffect(()=>{
    const res = axios('')

  },[companies])

  // Load companies
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
      .catch(console.log);
  }, [user?.email]);

  // Load employees by company
  useEffect(() => {
    if (!selectedCompany) return;

    axiosSecure
      .get(`/company/${selectedCompany}`)
      .then((res) => setEmployees(res.data))
      .catch(console.log);
  }, [selectedCompany]);

  
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = employees.filter(
    (emp) =>
      emp.dateOfBirth &&
      new Date(emp.dateOfBirth).getMonth() === currentMonth
  );

  return (
    <div className="p-6 max-w-7xl mx-auto text-base-content">
      
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold">My Team</h2>

        <div className="form-control max-w-xs">
          <label className="label pb-1">
            <span className="label-text text-sm">
              Select your affiliated company
            </span>
          </label>
          <select
            className="select select-bordered"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {companies.map((company) => (
              <option
                key={company.companyName}
                value={company.companyName}
              >
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {employees.map((emp) => (
          <div
            key={emp.email}
            className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow border"
          >
            <div className="card-body items-center text-center">
              <img
                src={emp.photo || "/avatar.png"}
                alt={emp.name}
                className="w-16 h-16 rounded-full mb-3"
              />
              <h3 className="font-semibold text-lg">{emp.name}</h3>
              <p className="text-sm opacity-70">{emp.email}</p>
              <p className="text-xs uppercase tracking-wide opacity-60">
                {emp.position}
              </p>
            {/* <p>{emp.dateOfBirth}</p> */}
            <p className="text-sm opacity-70">
  🎂 {new Date(emp.dateOfBirth).toLocaleDateString()}
</p>

            </div>
          </div>
        ))}
      </div>

  
       {upcomingBirthdays.length > 0 && (
        <div className="mt-12 border-t border-base-300 pt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            🎂 Upcoming Birthdays This Month
          </h3>

          <ul className="space-y-3">
            {upcomingBirthdays.map((emp) => (
              <li
                key={emp.email}
                className="flex items-center gap-3 bg-base-100 p-3 rounded-lg shadow-sm"
              >
                <img
                  src={emp.photo || "/avatar.png"}
                  alt={emp.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">
                  <span className="font-medium">{emp.name}</span> —
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



