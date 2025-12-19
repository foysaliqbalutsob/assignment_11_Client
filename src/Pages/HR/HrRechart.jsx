import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading/Loading";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22C55E", "#F97316"];

const HrRechart = () => {
  const axiosSecure = useAxios();

  // PIE DATA
  const { data: typeData = {}, isLoading: loading1 } = useQuery({
    queryKey: ["assetTypeSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/dashboard/asset-type-summary"
      );
      return res.data;
    },
  });

  // BAR DATA
  const { data: topAssets = [], isLoading: loading2 } = useQuery({
    queryKey: ["topAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/top-assets");
      return res.data;
    },
  });

  if (loading1 || loading2) return <Loading />;

  const pieData = [
    { name: "Returnable", value: typeData.returnable },
    { name: "Non-returnable", value: typeData.nonReturnable },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">HR Asset Analytics</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* PIE */}
        <div className="bg-base-100 p-4 rounded shadow">
          <h3 className="text-center font-semibold mb-4">
            Asset Type Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-base-100 p-4 rounded shadow">
          <h3 className="text-center font-semibold mb-4">
            Top 5 Assigned Assets
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topAssets}>
              <XAxis dataKey="assetName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HrRechart;
