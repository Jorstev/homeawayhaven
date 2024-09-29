import { useDispatch } from "react-redux";
import { setAmenities } from "./bookingSlice";

function AmenityInput({ amenityValue }) {
  const dispatch = useDispatch();
  const type = {
    "Wi-Fi": 1,
    "A/C": 2,
    "Private Bathroom": 3,
    "Cable TV": 4,
    Parking: 5,
    "Laundry Facilities": 6,
    "Pet Friendly": 7,
    Balcony: 8,
  };
  return (
    <div className="h-12 w-auto border border-cyan-400 rounded-md flex items-center justify-center text-center space-x-2 px-2 shadow-md">
      <div>
        <input
          type="checkbox"
          value={type[amenityValue]}
          onClick={() => dispatch(setAmenities(type[amenityValue]))}
        />
      </div>
      <div>
        <span className="text-xs md:text-sm break-words">{amenityValue}</span>
      </div>
    </div>
  );
}

export default AmenityInput;
