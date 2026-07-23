import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../../ui/InputField";
import { useMutationCustom } from "../../hooks/useMutation";
import { addNewBooking, getAllAmenities } from "../../services/apiBookings";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AmenitySelector from "./AmenitySelector";

function AddBooking() {
  const navigate = useNavigate();
  const [discountEnable, setDiscountEnable] = useState(true);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const {
    isLoading: isLoadingEdit,
    mutate: mutateAdd,
  } = useMutationCustom(
    addNewBooking,
    "bookings",
    "Booking Successfully Added!",
    "Could not add new booking!"
  );

  const { data: amenityOptions = [], isPending: isAmenitiesPending } = useQuery({
    queryKey: ["all-amenities"],
    queryFn: getAllAmenities,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleToggleAmenity = (amenityId) => {
    setSelectedAmenities((currentAmenities) =>
      currentAmenities.includes(amenityId)
        ? currentAmenities.filter((currentAmenityId) => currentAmenityId !== amenityId)
        : [...currentAmenities, amenityId]
    );
  };

  const onSubmit = (formData) => {
    const imageFile = formData.image[0];

    if (!imageFile) {
      return;
    }

    mutateAdd({ imageFile, amenities: selectedAmenities, ...formData });
    reset();
    setSelectedAmenities([]);
    setDiscountEnable(true);
    navigate(`/login/console`);
  };

  return (
    <div className="min-w-[370px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_48%,_#ffffff_100%)] px-3 py-6 md:px-6 md:py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/82 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm">
          <div className="bg-[linear-gradient(160deg,_#0f172a_0%,_#1e293b_48%,_#155e75_100%)] p-6 text-white md:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
              Create Listing
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Add a new stay
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 md:text-base">
              Create a new booking record with pricing, classification, checkout details, image upload, and Mongo-backed amenities.
            </p>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_100%)] p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/85">
                Required inputs
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Title, country, capacity, description, pricing, beds, checkout time, classification, image, and amenity selection.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-4 py-4 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
                  Pricing
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  Flexible
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-4 py-4 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
                  Amenities
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  Atlas
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-4 py-4 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">
                  Media
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  Upload
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="rounded-[2rem] border border-white/60 bg-white/88 p-6 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8 lg:p-10">
          <div className="border-b border-slate-200/80 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
              New Booking
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Enter the property details
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Complete the listing information below and select amenities from the current MongoDB catalog used by the administration console.
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
                placeholder={"Fullmoon Lodge"}
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
                placeholder={"Costa Rica"}
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
                placeholder={"2"}
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
                placeholder={"200.25"}
                register={register}
                step={0.01}
                valueAsNumberBoolean={true}
              />

              <InputField
                fieldName="Booking Luxury (Discount will be set to 0% automatically)"
                registerName="luxury"
                validation={{
                  required: true,
                }}
                errors={errors}
                register={register}
                selection={true}
                setDiscountEnable={setDiscountEnable}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </InputField>

              <InputField
                fieldName="Discount"
                registerName="discount"
                validation={{
                  pattern: /^(100|[1-9]?[0-9])$/,
                }}
                errors={errors}
                type="number"
                register={register}
                placeholder={"20"}
                valueAsNumberBoolean={true}
                disable={discountEnable}
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
                placeholder={"5"}
                valueAsNumberBoolean={true}
              />

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
                placeholder={"11:30"}
              />

              <div className="xl:col-span-2">
                <InputField
                  fieldName="Description"
                  registerName="description"
                  errors={errors}
                  type="text"
                  register={register}
                  placeholder={"Write a compelling property description"}
                  validation={{ required: true }}
                />
              </div>

              <InputField
                fieldName="Classification"
                registerName="classification"
                validation={{
                  required: true,
                }}
                errors={errors}
                register={register}
                selection={true}
              >
                <option value="cabin">Cabin</option>
                <option value="hotel">Hotel</option>
                <option value="house">House</option>
              </InputField>

              <InputField
                fieldName="Image"
                registerName="image"
                validation={{
                  required: true,
                }}
                errors={errors}
                type="file"
                register={register}
              />
            </div>

            {isAmenitiesPending ? (
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
                The new booking will be stored in MongoDB Atlas and refreshed automatically in the administration console.
              </div>
              <input
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(15,23,42,0.22)] transition-colors duration-200 hover:bg-cyan-500"
                type="submit"
                value={isLoadingEdit ? "Saving..." : "Create Booking"}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddBooking;
