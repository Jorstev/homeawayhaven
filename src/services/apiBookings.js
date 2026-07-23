async function requestJson(path, options = {}) {
  const response = await fetch(path, options);

  if (!response.ok) {
    let message = "Request failed";

    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      // Keep the default message when the response body is not JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) return null;

  return response.json();
}

export async function getAllBooking() {
  return requestJson("/api/bookings");
}

export async function getAllAmenitiesById(booking_id) {
  return requestJson(`/api/bookings/${booking_id}/amenities`);
}

export async function getAllAmenities() {
  return requestJson("/api/amenities");
}

export async function deleteBookingById(booking_id) {
  await requestJson(`/api/bookings/${booking_id}`, {
    method: "DELETE",
  });

  for (const key in localStorage) {
    if (localStorage.getItem(key) === booking_id) {
      localStorage.removeItem(booking_id);
    }
  }
  localStorage.removeItem(booking_id);
}

export async function updateBookingById({ booking_id, ...formData }) {
  return requestJson(`/api/bookings/${booking_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

export async function addNewBooking({ imageFile, amenities, ...formData }) {
  const payload = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    payload.append(key, value);
  });

  amenities.forEach((amenityId) => {
    payload.append("amenities", amenityId);
  });

  payload.append("image", imageFile);

  return requestJson("/api/bookings", {
    method: "POST",
    body: payload,
  });
}
