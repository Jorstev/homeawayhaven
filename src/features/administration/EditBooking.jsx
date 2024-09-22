import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import InputField from "../../ui/InputField";
import { useDispatch } from "react-redux";

function EditBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { booking_id } = useParams();
  const { bookings } = useOutletContext();
  const bookingDetails = bookings.find(
    (booking) => booking.booking_id === booking_id
  );
  const {
    title,
    country,
    maxCapacity,
    description,
    price,
    discount,
    // classification,
    // luxury,
    image,
    numBeds,
    checkout,
  } = bookingDetails;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    console.log(booking_id);

    // toast.custom((t) => (
    //   <div
    //     className={`${
    //       t.visible ? "animate-enter" : "animate-leave"
    //     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //   >
    //     <div className="flex-1 w-0 p-4">
    //       <div className="flex items-start">
    //         <div className="flex-shrink-0 pt-0.5">
    //           <img
    //             className="h-10 w-10 rounded-full"
    //             src="/public/tablet_logo.png"
    //             alt="logo-image"
    //           />
    //         </div>
    //         <div className="ml-3 flex-1">
    //           <p className="text-sm font-medium text-gray-900">
    //             {formData.firstName} {formData.lastName}
    //           </p>
    //           <p className="mt-1 text-sm text-gray-500">Payment Successful!</p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex border-l border-gray-200">
    //       <button
    //         onClick={() => toast.dismiss(t.id)}
    //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //       >
    //         Close
    //       </button>
    //     </div>
    //   </div>
    // ));
  };

  return (
    <div>
      <form
        className="flex flex-col w-full items-center space-y-6 py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          fieldName="Title"
          registerName="title"
          type="text"
          register={register}
        />

        <InputField
          fieldName="Country"
          registerName="country"
          validation={{
            pattern: /^[A-Za-z]+$/i,
          }}
          errors={errors}
          type="text"
          register={register}
        />
        <InputField
          fieldName="Maximun Capacity"
          registerName="maxCapacity"
          validation={{
            minLength: 1,
            pattern: /^[1-9][0-9]*$/,
          }}
          errors={errors}
          type="number"
          register={register}
        />

        <InputField
          fieldName="Description"
          registerName="description"
          errors={errors}
          type="text"
          register={register}
        />

        <InputField
          fieldName="Price"
          registerName="price"
          validation={{
            pattern: /^\d*\.?\d+$/,
          }}
          errors={errors}
          type="number"
          placeholder="1234567890123456"
          register={register}
        />

        <InputField
          fieldName="Discount"
          registerName="discount"
          validation={{
            pattern: /^(100|[1-9]?[0-9])$/,
          }}
          errors={errors}
          type="number"
          register={register}
        />

        <input
          className="px-24 py-2 bg-cyan-300 rounded-lg text-white cursor-pointer md:mt-20"
          type="submit"
        />
      </form>
    </div>
  );
}

export default EditBooking;
