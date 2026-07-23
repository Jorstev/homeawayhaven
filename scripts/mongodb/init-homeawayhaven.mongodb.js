const dbName = process.env.MONGODB_DB || "homeawayhaven";
const database = db.getSiblingDB(dbName);
const numericTypes = ["double", "int", "long", "decimal"];

function stringifyLogValue(value) {
  return JSON.stringify(value);
}

function ensureCollection(name, validator, validationLevel = "strict") {
  const exists = database.getCollectionInfos({ name }).length > 0;

  if (!exists) {
    database.createCollection(name, {
      validator,
      validationLevel,
      validationAction: "error",
    });
    print(`Created collection: ${name}`);
    return;
  }

  const result = database.runCommand({
    collMod: name,
    validator,
    validationLevel,
    validationAction: "error",
  });

  if (!result.ok) {
    throw new Error(
      `Could not update validator for ${name}: ${stringifyLogValue(result)}`
    );
  }

  print(`Updated collection validator: ${name}`);
}

function ensureIndex(collectionName, key, options = {}) {
  database.getCollection(collectionName).createIndex(key, options);
  print(
    `Ensured index on ${collectionName}: ${stringifyLogValue(key)}${
      options.name ? ` (${options.name})` : ""
    }`
  );
}

const bookingsValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: [
      "title",
      "country",
      "description",
      "classification",
      "luxury",
      "maxCapacity",
      "numBeds",
      "checkoutTime",
      "pricing",
      "image",
      "amenities",
      "status",
      "createdAt",
      "updatedAt",
    ],
    additionalProperties: false,
    properties: {
      _id: { bsonType: "objectId" },
      legacyBookingId: {
        bsonType: ["long", "int", "string"],
        description: "Legacy booking_id from Supabase/frontend if you keep it during migration",
      },
      title: {
        bsonType: "string",
        minLength: 3,
        maxLength: 120,
      },
      country: {
        bsonType: "string",
        minLength: 2,
        maxLength: 80,
      },
      location: {
        bsonType: "object",
        additionalProperties: false,
        properties: {
          countryCode: {
            bsonType: "string",
            minLength: 2,
            maxLength: 3,
          },
          coordinates: {
            bsonType: "object",
            required: ["type", "coordinates"],
            additionalProperties: false,
            properties: {
              type: {
                enum: ["Point"],
              },
              coordinates: {
                bsonType: "array",
                minItems: 2,
                maxItems: 2,
                items: {
                  bsonType: numericTypes,
                },
              },
            },
          },
        },
      },
      description: {
        bsonType: "string",
        minLength: 10,
        maxLength: 4000,
      },
      classification: {
        enum: ["cabin", "hotel", "house"],
      },
      luxury: {
        bsonType: "bool",
      },
      maxCapacity: {
        bsonType: ["int", "long"],
        minimum: 1,
      },
      numBeds: {
        bsonType: ["int", "long"],
        minimum: 1,
      },
      checkoutTime: {
        bsonType: "string",
        pattern: "^([01][0-9]|2[0-3]):[0-5][0-9]$",
      },
      pricing: {
        bsonType: "object",
        required: ["basePrice", "discountPercent", "finalPrice", "currency"],
        additionalProperties: false,
        properties: {
          basePrice: {
            bsonType: numericTypes,
            minimum: 0,
          },
          discountPercent: {
            bsonType: ["int", "long", "double", "decimal", "null"],
            minimum: 0,
            maximum: 100,
          },
          finalPrice: {
            bsonType: numericTypes,
            minimum: 0,
          },
          currency: {
            enum: ["USD"],
          },
        },
      },
      image: {
        bsonType: "object",
        required: ["filename", "mimeType", "sizeBytes", "data", "alt"],
        additionalProperties: false,
        properties: {
          filename: {
            bsonType: "string",
            minLength: 1,
            maxLength: 255,
          },
          mimeType: {
            bsonType: "string",
            pattern: "^image/",
          },
          sizeBytes: {
            bsonType: ["int", "long"],
            minimum: 1,
          },
          data: {
            bsonType: "binData",
          },
          legacySourceUrl: {
            bsonType: ["string", "null"],
            pattern: "^https?://",
          },
          alt: {
            bsonType: "string",
            minLength: 1,
            maxLength: 180,
          },
        },
      },
      amenities: {
        bsonType: "array",
        minItems: 1,
        items: {
          bsonType: "object",
          required: ["code", "label"],
          additionalProperties: false,
          properties: {
            code: {
              enum: [
                "wifi",
                "ac",
                "private_bathroom",
                "cable_tv",
                "parking",
                "laundry_facilities",
                "pet_friendly",
                "balcony",
              ],
            },
            label: {
              bsonType: "string",
              minLength: 1,
              maxLength: 80,
            },
          },
        },
      },
      status: {
        enum: ["active", "inactive", "archived"],
      },
      createdAt: { bsonType: "date" },
      updatedAt: { bsonType: "date" },
    },
  },
};

const reservationsValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: [
      "bookingId",
      "bookingSnapshot",
      "guest",
      "stay",
      "pricing",
      "payment",
      "status",
      "createdAt",
      "updatedAt",
    ],
    additionalProperties: false,
    properties: {
      _id: { bsonType: "objectId" },
      bookingId: { bsonType: "objectId" },
      bookingSnapshot: {
        bsonType: "object",
        required: ["title", "country", "imageUrl", "checkoutTime"],
        additionalProperties: false,
        properties: {
          title: { bsonType: "string", minLength: 1, maxLength: 120 },
          country: { bsonType: "string", minLength: 2, maxLength: 80 },
          imageUrl: { bsonType: "string", pattern: "^https?://" },
          checkoutTime: {
            bsonType: "string",
            pattern: "^([01][0-9]|2[0-3]):[0-5][0-9]$",
          },
        },
      },
      guest: {
        bsonType: "object",
        required: ["firstName", "lastName", "email"],
        additionalProperties: false,
        properties: {
          firstName: { bsonType: "string", minLength: 1, maxLength: 80 },
          lastName: { bsonType: "string", minLength: 1, maxLength: 80 },
          email: {
            bsonType: "string",
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          },
        },
      },
      stay: {
        bsonType: "object",
        required: ["checkIn", "checkOut", "guests"],
        additionalProperties: false,
        properties: {
          checkIn: { bsonType: "date" },
          checkOut: { bsonType: "date" },
          guests: {
            bsonType: ["int", "long"],
            minimum: 1,
          },
        },
      },
      pricing: {
        bsonType: "object",
        required: ["basePrice", "discountPercent", "finalPrice", "currency"],
        additionalProperties: false,
        properties: {
          basePrice: {
            bsonType: numericTypes,
            minimum: 0,
          },
          discountPercent: {
            bsonType: ["int", "long", "double", "decimal", "null"],
            minimum: 0,
            maximum: 100,
          },
          finalPrice: {
            bsonType: numericTypes,
            minimum: 0,
          },
          currency: {
            enum: ["USD"],
          },
        },
      },
      payment: {
        bsonType: "object",
        required: ["status", "provider"],
        additionalProperties: false,
        properties: {
          status: {
            enum: ["pending", "paid", "failed", "refunded"],
          },
          provider: {
            bsonType: "string",
            minLength: 1,
            maxLength: 40,
          },
          transactionId: {
            bsonType: ["string", "null"],
            maxLength: 120,
          },
          paidAt: {
            bsonType: ["date", "null"],
          },
        },
      },
      status: {
        enum: ["pending", "confirmed", "cancelled", "completed"],
      },
      createdAt: { bsonType: "date" },
      updatedAt: { bsonType: "date" },
    },
  },
};

const adminsValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: [
      "username",
      "email",
      "passwordHash",
      "role",
      "isActive",
      "createdAt",
    ],
    additionalProperties: false,
    properties: {
      _id: { bsonType: "objectId" },
      username: {
        bsonType: "string",
        minLength: 3,
        maxLength: 40,
        pattern: "^[A-Za-z0-9_]+$",
      },
      email: {
        bsonType: "string",
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      },
      passwordHash: {
        bsonType: "string",
        minLength: 20,
      },
      role: {
        enum: ["admin"],
      },
      isActive: { bsonType: "bool" },
      createdAt: { bsonType: "date" },
      updatedAt: { bsonType: ["date", "null"] },
      lastLoginAt: { bsonType: ["date", "null"] },
    },
  },
};

ensureCollection("bookings", bookingsValidator);
ensureCollection("reservations", reservationsValidator);
ensureCollection("admins", adminsValidator);

ensureIndex(
  "bookings",
  { legacyBookingId: 1 },
  {
    name: "uq_bookings_legacyBookingId",
    unique: true,
    partialFilterExpression: { legacyBookingId: { $exists: true } },
  }
);
ensureIndex(
  "bookings",
  { status: 1, luxury: 1, classification: 1, "pricing.discountPercent": 1 },
  { name: "idx_bookings_listing_filters" }
);
ensureIndex(
  "bookings",
  { "location.coordinates": "2dsphere" },
  {
    name: "idx_bookings_location_2dsphere",
    partialFilterExpression: { "location.coordinates": { $exists: true } },
  }
);

ensureIndex(
  "reservations",
  { bookingId: 1, "stay.checkIn": 1, "stay.checkOut": 1 },
  { name: "idx_reservations_booking_dates" }
);
ensureIndex(
  "reservations",
  { "guest.email": 1 },
  { name: "idx_reservations_guest_email" }
);
ensureIndex(
  "reservations",
  { status: 1, "payment.status": 1 },
  { name: "idx_reservations_status_payment" }
);

ensureIndex(
  "admins",
  { username: 1 },
  { name: "uq_admins_username", unique: true }
);
ensureIndex(
  "admins",
  { email: 1 },
  { name: "uq_admins_email", unique: true }
);

print(`MongoDB Atlas initialization complete for database: ${dbName}`);