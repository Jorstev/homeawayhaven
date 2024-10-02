import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../../ui/InputField";
import { useMutationCustom } from "../../hooks/useMutation";
import { addNewBooking } from "../../services/apiBookings";
import AmenityInput from "../booking/AmenityInput";
import { useState } from "react";
import { useSelector } from "react-redux";

function AddBooking() {
  const navigate = useNavigate();
  let amenities = useSelector((state) => state.booking.amenities);
  const [discountEnable, setDiscountEnable] = useState(true);

  const {
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    isSuccess: isSuccessEdit,
    mutate: mutateAdd,
  } = useMutationCustom(
    addNewBooking,
    "bookings",
    "Booking Successfully Added!",
    "Could not add new booking!"
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    const imageFile = formData.image[0]; // Ensure this is capturing the correct file
    if (!imageFile) {
      console.error("No file selected");
      return;
    }
    console.log(imageFile);
    mutateAdd({ imageFile, amenities, ...formData });
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
          placeholder={"FullmoonlodgeCR"}
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
          fieldName="Description"
          registerName="description"
          errors={errors}
          type="text"
          register={register}
          placeholder={"Be creative Here"}
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
          placeholder={"200.25"}
          register={register}
          step={0.01}
          valueAsNumberBoolean={true}
        />
        <section className="py-7 px-3">
          <label className="font-light">Amenities</label>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-4">
            <AmenityInput amenityValue={"Wi-Fi"} />
            <AmenityInput amenityValue={"A/C"} />
            <AmenityInput amenityValue={"Private Bathroom"} />
            <AmenityInput amenityValue={"Cable TV"} />
            <AmenityInput amenityValue={"Parking"} />
            <AmenityInput amenityValue={"Laundry Facilities"} />
            <AmenityInput amenityValue={"Pet Friendly"} />
            <AmenityInput amenityValue={"Balcony"} />
          </div>
        </section>
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
          placeholder={`20`}
          valueAsNumberBoolean={true}
          disable={discountEnable}
          // value={`${discountEnable ? 0 : 10}`}
          discountEnable={discountEnable}
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

        <input
          className="px-24 py-2 bg-cyan-300 rounded-lg text-white cursor-pointer md:mt-20"
          type="submit"
        />
      </form>
    </div>
  );
}

export default AddBooking;
