const dbName = process.env.MONGODB_DB || "homeawayhaven";
const database = db.getSiblingDB(dbName);

const bookingsCollection = database.getCollection("bookings");
const reservationsCollection = database.getCollection("reservations");
const adminsCollection = database.getCollection("admins");

const placeholderImageBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wn8q9cAAAAASUVORK5CYII=";

function buildEmbeddedImage(filename, alt, legacySourceUrl) {
  return {
    filename,
    mimeType: "image/png",
    sizeBytes: 68,
    data: BinData(0, placeholderImageBase64),
    alt,
    legacySourceUrl,
  };
}

function upsertDocument(collection, filter, document, label) {
  const result = collection.replaceOne(filter, document, { upsert: true });
  const wasInserted = result.upsertedCount === 1;
  const wasUpdated = result.matchedCount === 1;

  print(
    `${label}: ${wasInserted ? "inserted" : wasUpdated ? "updated" : "unchanged"}`
  );
}

const bookingIds = {
  fullmoon: ObjectId("668900000000000000000001"),
  skyview: ObjectId("668900000000000000000002"),
  coral: ObjectId("668900000000000000000003"),
};

const reservationIds = {
  fullmoon: ObjectId("668900000000000000000101"),
  coral: ObjectId("668900000000000000000102"),
};

const adminId = ObjectId("668900000000000000000201");

const bookings = [
  {
    _id: bookingIds.fullmoon,
    legacyBookingId: "1721234567890",
    title: "Fullmoon Lodge",
    country: "Costa Rica",
    location: {
      countryCode: "CR",
      coordinates: {
        type: "Point",
        coordinates: [-84.0907, 9.9281],
      },
    },
    description:
      "Cabin surrounded by rainforest with private terrace, quiet atmosphere, and direct access to nearby trails.",
    classification: "cabin",
    luxury: false,
    maxCapacity: 2,
    numBeds: 1,
    checkoutTime: "11:00",
    pricing: {
      basePrice: 180,
      discountPercent: 10,
      finalPrice: 162,
      currency: "USD",
    },
    image: buildEmbeddedImage(
      "fullmoon-lodge.png",
      "Front view of Fullmoon Lodge",
      "https://ryesuiscgjwqoanptuwr.supabase.co/storage/v1/object/public/bookingimages/fullmoon-lodge.png"
    ),
    amenities: [
      { code: "wifi", label: "Wi-Fi" },
      { code: "ac", label: "A/C" },
      { code: "private_bathroom", label: "Private Bathroom" },
      { code: "balcony", label: "Balcony" },
    ],
    status: "active",
    createdAt: ISODate("2026-07-06T00:00:00.000Z"),
    updatedAt: ISODate("2026-07-06T00:00:00.000Z"),
  },
  {
    _id: bookingIds.skyview,
    legacyBookingId: "1721234567891",
    title: "Skyview Hotel",
    country: "Mexico",
    location: {
      countryCode: "MX",
      coordinates: {
        type: "Point",
        coordinates: [-99.1332, 19.4326],
      },
    },
    description:
      "Urban hotel suite with premium city views, concierge service, and walkable access to cultural landmarks.",
    classification: "hotel",
    luxury: true,
    maxCapacity: 4,
    numBeds: 2,
    checkoutTime: "12:00",
    pricing: {
      basePrice: 320,
      discountPercent: 0,
      finalPrice: 320,
      currency: "USD",
    },
    image: buildEmbeddedImage(
      "skyview-hotel.png",
      "Skyview Hotel exterior",
      "https://ryesuiscgjwqoanptuwr.supabase.co/storage/v1/object/public/bookingimages/skyview-hotel.png"
    ),
    amenities: [
      { code: "wifi", label: "Wi-Fi" },
      { code: "ac", label: "A/C" },
      { code: "cable_tv", label: "Cable TV" },
      { code: "parking", label: "Parking" },
    ],
    status: "active",
    createdAt: ISODate("2026-07-06T00:00:00.000Z"),
    updatedAt: ISODate("2026-07-06T00:00:00.000Z"),
  },
  {
    _id: bookingIds.coral,
    legacyBookingId: "1721234567892",
    title: "Coral House",
    country: "Panama",
    location: {
      countryCode: "PA",
      coordinates: {
        type: "Point",
        coordinates: [-79.5199, 8.9824],
      },
    },
    description:
      "Coastal house with spacious rooms, pet-friendly policy, and a short walk to the beach and marina.",
    classification: "house",
    luxury: false,
    maxCapacity: 6,
    numBeds: 3,
    checkoutTime: "10:30",
    pricing: {
      basePrice: 240,
      discountPercent: 15,
      finalPrice: 204,
      currency: "USD",
    },
    image: buildEmbeddedImage(
      "coral-house.png",
      "Coral House terrace",
      "https://ryesuiscgjwqoanptuwr.supabase.co/storage/v1/object/public/bookingimages/coral-house.png"
    ),
    amenities: [
      { code: "wifi", label: "Wi-Fi" },
      { code: "laundry_facilities", label: "Laundry Facilities" },
      { code: "pet_friendly", label: "Pet Friendly" },
      { code: "parking", label: "Parking" },
    ],
    status: "active",
    createdAt: ISODate("2026-07-06T00:00:00.000Z"),
    updatedAt: ISODate("2026-07-06T00:00:00.000Z"),
  },
];

const reservations = [
  {
    _id: reservationIds.fullmoon,
    bookingId: bookingIds.fullmoon,
    bookingSnapshot: {
      title: "Fullmoon Lodge",
      country: "Costa Rica",
      imageUrl:
        "https://ryesuiscgjwqoanptuwr.supabase.co/storage/v1/object/public/bookingimages/fullmoon-lodge.png",
      checkoutTime: "11:00",
    },
    guest: {
      firstName: "Jordan",
      lastName: "Chavarria",
      email: "jordan@example.com",
    },
    stay: {
      checkIn: ISODate("2026-08-10T00:00:00.000Z"),
      checkOut: ISODate("2026-08-14T00:00:00.000Z"),
      guests: 2,
    },
    pricing: {
      basePrice: 180,
      discountPercent: 10,
      finalPrice: 162,
      currency: "USD",
    },
    payment: {
      status: "paid",
      provider: "manual-seed",
      transactionId: "seed-payment-001",
      paidAt: ISODate("2026-07-06T00:00:00.000Z"),
    },
    status: "confirmed",
    createdAt: ISODate("2026-07-06T00:00:00.000Z"),
    updatedAt: ISODate("2026-07-06T00:00:00.000Z"),
  },
  {
    _id: reservationIds.coral,
    bookingId: bookingIds.coral,
    bookingSnapshot: {
      title: "Coral House",
      country: "Panama",
      imageUrl:
        "https://ryesuiscgjwqoanptuwr.supabase.co/storage/v1/object/public/bookingimages/coral-house.png",
      checkoutTime: "10:30",
    },
    guest: {
      firstName: "Maria",
      lastName: "Lopez",
      email: "maria@example.com",
    },
    stay: {
      checkIn: ISODate("2026-09-02T00:00:00.000Z"),
      checkOut: ISODate("2026-09-06T00:00:00.000Z"),
      guests: 4,
    },
    pricing: {
      basePrice: 240,
      discountPercent: 15,
      finalPrice: 204,
      currency: "USD",
    },
    payment: {
      status: "pending",
      provider: "manual-seed",
      transactionId: null,
      paidAt: null,
    },
    status: "pending",
    createdAt: ISODate("2026-07-06T00:00:00.000Z"),
    updatedAt: ISODate("2026-07-06T00:00:00.000Z"),
  },
];

const admin = {
  _id: adminId,
  username: "admin_homeawayhaven",
  email: "admin@homeawayhaven.com",
  passwordHash: "$2b$10$7EqJtq98hPqEX7fNZaFWoOHi6M.7Vw/4d9Z6k9Q0jrISFRCGDpa2a",
  role: "admin",
  isActive: true,
  createdAt: ISODate("2026-07-06T00:00:00.000Z"),
  updatedAt: ISODate("2026-07-06T00:00:00.000Z"),
  lastLoginAt: null,
};

bookings.forEach((booking) => {
  upsertDocument(bookingsCollection, { _id: booking._id }, booking, booking.title);
});

reservations.forEach((reservation) => {
  upsertDocument(
    reservationsCollection,
    { _id: reservation._id },
    reservation,
    `reservation:${reservation._id}`
  );
});

upsertDocument(
  adminsCollection,
  { _id: admin._id },
  admin,
  `admin:${admin.username}`
);

print(`Seed completed for database: ${dbName}`);