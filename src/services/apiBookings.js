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
    throw new Error("We could not add the new amenity");
  }
  for (const key in localStorage) {
    if (localStorage.getItem(key) === booking_id) {
      localStorage.removeItem(booking_id);
    }
  }
  localStorage.removeItem(booking_id);
}

export async function updateBookingById({ booking_id, ...formData }) {
  const { data, error } = await supabase
    .from("booking")
    .update(formData)
    .eq("booking_id", booking_id);

  if (error) throw new Error("We could not update the selected item.");
}

async function addNewAmenities(amenities) {
  const { data, error } = await supabase
    .from("booking_amenities")
    .insert(amenities);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
}

export async function addNewBooking({ imageFile, amenities, ...formData }) {
  let booking_id = Date.now();

  const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
  const imagePath = `https://ryesuiscgjwqoanptuwr.supabase.co/storage/v1/object/public/bookingimages/${imageName}`;

  formData = { ...formData, image: imagePath, booking_id: booking_id };

  const { data, error } = await supabase
    .from("booking")
    .insert([formData])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  console.log(amenities);

  let booking_amenities = amenities.map((amenity_id) => ({
    booking_id,
    amenity_id,
  }));
  console.log(booking_amenities);

  await addNewAmenities(booking_amenities);

  const { error: storageError } = await supabase.storage
    .from("bookingimages")
    .upload(imageName, imageFile);

  if (storageError) {
    console.error(storageError);
    throw new Error("Image upload failed");
  }
}
