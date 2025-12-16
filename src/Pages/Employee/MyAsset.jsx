import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useauth";
import Loading from "../../Components/Loading/Loading";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";

const MyAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ["myAssets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/asset-requests/user/${user.email}`
      );
      return res.data;
    },
  });

  const filteredAssets = assets.filter((a) => {
    const matchName = a.assetName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchType = filterType ? a.assetType === filterType : true;
    return matchName && matchType;
  });

  const handleReturn = async (asset) => {
    try {
      await axiosSecure.patch(`/asset-requests/${asset._id}/return`);
      Swal.fire("Success", "Asset returned", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error", "Return failed", "error");
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("My Assigned Assets", 10, 10);
    let y = 20;

    filteredAssets.forEach((a, i) => {
      doc.text(
        `${i + 1}. ${a.assetName} | ${a.assetType} | ${a.companyName} | ${
          a.requestStatus
        }`,
        10,
        y
      );
      y += 10;
    });

    doc.save("my_assets.pdf");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Assets</h2>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by asset name"
          className="input border w-1/3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="select border w-1/4"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>

        <button className="btn border-none btn-primary" onClick={handlePrint}>
          Print
        </button>
      </div>


          {/* MOBILE CARD VIEW  */}
      <div className="md:hidden space-y-4">
        {filteredAssets.length === 0 && (
          <p className="text-center py-6">No assets found</p>
        )}
        {filteredAssets.map((a, i) => (
          <div
            key={a._id}
            className="card bg-base-100 shadow-md p-4 border rounded-lg"
          >
            <p>
              <span className="font-semibold">#</span> {i + 1}
            </p>
            <p>
              <span className="font-semibold">Asset:</span> {a.assetName}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {a.assetType}
            </p>
            <p>
              <span className="font-semibold">Company:</span> {a.companyName}
            </p>
            <p>
              <span className="font-semibold">Requested:</span>{" "}
              {new Date(a.requestDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Approved:</span>{" "}
              {a.approvalDate
                ? new Date(a.approvalDate).toLocaleDateString()
                : "-"}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="badge badge-outline">{a.requestStatus}</span>
            </p>
            {a.requestStatus === "approved" && a.assetType === "Returnable" && (
              <button
                className="btn btn-sm btn-warning mt-2"
                onClick={() => handleReturn(a)}
              >
                Return
              </button>
            )}
          </div>
        ))}
      </div>

   
      <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">

     
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Company</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No assets found
                </td>
              </tr>
            )}

            {filteredAssets.map((a) => (
              <tr key={a._id}>
                <td className="flex items-center gap-3">
                  <div>
                    <p className="font-bold">{a.assetName}</p>
                  </div>
                </td>
                <td>{a.assetType}</td>
                <td>{a.companyName}</td>
                <td>{new Date(a.requestDate).toLocaleDateString()}</td>
                <td>
                  {a.approvalDate
                    ? new Date(a.approvalDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <span className="badge badge-outline">
                    {a.requestStatus}
                  </span>
                </td>
                <td>
                  {a.requestStatus === "approved" &&
                    a.assetType === "Returnable" && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleReturn(a)}
                      >
                        Return
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAsset;
