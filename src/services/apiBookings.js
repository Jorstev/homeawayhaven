import supabase from "./supabase";

export async function getAllBooking() {
  let { data, error } = await supabase.from("booking").select("*");

  if (error) {
    console.error(error);
    throw new Error("Booking options could not be loaded");
  }
  return data;
}
