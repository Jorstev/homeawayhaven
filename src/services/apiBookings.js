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

export async function updateBookingById(booking_id) {
  const { data, error } = await supabase
    .from("booking")
    .update({ other_column: "otherValue" }) //pass an object with all the data matching the columns names
    .eq("booking_id", booking_id)
    .select();

  if (error) throw new Error("We could not update the selected item.");
}
