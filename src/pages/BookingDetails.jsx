import { Link, useOutletContext, useParams } from "react-router-dom";
import HeartBookmark from "../ui/HeartBookmark";
import ReservationDetail from "../features/booking/ReservationDetail";
import Amenity from "../features/booking/Amenity";
import { getAllAmenitiesById } from "../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { IoLocationSharp } from "react-icons/io5";
import BookingMap from "../features/booking/BookingMap";

function BookingDetails() {
  const { booking_id } = useParams();
  const { bookings } = useOutletContext();
  const bookingDetails = bookings.find(
    (booking) => booking.booking_id === booking_id
  );

  const {
    isPending,
    isError,
    error,
    data: amenities,
  } = useQuery({
    queryKey: ["amenities", booking_id],
    queryFn: () => getAllAmenitiesById(booking_id),
    enabled: Boolean(booking_id && bookingDetails),
  });

  if (!bookingDetails) {
    return <span>Booking not found</span>;
  }

  const {
    title,
    country,
    countryCode,
    location,
    maxCapacity,
    description,
    price,
    discount,

    image,
    numBeds,
    checkout,
  } = bookingDetails;

  const descriptionFormatted = description.replace(/´/g, " ");

  const handlediscountPrice = (discount) => {
    if (discount === 0) {
      return null;
    } else {
      return (price - (discount / 100) * price).toFixed(2);
    }
  };

  const coordinates = location?.coordinates?.coordinates;
  const hasCoordinates = Array.isArray(coordinates) && coordinates.length === 2;
  const [lng = "", lat = ""] = hasCoordinates ? coordinates : [];
  const flagUrl = countryCode
    ? `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`
    : "";
  const finalPrice = discount !== 0 ? handlediscountPrice(discount) : price;

  return (
    <div className="min-w-[370px] bg-[radial-gradient(circle_at_top,_rgba(60,210,210,0.14),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_48%,_#ffffff_100%)] px-3 py-6 md:px-6 md:py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <section className="relative min-h-[26rem] overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(15,23,42,0.2)]">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={image}
          alt="booking-image"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.78),rgba(15,23,42,0.12)_50%,rgba(8,145,178,0.45))]"></div>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-5 py-6 text-white md:px-8 md:py-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium uppercase tracking-[0.22em] text-cyan-100/90">
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 backdrop-blur-sm">
                {country}
              </span>
              <span className="rounded-full border border-white/25 px-3 py-1 text-white/80">
                {bookingDetails.classification}
              </span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-100/90 md:text-base">
              {descriptionFormatted}
            </p>
          </div>

          <div className="w-full max-w-sm rounded-[1.75rem] border border-white/20 bg-white/12 p-5 backdrop-blur-md shadow-[0_18px_40px_rgba(15,23,42,0.2)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/90">
                  Reserve Now
                </p>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-4xl font-semibold">${finalPrice}</span>
                  {discount !== 0 && (
                    <span className="pb-1 text-sm text-slate-200 line-through">
                      ${price}
                    </span>
                  )}
                </div>
              </div>
              {flagUrl ? (
                <img
                  className="h-8 w-12 rounded-md object-cover shadow-lg"
                  src={flagUrl}
                  alt="country-image"
                />
              ) : null}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-100">
              <div className="rounded-2xl bg-black/15 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/80">
                  Guests
                </p>
                <p className="mt-1 text-lg font-semibold">{maxCapacity}</p>
              </div>
              <div className="rounded-2xl bg-black/15 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/80">
                  Check Out
                </p>
                <p className="mt-1 text-lg font-semibold">{checkout}</p>
              </div>
            </div>

            <Link
              to={`/booking/${booking_id}/payment`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:bg-cyan-100"
            >
              Reserve This Stay
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="space-y-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_22px_50px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-6 border-b border-slate-200/80 pb-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
                Stay Overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                Designed for a calm, high-comfort stay
              </h2>
            </div>
            <div className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm text-slate-700 shadow-inner shadow-cyan-100">
              {discount !== 0 ? `${discount}% promotional rate available` : "Standard nightly rate"}
            </div>
          </div>

          <div className="pt-6 text-base leading-8 text-slate-600">
            {descriptionFormatted}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_22px_50px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8">
          <div className="flex items-center justify-between gap-4 pb-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
                Reservation Details
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                Stay essentials at a glance
              </h3>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <ReservationDetail
              maxCapacity={maxCapacity}
              detail={"capacity"}
              checkout={checkout}
              numBeds={numBeds}
            />
            <ReservationDetail
              maxCapacity={maxCapacity}
              detail={"bed"}
              checkout={checkout}
              numBeds={numBeds}
            />
            <ReservationDetail
              maxCapacity={maxCapacity}
              detail={"time"}
              checkout={checkout}
              numBeds={numBeds}
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_22px_50px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8">
          <div className="pb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
              Amenities
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              Everything included with your stay
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {amenities?.map((amenity) => (
              <Amenity
                amenityValue={amenity.amenities.amenity}
                key={amenity.amenity_id}
              />
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_22px_50px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8 lg:hidden">
          <div className="flex items-center gap-3 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50">
              <IoLocationSharp color="#06b6d4" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
                Location
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">{country}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 pb-5 text-slate-600">
            {flagUrl ? (
              <img
                className="h-7 w-10 rounded-md object-cover shadow-md"
                src={flagUrl}
                alt="country-image"
              />
            ) : null}
            <span className="text-base font-medium">{country}</span>
          </div>
          {!hasCoordinates || (
            <BookingMap lat={lat} lng={lng} price={price} title={title} />
          )}
        </section>

        </div>

        <aside className="hidden lg:block lg:sticky lg:top-6">
          <section className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_22px_50px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8">
            <div className="flex items-center gap-3 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 shadow-inner shadow-cyan-100">
                <IoLocationSharp color="#06b6d4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
                  Location
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">{country}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-slate-600">
              {flagUrl ? (
                <img
                  className="h-7 w-10 rounded-md object-cover shadow-md"
                  src={flagUrl}
                  alt="country-image"
                />
              ) : null}
              <span className="text-sm font-medium">Explore the area around {title}</span>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200/80">
              {!hasCoordinates || (
                <BookingMap lat={lat} lng={lng} price={price} title={title} />
              )}
            </div>
          </section>
        </aside>
      </section>
      </div>
    </div>
  );
}

export default BookingDetails;
