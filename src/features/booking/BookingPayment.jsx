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
    countryCode,
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

  const [dates, setDates] = useState(null);
  useEffect(() => {
    if (dates) {
      setValue("Calendar", dates);
    }
  }, [dates, setValue]);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const finalPrice =
    discount !== 0 ? (price - (discount / 100) * price).toFixed(2) : price;
  const flagUrl = countryCode
    ? `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
    : "";
  const summaryDescription = description.replace(/´/g, " ");

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
                src="/tablet_logo.png"
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
    <div className="min-w-[370px] bg-[radial-gradient(circle_at_top,_rgba(60,210,210,0.16),_transparent_36%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_45%,_#ffffff_100%)] px-3 py-6 md:px-6 md:py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm">
          <div className="relative h-72 overflow-hidden">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={image}
              alt="booking-image"
            />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,23,42,0.78),rgba(15,23,42,0.18)_55%,rgba(8,145,178,0.45))]"></div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-cyan-100/90">
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
                  {country}
                </span>
                {flagUrl ? (
                  <img
                    className="h-7 w-10 rounded-md object-cover shadow-md"
                    src={flagUrl}
                    alt="country-image"
                  />
                ) : null}
              </div>
              <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-100/85">
                {summaryDescription}
              </p>
            </div>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_100%)] p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/85">
                Total Due
              </p>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-4xl font-semibold">${finalPrice}</span>
                {discount !== 0 && (
                  <span className="pb-1 text-sm text-slate-300 line-through">
                    ${price}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm text-slate-300">
                {discount !== 0
                  ? `${discount}% promotional rate already applied.`
                  : "Standard nightly rate applies to this reservation."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-4 py-4 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
                  Guests
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {maxCapacity}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-4 py-4 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
                  Beds
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {numBeds}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-4 py-4 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
                  Check Out
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {checkout}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="rounded-[2rem] border border-white/60 bg-white/88 p-6 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8 lg:p-10">
          <div className="border-b border-slate-200/80 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
              Secure Checkout
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Complete your reservation
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Enter your guest details and payment information below. Your reservation summary stays visible while you complete checkout.
            </p>
          </div>

          <form
            className="mt-8 grid gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="md:col-span-2">
                <InputField
                  fieldName="Reservation Place"
                  registerName="reservationPlace"
                  type="text"
                  register={register}
                  value={title}
                />
              </div>

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

              <div className="md:col-span-2">
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
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-5 shadow-inner shadow-slate-100 md:p-6">
              <div className="flex flex-col gap-2 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
                  Stay Dates
                </p>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Pick your check-in and check-out
                </h3>
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between z-0">
                <label className="text-sm font-medium text-slate-600">
                  Check In - Check Out Dates
                </label>
                <Calendar
                  {...register("Calendar", { required: true })}
                  value={dates}
                  onChange={(e) => {
                    setDates(e.value);
                  }}
                  inputStyle={{
                    width: "250px",
                    backgroundColor: "#ffffff",
                    padding: "0.75rem 1rem",
                    borderRadius: "1rem",
                    border: "1px solid #cbd5e1",
                    boxShadow: "0 8px 24px rgba(148, 163, 184, 0.12)",
                  }}
                  panelClassName="shadow-2xl rounded-2xl"
                  selectionMode="range"
                  hideOnRangeSelection
                  readOnlyInput
                  placeholder="09/02/2024 - 09/06/2024"
                  minDate={new Date()}
                />
              </div>
              {errors?.Calendar?.type === "required" && (
                <p className="mt-3 text-right text-sm text-red-500">
                  ⚠ This field is required
                </p>
              )}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="md:col-span-2">
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
              </div>

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
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-500">
                Your payment details are used only for this reservation flow.
              </div>
              <input
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(15,23,42,0.22)] transition-colors duration-200 hover:bg-cyan-500"
                type="submit"
                value="Confirm Payment"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default BookingPayment;
