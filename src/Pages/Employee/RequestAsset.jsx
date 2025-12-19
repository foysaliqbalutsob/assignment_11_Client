// import React, {  useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useauth";
// import Swal from "sweetalert2";
// import Loading from "../../Components/Loading/Loading";
// import useUserRole from "../../Hooks/useUserRole";

// const RequestAsset = () => {
//   const axiosSecure = useAxios();
//   const { user } = useAuth();
//   const {userData} =useUserRole();
//    console.log(userData.dateOfBirth);

//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const [note, setNote] = useState("");
//   console.log(selectedAsset);
//   const [quantity, setQuantity] = useState(null);
//   const [productQuantity, SetProductQuantity] = useState();
//   console.log(productQuantity);
//   console.log(quantity)

//   // Load all assets
//   const { data: assets = [], isLoading } = useQuery({
//     queryKey: ["assets"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/assets");
//       // console.log(assets);
//       return res.data;
//     },
//   });

//   // load kortechi match er jonno
//   const { data: myRequests = [], refetch } = useQuery({
//     queryKey: ["myRequests", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/asset-requests/user/${user.email}`);
//       return res.data;
//     },
//   });



//   const getButtonState = (assetId) => {
//     // console.log(assetId);
//     const req = myRequests.find((r) => r.assetId === assetId);

//     if (req) {
//       if (req.requestStatus === "pending") return "Pending";
//       if (req.requestStatus === "rejected") return "rejected - Request Again";
//       // if (req.requestStatus === "approved" || req.) return "Request accepted";
//       if (req.requestStatus === "approved") {
//         if (req.assetType === "Returnable") {
//           return `Accepted (Return by ${new Date(
//             req.returnDeadline
//           ).toLocaleDateString()})`;
//         }
//         return "Accepted (Non-returnable)";
//       }
//     }
//     return "Request";
//   };

//   const openModal = (asset) => {
//     setSelectedAsset(asset);
//     setQuantity(asset.availableQuantity);
//     SetProductQuantity(asset.productQuantity);
//     document.getElementById("request_modal").showModal();
//   };

//   const submitRequest = async () => {
//     if (!note.trim()) {
//       document.getElementById("request_modal").close();
//       return Swal.fire("Error", "Write a note", "error");
//     }

//     try {
//       await axiosSecure.post("/asset-requests", {
//         assetId: selectedAsset._id,
//         assetName: selectedAsset.productName,
//        assetImage: selectedAsset.productImage,
//         assetType: selectedAsset.productType,


//         productQuantity: productQuantity,

//         availableQuantity: quantity,
//         requesterName: user.displayName,
//         hrEmail: selectedAsset.hrEmail,
//         companyName: selectedAsset.companyName,
//         requesterEmail: user.email,
//         requestStatus: "pending",
//         requesterBirthOfDate: userData.dateOfBirth || null,
//         note,
//       });

//       Swal.fire("Success", "Request submitted", "success");
//       setNote("");
//       setSelectedAsset(null);
//       refetch();
//       document.getElementById("request_modal").close();
//     } catch (err) {
//       document.getElementById("request_modal").close();
//       Swal.fire("Error", err.response?.data?.message || "Failed", "error");
//     }
//   };

//   if (isLoading) return <Loading />;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Request Asset</h2>

//       <div className="md:hidden space-y-4">
//         {assets.length === 0 && (
//           <p className="text-center py-6">No assets available</p>
//         )}
//         {assets.map((asset, index) => {
//           const buttonText = getButtonState(asset._id);
//           const disabled =
//             buttonText === "Pending" ||
//             buttonText === "Request Again" ||
//             asset.availableQuantity === 0;

//           return (
//             <div
//               key={asset._id}
//               className="card bg-base-100 shadow-md p-4 border rounded-lg"
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <img
//                   src={asset.productImage}
//                   alt={asset.productName}
//                   className="w-12 h-12 rounded"
//                 />
//                 <div>
//                   <p className="font-bold">{asset.productName}</p>
//                   <p className="text-sm opacity-60">{asset.productType}</p>
//                 </div>
//               </div>
//               <p>
//                 <span className="font-semibold">Company:</span>{" "}
//                 {asset.companyName} {asset.hrEmail && `(${asset.hrEmail})`}
//               </p>
//               <p>
//                 <span className="font-semibold">Available:</span>{" "}
//                 {asset.availableQuantity}
//               </p>
//               <button
//                 disabled={disabled}
//                 className={`btn btn-sm mt-2 w-full ${
//                   disabled ? "btn-disabled" : "btn-primary"
//                 }`}
//                 onClick={() => openModal(asset)}
//               >
//                 {buttonText}
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>Index</th>
//               <th>Asset</th>
//               <th>Company</th>
//               <th>Type</th>
//               <th>Available</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {assets.map((asset, index) => {
//               const buttonText = getButtonState(asset._id);
//               const disabled =
//                 buttonText === "Pending" ||
//                 buttonText === "Requested" ||
//                 buttonText === "Returnable" ||
//                 asset.availableQuantity === 0;

//               return (
//                 <tr key={asset._id}>
//                   <td>{index + 1}</td>
//                   <td className="flex items-center gap-3">
//                     <img
//                       src={asset.productImage}
//                       className="w-12 h-12 rounded"
//                     />
//                     <div>
//                       <p className="font-bold">{asset.productName}</p>
//                       <p className="text-sm opacity-60">{asset.productType}</p>
//                     </div>
//                   </td>

//                   <td>
//                     {asset.companyName} <br />{" "}
//                     {asset.hrEmail && `(${asset.hrEmail})`}
//                   </td>
//                   <td>{asset.productType}</td>
//                   <td>
//                     {asset.availableQuantity}{" "}
                   
//                   </td>

//                   <td>
//                     <button
//                       disabled={disabled}
//                       className={`btn btn-primary border-none text-white ${
//                         disabled ? "btn-disabled" : "btn-primary"
//                       }`}
//                       onClick={() => openModal(asset)}
//                     >
//                       {buttonText}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       <dialog id="request_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Request Asset</h3>

//           {selectedAsset && (
//             <>
//               <p>
//                 <b>Asset:</b> {selectedAsset.productName}
//               </p>
//               <p>
//                 <b>Available:</b> {selectedAsset.availableQuantity}
//               </p>
//             </>
//           )}

//           <textarea
//             className="textarea textarea-bordered border w-full mt-4"
//             placeholder="Write note..."
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//           />

//           <div className="modal-action">
//             <button className="btn btn-primary" onClick={submitRequest}>
//               Submit
//             </button>
//             <form method="dialog">
//               <button className="btn">Cancel</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default RequestAsset;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading/Loading";


const RequestAsset = () => {
  const axiosSecure = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL params
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Fetch paginated assets
  const { data, isLoading } = useQuery({
    queryKey: ["assets", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Loading />;

  const assets = data?.assets || [];
  const totalPages = data?.totalPages || 1;

  // Change page
  const changePage = (newPage) => {
    setSearchParams({ page: newPage, limit });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Request Asset</h2>

      {/* TABLE */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Company</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No assets found
                </td>
              </tr>
            )}

            {assets.map((asset, index) => (
              <tr key={asset._id}>
                <td>{(page - 1) * limit + index + 1}</td>

                <td>
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-12 h-12 rounded object-cover border"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/48")
                    }
                  />
                </td>

                <td className="font-medium">{asset.productName}</td>
                <td>{asset.productType}</td>
                <td>{asset.companyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => changePage(num + 1)}
            className={`btn btn-sm ${
              page === num + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
        >
          Next
        </button>
      </div>



      
    </div>
  );
};

export default RequestAsset;

