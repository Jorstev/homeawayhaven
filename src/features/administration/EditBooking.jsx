import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import InputField from "../../ui/InputField";
import { useMutationCustom } from "../../hooks/useMutation";
import {
  getAllAmenities,
  getAllAmenitiesById,
  updateBookingById,
} from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AmenitySelector from "./AmenitySelector";

function EditBooking() {
  const navigate = useNavigate();
  const { booking_id } = useParams();
  const { bookings } = useOutletContext();
  const bookingDetails = bookings.find(
    (booking) => booking.booking_id === booking_id
  );
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [amenitiesInitialized, setAmenitiesInitialized] = useState(false);

  const {
    isLoading: isLoadingEdit,
    mutate: mutateEdit,
  } = useMutationCustom(
    updateBookingById,
    "bookings",
    "Booking Successfully Updated!",
    "Could not update booking!"
  );

  const { data: amenityOptions = [], isPending: isAmenitiesPending } = useQuery({
    queryKey: ["all-amenities"],
    queryFn: getAllAmenities,
  });

  const { data: currentAmenities = [], isPending: isCurrentAmenitiesPending } = useQuery({
    queryKey: ["booking-amenities", booking_id],
    queryFn: () => getAllAmenitiesById(booking_id),
    enabled: Boolean(booking_id && bookingDetails),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      country: "",
      maxCapacity: "",
      description: "",
      price: "",
      discount: "",
      numBeds: "",
      checkout: "",
    },
  });

  useEffect(() => {
    if (currentAmenities.length > 0 && !amenitiesInitialized) {
      setSelectedAmenities(
        currentAmenities.map((amenity) => String(amenity.amenity_id))
      );
      setAmenitiesInitialized(true);
    }

    if (currentAmenities.length === 0 && !isCurrentAmenitiesPending && !amenitiesInitialized) {
      setSelectedAmenities([]);
      setAmenitiesInitialized(true);
    }
  }, [currentAmenities, amenitiesInitialized, isCurrentAmenitiesPending]);

  const handleToggleAmenity = (amenityId) => {
    setSelectedAmenities((currentAmenitiesSelected) =>
      currentAmenitiesSelected.includes(amenityId)
        ? currentAmenitiesSelected.filter((currentAmenityId) => currentAmenityId !== amenityId)
        : [...currentAmenitiesSelected, amenityId]
    );
  };

  const onSubmit = (formData) => {
    mutateEdit({ booking_id, amenities: selectedAmenities, ...formData });
    reset();
    navigate(`/login/console`);
  };

  useEffect(() => {
    if (!bookingDetails) {
      return;
    }

    reset({
      title: bookingDetails.title,
      country: bookingDetails.country,
      maxCapacity: bookingDetails.maxCapacity,
      description: bookingDetails.description.replace(/´/g, " "),
      price: bookingDetails.price,
      discount: bookingDetails.discount,
      numBeds: bookingDetails.numBeds,
      checkout: bookingDetails.checkout,
    });
  }, [bookingDetails, reset]);

  if (!bookingDetails) {
    return <span>Booking not found</span>;
  }

  const {
    title,
    country,
    maxCapacity,
    description,
    price,
    discount,
    image,
    numBeds,
    checkout,
    classification,
    luxury,
  } = bookingDetails;

  const descriptionFormatted = description.replace(/´/g, " ");
  const finalPrice =
    discount !== 0 ? (price - (discount / 100) * price).toFixed(2) : price;

  return (
    <div className="min-w-[370px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_48%,_#ffffff_100%)] px-3 py-6 md:px-6 md:py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/82 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm">
          <div className="relative h-72 overflow-hidden">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={image}
              alt="booking-preview"
            />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,23,42,0.72),rgba(15,23,42,0.16)_55%,rgba(8,145,178,0.42))]"></div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
                {classification}
              </span>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">
                {title}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-100/85">
                {descriptionFormatted}
              </p>
            </div>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_100%)] p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/85">
                Current Price
              </p>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-4xl font-semibold">${finalPrice}</span>
                {discount !== 0 ? (
                  <span className="pb-1 text-sm text-slate-300 line-through">
                    ${price}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-slate-300">
                {luxury ? "Luxury listing" : "Standard listing"} currently set for {country}.
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
              Edit Listing
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Update stay details
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Adjust the core booking fields below and refine the amenities assigned to this property.
            </p>
          </div>

          <form
            className="mt-8 grid gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-6 xl:grid-cols-2">
              <InputField
                fieldName="Title"
                registerName="title"
                type="text"
                register={register}
                validation={{
                  required: true,
                  pattern: /^[A-Za-z ]+$/,
                }}
              />

              <InputField
                fieldName="Country"
                registerName="country"
                validation={{
                  required: true,
                  pattern: /^[A-Za-z ]+$/,
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
                  required: true,
                }}
                errors={errors}
                type="number"
                register={register}
                valueAsNumberBoolean={true}
              />

              <InputField
                fieldName="Price"
                registerName="price"
                validation={{
                  required: true,
                  pattern: /^\d*\.?\d+$/,
                }}
                errors={errors}
                type="number"
                register={register}
                step={0.01}
                valueAsNumberBoolean={true}
              />

              <InputField
                fieldName="Discount"
                registerName="discount"
                validation={{
                  required: true,
                  pattern: /^(100|[1-9]?[0-9])$/,
                }}
                errors={errors}
                type="number"
                register={register}
                valueAsNumberBoolean={true}
              />

              <InputField
                fieldName="Number of Beds"
                registerName="numBeds"
                validation={{
                  required: true,
                  pattern: /^[0-9]+$/,
                }}
                errors={errors}
                type="number"
                register={register}
                valueAsNumberBoolean={true}
              />

              <div className="xl:col-span-2">
                <InputField
                  fieldName="Description"
                  registerName="description"
                  errors={errors}
                  type="text"
                  register={register}
                  validation={{ required: true }}
                />
              </div>

              <InputField
                fieldName="Check Out Time"
                registerName="checkout"
                validation={{
                  required: true,
                  pattern: /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
                }}
                errors={errors}
                type="time"
                register={register}
              />
            </div>

            {isAmenitiesPending || isCurrentAmenitiesPending ? (
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-6 text-sm text-slate-500 shadow-inner shadow-slate-100">
                Loading amenities...
              </div>
            ) : (
              <AmenitySelector
                options={amenityOptions}
                selectedAmenityIds={selectedAmenities}
                onToggleAmenity={handleToggleAmenity}
              />
            )}

            <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-500">
                Changes are applied to the current listing and refresh the booking inventory automatically.
              </div>
              <input
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(15,23,42,0.22)] transition-colors duration-200 hover:bg-cyan-500"
                type="submit"
                value={isLoadingEdit ? "Saving..." : "Save Changes"}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EditBooking;
