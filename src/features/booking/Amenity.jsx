import { FaParking } from "react-icons/fa";
import { IoWifi } from "react-icons/io5";
import { LiaStreetViewSolid } from "react-icons/lia";
import {
  MdBathtub,
  MdConnectedTv,
  MdLocalLaundryService,
  MdOutlinePets,
} from "react-icons/md";
import { PiPersonSimpleSwimFill } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";

function Amenity({ amenityValue }) {
  const type = {
    "Wi-Fi": <IoWifi className="text-lg" color="#3CD2D2" />,
    "A/C": <TbAirConditioning className="text-lg" color="#3CD2D2" />,
    "Private Bathroom": <MdBathtub className="text-lg" color="#3CD2D2" />,
    "Cable TV": <MdConnectedTv className="text-lg" color="#3CD2D2" />,
    Parking: <FaParking className="text-lg" color="#3CD2D2" />,
    "Laundry Facilities": (
      <MdLocalLaundryService className="text-lg" color="#3CD2D2" />
    ),

    "Pet Friendly": <MdOutlinePets className="text-lg" color="#3CD2D2" />,
    Balcony: <LiaStreetViewSolid className="text-lg" color="#3CD2D2" />,
  };
  return (
    <div className="h-12 w-auto border border-cyan-400 rounded-md flex items-center justify-center text-center space-x-2">
      <div>{type[amenityValue]}</div>
      <div>
        <span className="text-xs md:text-sm">{amenityValue}</span>
      </div>
    </div>
  );
}

export default Amenity;
