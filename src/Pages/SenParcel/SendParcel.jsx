import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useauth";


/* ================= Reusable Input ================= */
const Input = ({ label, type = "text", readOnly,register, name, error, placeholder,defaultValue }) => (
  <div className="mb-4">
    <label className="block text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      {...register(name)}
      defaultValue={defaultValue} 
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full border rounded-lg px-4 py-2 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

/* ================= Reusable Select ================= */
const Select = ({ label, register, name, error, options }) => (
  <div className="mb-4">
    <label className="block text-gray-600 mb-1">{label}</label>

    <select
      {...register(name)}
      className={`w-full border rounded-lg px-4 py-2 ${
        error ? "border-red-500" : ""
      }`}
    >
      <option value="">Select...</option>

      {Array.isArray(options) &&
        options.map((d, idx) => (
          <option key={idx} value={d}>
            {d}
          </option>
        ))}
    </select>

    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

/* ================= Reusable Textarea ================= */
const TextArea = ({ label, register, name, error, placeholder }) => (
  <div className="mb-4">
    <label className="block text-gray-600 mb-1">{label}</label>
    <textarea
      {...register(name)}
      placeholder={placeholder}
      className={`w-full border rounded-lg px-4 py-2 h-24 ${
        error ? "border-red-500" : ""
      }`}
    ></textarea>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

/* ================= Main Component ================= */
const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,reset,
    formState: { errors }
  } = useForm();


  const  {user} = useAuth()
  const navigate = useNavigate();



  const axiosSecure = useAxios();

  const serviceCenter = useLoaderData();

  // Get Unique Regions
  const regions = [...new Set(serviceCenter.map((item) => item.region))];

  // Watch selected sender region
  const senderRegion = watch("senderRegion");

  // Filter districts by selected region
  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenter
      .filter((item) => item.region === region)
      .map((item) => item.district);
  };

  const handleSendParcel = (data) => {
  console.log("FORM SUBMITTED:", data);

  const isDocument = data.parcelType === "document";
  const sameDistrict = data.senderDistrict === data.receiverDistrict;
  const parcelWeight = parseFloat(data.parcelWeight);

  let price = 0;
  if (isDocument) {
    price = sameDistrict ? 60 : 80;
  } else {
    if (parcelWeight < 3) {
      price = sameDistrict ? 110 : 150;
    } else {
      const minCharge = sameDistrict ? 110 : 150;
      const extraWeight = parcelWeight - 3;
      const extraCharge = extraWeight * 40;
      price = minCharge + extraCharge;
    }
  }

  data.cost = price;

  Swal.fire({
    title: "Please Confirm the Price",
    text: `Your delivery cost is BDT ${price}. Do you want to proceed?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Take My Parcel!"
  }).then((result) => {
    if (result.isConfirmed) {

      // ======================
      // 🚀 Only One Navigate + Toast After API Success
      // ======================
      axiosSecure.post("/parcels", data).then((res) => {
        console.log("after saving parcel", res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Parcel created! Please pay.",
            showConfirmButton: false,
            timer: 900,
          }).then(() => {
            navigate("/dashboard/my-parcels");
          });
        }
      });
    }
  });

  console.log("Delivery Cost:", price);
};





  

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Send A Parcel</h2>
        <p className="text-gray-500 mt-1">Enter your parcel details</p>
      </div>

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* ========= Parcel Type ========= */}
        <div className="flex items-center gap-10 border-b pb-6 mb-6">
          {["document", "not-document"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={type}
                {...register("parcelType", { required: "Select parcel type" })}
              />
              <span className="capitalize">{type.replace("-", " ")}</span>
            </label>
          ))}
        </div>

        {errors.parcelType && (
          <p className="text-red-500 text-sm mb-6">{errors.parcelType.message}</p>
        )}

        {/* ========= Parcel Info ========= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Input
            label="Parcel Name"
            name="parcelName"
            placeholder="Parcel Name"
            register={register}
            error={errors.parcelName}
          />

          <Input
            type="number"
            label="Parcel Weight (KG)"
            name="parcelWeight"
            placeholder="Parcel Weight"
            register={register}
            error={errors.parcelWeight}
          />
        </div>

        {/* ========= Sender + Receiver ========= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Sender */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Sender Details
            </h3>

            <Input
              label="Sender Name"
              name="senderName"
              register={register}
              error={errors.senderName}
              defaultValue={ user?.displayName }
              placeholder="Sender Name"
                readOnly 

            />

            <Input
              label="Sender Email"
              name="senderEmail"
              register={register}
              defaultValue={ user?.email }
              readOnly
             
              error={errors.senderEmail}
              placeholder="example@gmail.com"
            />

            <Input
              label="Address"
              name="senderAddress"
              register={register}
              error={errors.senderAddress}
              placeholder="Sender Address"
            />

            <Input
              label="Sender Phone No"
              name="senderContactNo"
              register={register}
              error={errors.senderContactNo}
              placeholder="01XXXXXXXXX"
            />

            {/* Sender Region */}
            <Select
              label="Sender Region"
              name="senderRegion"
              register={register}
              error={errors.senderRegion}
              options={regions}
            />

            {/* Sender District (Dynamic) */}
            <Select
              label="Sender District"
              name="senderDistrict"
              register={register}
              error={errors.senderDistrict}
              options={districtsByRegion(senderRegion)}
            />

            <TextArea
              label="Pickup Instruction"
              name="pickUpInstruction"
              register={register}
              error={errors.pickUpInstruction}
              placeholder="Add pickup notes..."
            />
          </div>

          {/* Receiver */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Receiver Details
            </h3>

            <Input
              label="Receiver Name"
              name="receiverName"
              register={register}
              error={errors.receiverName}
              placeholder="Receiver Name"
            />

            <Input
              label="Receiver Email"
              name="receiverEmail"
              register={register}
              error={errors.receiverEmail}
              placeholder="example@gmail.com"
            />

            <Input
              label="Receiver Address"
              name="receiverAddress"
              register={register}
              error={errors.receiverAddress}
              placeholder="Receiver Address"
            />

            <Input
              label="Receiver Contact"
              name="receiverContactNo"
              register={register}
              error={errors.receiverContactNo}
              placeholder="01XXXXXXXXX"
            />

            <Select
              label="Receiver Region"
              name="receiverRegion"
              register={register}
              error={errors.receiverRegion}
              options={regions}
            />

            <Select
              label="Receiver District"
              name="receiverDistrict"
              register={register}
              error={errors.receiverDistrict}
              options={districtsByRegion(watch("receiverRegion"))}
            />

            <TextArea
              label="Delivery Instruction"
              name="deliveryInstruction"
              register={register}
              error={errors.deliveryInstruction}
              placeholder="Add delivery notes..."
            />
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          * Pickup Time 4pm–7pm Approx.
        </p>

        <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;




