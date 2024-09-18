import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import InputField from "../../ui/InputField";
import { useDispatch } from "react-redux";
import { setFormData } from "./bookingSlice";
import toast from "react-hot-toast";

function BookingPayment() {
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
  let today = new Date();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [dates, setDates] = useState(null);
  useEffect(() => {
    if (dates) {
      setValue("Calendar", dates);
    }
  }, [dates, setValue]);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const onSubmit = (formData) => {
    setPaymentStatus(true);
    dispatch(setFormData(formData));
    reset();
    navigate(`/booking/${booking_id}/payment/confirmation`);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="/public/tablet_logo.png"
                alt="logo-image"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="mt-1 text-sm text-gray-500">Payment Successful!</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <form
        className="flex flex-col w-full items-center space-y-6 py-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          fieldName="Reservation Place"
          registerName="reservationPlace"
          type="text"
          register={register}
          value={title}
        />

        <InputField
          fieldName="Name"
          registerName="firstName"
          validation={{
            required: true,
            pattern: /^[A-Za-z]+$/i,
          }}
          errors={errors}
          type="text"
          placeholder="Jordan"
          register={register}
        />
        <InputField
          fieldName="Last Name"
          registerName="lastName"
          validation={{
            required: true,
            pattern: /^[A-Za-z]+$/i,
          }}
          errors={errors}
          type="text"
          placeholder="Chavarria"
          register={register}
        />

        <InputField
          fieldName="Email Address"
          registerName="emailAddress"
          validation={{
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          }}
          errors={errors}
          type="email"
          placeholder="user@gmail.com"
          register={register}
        />
        <div className="flex flex-col md:flex-row md:items-center justify-between w-96 mb-8 z-0">
          <label className="font-light">Check In - Check Out Dates</label>
          <Calendar
            {...register("Calendar", { required: true })}
            value={dates}
            onChange={(e) => {
              setDates(e.value);
            }}
            inputStyle={{
              width: "250px",
              backgroundColor: "#f3f4f6",
              padding: "0.5rem 2rem",
            }}
            selectionMode="range"
            hideOnRangeSelection
            readOnlyInput
            placeholder="09/02/2024 - 09/06/2024"
            minDate={new Date()}
          />
        </div>
        {errors?.Calendar?.type === "required" && (
          <p className="text-red-500">⚠ This field is required</p>
        )}
        <InputField
          fieldName="Card Number"
          registerName="cardNumber"
          validation={{
            required: true,
            minLength: 16,
          }}
          errors={errors}
          type="text"
          placeholder="1234567890123456"
          register={register}
        />

        <InputField
          fieldName="Expiration Date"
          registerName="expirationDate"
          validation={{
            required: true,
          }}
          errors={errors}
          type="date"
          register={register}
        />
        <InputField
          fieldName="CVV"
          registerName="cvv"
          validation={{
            required: true,
          }}
          errors={errors}
          type="password"
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

export default BookingPayment;
