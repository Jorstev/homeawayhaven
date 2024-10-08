function InputField({
  fieldName,
  registerName,
  validation,
  type,
  errors,
  placeholder,
  register,
  value,
  disable = false,
  step,
  valueAsNumberBoolean,
  selection = false,
  children,
  discountEnable,
  setDiscountEnable,
}) {
  return (
    <div>
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between w-72  md:w-96 mb-8`}
      >
        <label className="font-light">{fieldName}</label>

        {selection ? (
          <select
            className={`bg-gray-100 rounded-lg py-2 outline-none ${
              errors?.[registerName] ? "border border-red-500" : ""
            } ${fieldName === "CVV" ? "w-14 px-2" : "px-8"}`}
            {...register(registerName)}
            onChange={(e) => setDiscountEnable(e.target.value === "true")}
          >
            {children}
          </select>
        ) : (
          <input
            className={`bg-gray-100 rounded-lg py-2 outline-none ${
              errors?.[registerName] ? "border border-red-500" : ""
            } ${fieldName === "CVV" ? "w-14 px-2" : "px-8"} `}
            value={value}
            type={type}
            placeholder={placeholder}
            {...register(registerName, {
              ...validation,
              valueAsNumber: valueAsNumberBoolean,
            })}
            disabled={disable}
            step={step}
          />
        )}
      </div>
      <div className="text-end">
        {errors?.[registerName]?.type === "required" && (
          <p className="text-red-500">⚠ This field is required</p>
        )}
        {errors?.[registerName]?.type === "pattern" && (
          <p className="text-red-500">⚠ Invalid format</p>
        )}

        {errors?.[registerName]?.type === "minLength" && (
          <p className="text-red-500">⚠ Card Number must be 16 numbers long</p>
        )}
      </div>
    </div>
  );
}

export default InputField;
