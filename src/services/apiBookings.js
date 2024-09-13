import supabase from "./supabase";

export async function getAllBooking() {
  let { data, error } = await supabase.from("booking").select("*");

  if (error) {
    console.error(error);
    throw new Error("Booking options could not be loaded");
  }
  return data;
}

// let { data: booking_amenities, error } = await supabase
//   .from("booking_amenities")
//   .select("amenity_id")
//   .eq("booking_id", booking_id);

export async function getAllAmenitiesById(booking_id) {
  let { data: amenities, error } = await supabase
    .from("booking_amenities")
    .select(
      `
      amenity_id,
      amenities (amenity)
    `
    )
    .eq("booking_id", booking_id); // Filter by booking_id in booking_amenities table

  if (error) {
    throw new Error("We could not load the amenities");
  }

  return amenities;
}
