import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import InputField from "../../ui/InputField";
import { useMutationCustom } from "../../hooks/useMutation";
import { updateBookingById } from "../../services/apiBookings";

function EditBooking() {
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
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    isSuccess: isSuccessEdit,
    mutate: mutateEdit,
  } = useMutationCustom(
    updateBookingById,
    "bookings",
    "Booking Successfully Updated!",
    "Could not update booking!"
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    console.log(booking_id);
    mutateEdit({ booking_id, ...formData });
    reset();
    navigate(`/login/console`);
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
          placeholder={title}
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
          placeholder={country}
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
          placeholder={maxCapacity}
          valueAsNumberBoolean={true}
        />

        <InputField
          fieldName="Description"
          registerName="description"
          errors={errors}
          type="text"
          register={register}
          placeholder={description}
          validation={{ required: true }}
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
          placeholder={price}
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
          placeholder={`${discount}%`}
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
          placeholder={numBeds}
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
          placeholder={checkout}
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
