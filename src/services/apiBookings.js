import supabase from "./supabase";

export async function getAllBooking() {
  let { data, error } = await supabase.from("booking").select("*");

  if (error) {
    console.error(error);
    throw new Error("Booking options could not be loaded");
  }
  return data;
}

export async function getAllAmenitiesById(booking_id) {
  let { data: amenities, error } = await supabase
    .from("booking_amenities")
    .select(
      `
      amenity_id,
      amenities (amenity)
    `
    )
    .eq("booking_id", booking_id);

  if (error) {
    throw new Error("We could not load the amenities");
  }

  return amenities;
}

export async function deleteBookingById(booking_id) {
  const { error } = await supabase
    .from("booking")
    .delete()
    .eq("booking_id", booking_id);

  if (error) {
    throw new Error("We could not delete the booking item");
  }
}

export async function updateBookingById({ booking_id, ...formData }) {
  const { data, error } = await supabase
    .from("booking")
    .update(formData) //pass an object with all the data matching the columns names
    .eq("booking_id", booking_id);

  if (error) throw new Error("We could not update the selected item.");
}

export async function addNewBooking({ imageFile, ...formData }) {
  let booking_id = Date.now();

  // 1. Extract the actual file name (not the FileList object)
  // image is a FileList, so we access the first file
  console.log(imageFile.name);

  const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
  const imagePath = `https://ryesuiscgjwqoanptuwr.supabase.co/storage/v1/object/public/bookingimages/${imageName}`;

  // 2. Add image path and booking ID to formData
  formData = { ...formData, image: imagePath, booking_id: booking_id };

  // 3. Insert booking data into the database
  const { data, error } = await supabase
    .from("booking")
    .insert([formData])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  // 4. Upload the image to Supabase storage
  const { error: storageError } = await supabase.storage
    .from("bookingimages")
    .upload(imageName, imageFile);

  if (storageError) {
    console.error(storageError);
    throw new Error("Image upload failed");
  }
}
