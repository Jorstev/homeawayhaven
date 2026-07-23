import { FaParking } from "react-icons/fa";
import { IoWifi } from "react-icons/io5";
import { LiaStreetViewSolid } from "react-icons/lia";
import {
  MdBathtub,
  MdCheckCircleOutline,
  MdConnectedTv,
  MdCountertops,
  MdFitnessCenter,
  MdFreeBreakfast,
  MdHotTub,
  MdLocalLaundryService,
  MdOutlinePets,
  MdOutlinePool,
  MdOutlineSecurity,
} from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";

function Amenity({ amenityValue }) {
  const normalizedAmenity = amenityValue || "Amenity";
  const lowercaseAmenity = normalizedAmenity.toLowerCase();

  const resolveIcon = () => {
    if (lowercaseAmenity.includes("wifi")) {
      return <IoWifi className="text-lg" color="#3CD2D2" />;
    }

    if (
      lowercaseAmenity.includes("a/c") ||
      lowercaseAmenity.includes("air") ||
      lowercaseAmenity.includes("conditioning")
    ) {
      return <TbAirConditioning className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("bath")) {
      return <MdBathtub className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("tv")) {
      return <MdConnectedTv className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("park")) {
      return <FaParking className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("laundry")) {
      return <MdLocalLaundryService className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("pet")) {
      return <MdOutlinePets className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("balcony") || lowercaseAmenity.includes("view")) {
      return <LiaStreetViewSolid className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("pool")) {
      return <MdOutlinePool className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("kitchen")) {
      return <MdCountertops className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("breakfast")) {
      return <MdFreeBreakfast className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("gym") || lowercaseAmenity.includes("fitness")) {
      return <MdFitnessCenter className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("hot tub") || lowercaseAmenity.includes("jacuzzi")) {
      return <MdHotTub className="text-lg" color="#3CD2D2" />;
    }

    if (lowercaseAmenity.includes("security")) {
      return <MdOutlineSecurity className="text-lg" color="#3CD2D2" />;
    }

    return <MdCheckCircleOutline className="text-lg" color="#3CD2D2" />;
  };

  return (
    <div className="min-h-14 rounded-2xl border border-cyan-100 bg-[linear-gradient(180deg,_#f8fdff_0%,_#ecfeff_100%)] px-3 py-3 shadow-[0_12px_28px_rgba(165,243,252,0.22)] transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-center gap-2 text-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
          {resolveIcon()}
        </div>
        <div>
          <span className="text-xs font-medium text-slate-700 md:text-sm">
            {normalizedAmenity}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Amenity;
