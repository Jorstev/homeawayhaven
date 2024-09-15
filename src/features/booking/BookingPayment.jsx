import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";

import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function BookingPayment() {
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
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const [dates, setDates] = useState(null);
  useEffect(() => {
    if (dates) {
      setValue("Calendar", dates);
    }
  }, [dates, setValue]);

  const onSubmit = (data) => console.log(data);

  console.log(watch("Calendar"));
  console.log(dates);

  return (
    <div>
      <form
        className="flex flex-col w-full items-center space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col font-light">
          Reservation Place
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="text"
            placeholder="Hotel Name here"
            value={title}
            {...register("Reservation Place", { required: true })}
          />
        </label>

        <label className="flex flex-col font-light">
          Name
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="text"
            placeholder="Name"
            {...register("firstName", {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
        </label>
        {errors?.firstName?.type === "required" && (
          <p className="text-red-500">⚠ This field is required</p>
        )}
        {errors?.firstName?.type === "pattern" && (
          <p className="text-red-500">⚠ Alphabetical characters only</p>
        )}
        <label className="flex flex-col font-light">
          Last Name
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="text"
            placeholder="LastName"
            {...register("LastName", {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
        </label>
        {errors?.LastName?.type === "required" && (
          <p className="text-red-500">⚠ This field is required</p>
        )}
        {errors?.LastName?.type === "pattern" && (
          <p className="text-red-500">⚠ Alphabetical characters only</p>
        )}
        <label className="flex flex-col font-light">
          Email Address
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="email"
            placeholder="Email Address"
            {...register("EmailAddress", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
        </label>
        {errors?.EmailAddress?.type === "required" && (
          <p className="text-red-500">⚠ This field is required</p>
        )}
        {errors?.EmailAddress?.type === "pattern" && (
          <p className="text-red-500">⚠ Incorrect email format</p>
        )}
        <label className="flex flex-col card justify-content-center font-light">
          Check In - Check Out Dates
          <Calendar
            {...register("Calendar", {
              required: true,
            })}
            inputStyle={{
              width: "250px",
              backgroundColor: "#f3f4f6",
              padding: "0.5rem 2rem",
            }}
            value={dates}
            onChange={(e) => setDates(e.value)}
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
            placeholder="09/02/2024 - 09/06/2024"
            minDate={new Date()}
          />
        </label>
        {errors?.Calendar?.type === "required" && (
          <p className="text-red-500">⚠ This field is required</p>
        )}
        {errors?.Calendar?.type === "pattern" && (
          <p className="text-red-500">⚠ Incorrect Calendar Input</p>
        )}
        <label className="flex flex-col font-light">
          Card Number
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="text"
            placeholder="1234 1234 1234 1234"
            {...register("Card Number", { required: true })}
          />
        </label>
        <div className="flex justify-center space-x-5 font-light">
          <label className="flex flex-col  max-w-[50%]">
            Expiration Date
            <input
              className=" bg-gray-100 py-2 rounded-lg"
              type="date"
              {...register("Expiration Date", { required: true })}
            />
          </label>
          <label className="flex flex-col max-w-[25%] font-light">
            CVV
            <input
              className=" bg-gray-100 rounded-lg py-2"
              type="password"
              placeholder="555"
              {...register("CVV", { required: true })}
            />
          </label>
        </div>
        <input
          className="px-24 py-2 bg-cyan-300 rounded-lg text-white"
          type="submit"
        />
      </form>
    </div>
  );
}

export default BookingPayment;
