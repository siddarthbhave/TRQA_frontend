import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const Input = ({ label, id, type, required, register, errors, disabled }) => {
  return (
    <div>
      <label className="block text-md font-medium">{label}</label>
      <div className="my-4">
        <input
          id={id}
          type={type}
          {...register(id, { required })}
          className={clsx(
            `
                form-input block w-full rounded-md border-[1px] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-sm
                focus:ring-2
                focus:ring-inset
                focus:ring-black/80
                sm:text-sm
                sm:leading-6
                `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50"
          )}
          placeholder={`Enter your ${id}`}
        />
      </div>
    </div>
  );
};

export default Input;
