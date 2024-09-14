import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Calendar } from "primereact/calendar";
import { useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme (you can pick different themes)
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

function BookingPayment() {
  const { booking_id } = useParams();

  const { handleSubmit, register } = useForm();
  const onSubmit = (values) => console.log(values);
  const [dates, setDates] = useState(null);

  return (
    <div>
      This is the payment page and this is the booking_id{" "}
      <span>{booking_id}</span>
      <form
        className="flex flex-col w-full items-center space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          Reservation Place
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="text"
            placeholder="Hotel Name here"
            {...register("Reservation Place", { required: true })}
          />
        </label>

        <label className="flex flex-col">
          Name
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="text"
            placeholder="Name"
            {...register("firstName", { required: true })}
          />
        </label>
        <label className="flex flex-col">
          LastName
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="text"
            placeholder="LastName"
            {...register("LastName", { required: true })}
          />
        </label>
        <label className="flex flex-col">
          Email Address
          <input
            className=" bg-gray-100 rounded-lg px-8 py-2"
            type="email"
            placeholder="Email Address"
            {...register("Email Address", { required: true })}
          />
        </label>

        <label className="flex flex-col pb-28 card justify-content-center">
          Check In - Check Out Dates
          <Calendar
            inputStyle={{ width: "250px", border: "1px solid gray" }}
            value={dates}
            onChange={(e) => setDates(e.value)}
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
          />
          {/* <input type="text" {...register("Calendar", { required: true })} /> */}
        </label>
        <input
          className="px-24 py-2 bg-cyan-300 rounded-lg text-white"
          type="submit"
        />
      </form>
    </div>
  );
}

export default BookingPayment;
