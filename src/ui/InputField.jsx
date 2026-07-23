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
  const inputWidthClass = fieldName === "CVV" ? "w-full md:max-w-[9rem]" : "w-full";

  return (
    <div className="w-full min-w-0">
      <div
        className={`mb-8 flex w-full min-w-0 flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between`}
      >
        <label className="font-light text-slate-900 md:shrink-0">{fieldName}</label>

        {selection ? (
          <select
            className={`${inputWidthClass} min-w-0 rounded-lg bg-gray-100 py-2 outline-none ${
              errors?.[registerName] ? "border border-red-500" : ""
            } ${fieldName === "CVV" ? "px-2" : "px-8"}`}
            {...register(registerName)}
            onChange={(e) => setDiscountEnable(e.target.value === "true")}
          >
            {children}
          </select>
        ) : (
          <input
            className={`${inputWidthClass} min-w-0 rounded-lg bg-gray-100 py-2 outline-none ${
              errors?.[registerName] ? "border border-red-500" : ""
            } ${fieldName === "CVV" ? "px-2" : "px-8"} `}
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
