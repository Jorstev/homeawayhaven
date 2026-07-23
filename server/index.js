import express from "express";
import cors from "cors";
import multer from "multer";
import { Binary, MongoClient, ObjectId } from "mongodb";

const app = express();
const port = Number(process.env.PORT || 3001);
const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "homeawayhaven";

if (!mongoUri) {
  throw new Error("MONGODB_URI is required to start the API server");
}

const client = new MongoClient(mongoUri);
const upload = multer({ storage: multer.memoryStorage() });

const amenityCatalog = {
  1: { code: "wifi", label: "Wi-Fi" },
  2: { code: "ac", label: "A/C" },
  3: { code: "private_bathroom", label: "Private Bathroom" },
  4: { code: "cable_tv", label: "Cable TV" },
  5: { code: "parking", label: "Parking" },
  6: { code: "laundry_facilities", label: "Laundry Facilities" },
  7: { code: "pet_friendly", label: "Pet Friendly" },
  8: { code: "balcony", label: "Balcony" },
};

const amenityCodeToId = Object.entries(amenityCatalog).reduce(
  (accumulator, [amenityId, amenity]) => {
    accumulator[amenity.code] = Number(amenityId);
    return accumulator;
  },
  {}
);

app.use(cors());
app.use(express.json({ limit: "10mb" }));

function getDatabase() {
  return client.db(dbName);
}

function getBookingsCollection() {
  return getDatabase().collection("bookings");
}

function getAmenitiesCollection() {
  return getDatabase().collection("amenities");
}

function getLocationsCollection() {
  return getDatabase().collection("locations");
}

function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;
  return String(value) === "true";
}

function normalizeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toDataUrl(image) {
  if (typeof image === "string") return image;

  if (image?.legacySourceUrl) return image.legacySourceUrl;

  if (!image?.data) return "";

  const buffer = Buffer.isBuffer(image.data.buffer)
    ? image.data.buffer
    : Buffer.from(image.data.buffer || image.data);

  return `data:${image.mimeType};base64,${buffer.toString("base64")}`;
}

function isDocumentReference(value) {
  return typeof value === "string" || value instanceof ObjectId;
}

function normalizeReferenceId(value) {
  if (typeof value === "string") return value;
  if (value instanceof ObjectId) return String(value);
  return null;
}

async function resolveLocationLookup(bookings) {
  const locationIds = [...new Set(
    bookings
      .map((booking) => normalizeReferenceId(booking.location))
      .filter(Boolean)
  )];

  if (locationIds.length === 0) {
    return new Map();
  }

  const objectIds = locationIds
    .filter((locationId) => ObjectId.isValid(locationId))
    .map((locationId) => new ObjectId(locationId));

  const locationDocuments = await getLocationsCollection()
    .find({
      $or: [
        { _id: { $in: objectIds } },
        { _id: { $in: locationIds } },
      ],
    })
    .toArray();

  return new Map(
    locationDocuments.map((locationDocument) => [
      String(locationDocument._id),
      locationDocument,
    ])
  );
}

function resolveBookingLocation(document, locationLookup = new Map()) {
  if (!document?.location) return null;

  if (isDocumentReference(document.location)) {
    return locationLookup.get(normalizeReferenceId(document.location)) || null;
  }

  return document.location;
}

function mapBookingDocument(document, locationLookup = new Map()) {
  const location = resolveBookingLocation(document, locationLookup);

  return {
    booking_id: String(document.legacyBookingId || document._id),
    title: document.title,
    country: location?.country || document.country,
    countryCode: location?.countryCode || "",
    location,
    maxCapacity: document.maxCapacity,
    description: document.description,
    price: document.pricing.basePrice,
    discount: document.pricing.discountPercent ?? 0,
    image: toDataUrl(document.image),
    numBeds: document.numBeds,
    checkout: document.checkoutTime,
    classification: document.classification,
    luxury: document.luxury,
  };
}

function formatAmenityCode(code) {
  if (!code) return "Amenity";

  return code
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeAmenityLabel(amenity) {
  if (typeof amenity === "string") return amenity;

  if (amenity?.label) return amenity.label;
  if (amenity?.amenity) return amenity.amenity;
  if (amenity?.name) return amenity.name;
  if (amenity?.code && amenityCatalog[amenityCodeToId[amenity.code]]?.label) {
    return amenityCatalog[amenityCodeToId[amenity.code]].label;
  }
  if (amenity?.code) return formatAmenityCode(amenity.code);

  return "Amenity";
}

function isAmenityReference(value) {
  return typeof value === "string" || value instanceof ObjectId;
}

function normalizeAmenityReferenceId(value) {
  if (typeof value === "string") return value;
  if (value instanceof ObjectId) return String(value);
  return null;
}

function mapAmenityOption(amenityDocument) {
  return {
    amenity_id:
      normalizeAmenityReferenceId(amenityDocument?._id) ||
      amenityDocument?.code ||
      amenityDocument?.label ||
      amenityDocument?.name,
    label: normalizeAmenityLabel(amenityDocument),
    code: amenityDocument?.code || null,
  };
}

async function resolveAmenitySelections(amenitySelections = []) {
  const normalizedSelections = (Array.isArray(amenitySelections)
    ? amenitySelections
    : [amenitySelections]
  )
    .map((amenitySelection) => String(amenitySelection))
    .filter(Boolean);

  if (normalizedSelections.length === 0) {
    return [];
  }

  const objectIds = normalizedSelections
    .filter((amenityId) => ObjectId.isValid(amenityId))
    .map((amenityId) => new ObjectId(amenityId));

  const amenityDocuments = await getAmenitiesCollection()
    .find({
      $or: [
        { _id: { $in: objectIds } },
        { _id: { $in: normalizedSelections } },
        { code: { $in: normalizedSelections } },
      ],
    })
    .toArray();

  const amenityLookup = new Map();

  amenityDocuments.forEach((amenityDocument) => {
    amenityLookup.set(String(amenityDocument._id), amenityDocument);

    if (amenityDocument.code) {
      amenityLookup.set(amenityDocument.code, amenityDocument);
    }
  });

  return normalizedSelections
    .map((amenitySelection) => {
      const amenityDocument = amenityLookup.get(amenitySelection);

      if (amenityDocument) {
        return amenityDocument._id;
      }

      return amenityCatalog[Number(amenitySelection)] || null;
    })
    .filter(Boolean);
}

async function mapAmenitiesResponse(document) {
  const rawAmenities = document.amenities || [];
  const referencedAmenityIds = rawAmenities
    .filter(isAmenityReference)
    .map(normalizeAmenityReferenceId)
    .filter(Boolean);

  const amenityLookup = new Map();

  if (referencedAmenityIds.length > 0) {
    const amenityDocuments = await getAmenitiesCollection()
      .find({
        $or: [
          {
            _id: {
              $in: referencedAmenityIds.filter((amenityId) => ObjectId.isValid(amenityId)).map(
                (amenityId) => new ObjectId(amenityId)
              ),
            },
          },
          {
            _id: {
              $in: referencedAmenityIds,
            },
          },
        ],
      })
      .toArray();

    amenityDocuments.forEach((amenityDocument) => {
      amenityLookup.set(String(amenityDocument._id), amenityDocument);
    });
  }

  return rawAmenities.map((amenity) => {
    const amenityReferenceId = normalizeAmenityReferenceId(amenity);
    const resolvedAmenity =
      amenityReferenceId ? amenityLookup.get(amenityReferenceId) || amenity : amenity;

    return {
      amenity_id:
        normalizeAmenityReferenceId(resolvedAmenity?._id) ||
        amenityCodeToId[resolvedAmenity?.code] ||
        resolvedAmenity?.code ||
        resolvedAmenity?.label ||
        amenityReferenceId || amenity,
      amenities: {
        amenity: normalizeAmenityLabel(resolvedAmenity),
      },
    };
  });
}

function buildBookingFilter(bookingId) {
  if (ObjectId.isValid(bookingId)) {
    return {
      $or: [{ legacyBookingId: bookingId }, { _id: new ObjectId(bookingId) }],
    };
  }

  return { legacyBookingId: bookingId };
}

async function buildBookingPayload({ body, file, existingBooking }) {
  const basePrice = normalizeNumber(body.price, existingBooking?.pricing.basePrice);
  const discountPercent = normalizeNumber(
    body.discount,
    existingBooking?.pricing.discountPercent ?? 0
  );
  const resolvedAmenities =
    body.amenities !== undefined
      ? await resolveAmenitySelections(body.amenities)
      : existingBooking?.amenities || [];

  const payload = {
    title: body.title ?? existingBooking?.title,
    country: body.country ?? existingBooking?.country,
    description: body.description ?? existingBooking?.description,
    classification: body.classification ?? existingBooking?.classification,
    luxury:
      body.luxury !== undefined
        ? normalizeBoolean(body.luxury)
        : existingBooking?.luxury,
    maxCapacity: normalizeNumber(
      body.maxCapacity,
      existingBooking?.maxCapacity
    ),
    numBeds: normalizeNumber(body.numBeds, existingBooking?.numBeds),
    checkoutTime: body.checkout ?? existingBooking?.checkoutTime,
    pricing: {
      basePrice,
      discountPercent,
      finalPrice: Number(
        (basePrice - (discountPercent / 100) * basePrice).toFixed(2)
      ),
      currency: "USD",
    },
    amenities: resolvedAmenities,
  };

  if (file) {
    payload.image = {
      filename: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      data: new Binary(file.buffer),
      alt: payload.title,
      legacySourceUrl: existingBooking?.image?.legacySourceUrl ?? null,
    };
  } else if (existingBooking?.image) {
    payload.image = existingBooking.image;
  }

  return payload;
}

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/countries/:name", async (request, response, next) => {
  try {
    const countryName = encodeURIComponent(request.params.name);
    const countryResponse = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    if (!countryResponse.ok) {
      return response.status(countryResponse.status).json({
        message: "Could not load country data",
      });
    }

    const countryData = await countryResponse.json();
    response.json(countryData);
  } catch (error) {
    next(error);
  }
});

app.get("/api/bookings", async (_request, response, next) => {
  try {
    const bookings = await getBookingsCollection()
      .find({ status: { $ne: "archived" } })
      .sort({ createdAt: -1 })
      .toArray();

    const locationLookup = await resolveLocationLookup(bookings);

    response.json(bookings.map((booking) => mapBookingDocument(booking, locationLookup)));
  } catch (error) {
    next(error);
  }
});

app.get("/api/bookings/:bookingId/amenities", async (request, response, next) => {
  try {
    const booking = await getBookingsCollection().findOne(
      buildBookingFilter(request.params.bookingId)
    );

    if (!booking) {
      return response.status(404).json({ message: "Booking not found" });
    }

    response.json(await mapAmenitiesResponse(booking));
  } catch (error) {
    next(error);
  }
});

app.get("/api/amenities", async (_request, response, next) => {
  try {
    const amenities = await getAmenitiesCollection().find({}).sort({ label: 1, code: 1 }).toArray();

    response.json(amenities.map(mapAmenityOption));
  } catch (error) {
    next(error);
  }
});

app.post(
  "/api/bookings",
  upload.single("image"),
  async (request, response, next) => {
    try {
      if (!request.file) {
        return response.status(400).json({ message: "Image file is required" });
      }

      const now = new Date();
      const bookingId = String(Date.now());
      const payload = await buildBookingPayload({
        body: request.body,
        file: request.file,
      });

      const document = {
        ...payload,
        legacyBookingId: bookingId,
        status: "active",
        createdAt: now,
        updatedAt: now,
      };

      await getBookingsCollection().insertOne(document);

      response.status(201).json(mapBookingDocument(document));
    } catch (error) {
      next(error);
    }
  }
);

app.patch("/api/bookings/:bookingId", async (request, response, next) => {
  try {
    const collection = getBookingsCollection();
    const filter = buildBookingFilter(request.params.bookingId);
    const existingBooking = await collection.findOne(filter);

    if (!existingBooking) {
      return response.status(404).json({ message: "Booking not found" });
    }

    const payload = await buildBookingPayload({
      body: request.body,
      existingBooking,
    });

    await collection.updateOne(filter, {
      $set: {
        ...payload,
        updatedAt: new Date(),
      },
    });

    const updatedBooking = await collection.findOne(filter);
    response.json(mapBookingDocument(updatedBooking));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/bookings/:bookingId", async (request, response, next) => {
  try {
    const result = await getBookingsCollection().deleteOne(
      buildBookingFilter(request.params.bookingId)
    );

    if (result.deletedCount === 0) {
      return response.status(404).json({ message: "Booking not found" });
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: error.message || "Internal server error" });
});

async function start() {
  await client.connect();
  app.listen(port, () => {
    console.log(`Atlas API listening on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Could not start Atlas API", error);
  process.exit(1);
});