import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";

type TSearchableDropdownProps = {
  name: string;
  options: string[];
  label?: string;
};

const AddCarSelectInput = ({
  name,
  options,
  label = "Select an option",
}: TSearchableDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const filteredOptions = options
    .sort((a, b) => a.localeCompare(b))
    .filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSelect = (option: string) => {
    setValue(name, option, { shouldValidate: true });
    setSearchTerm("");
    setIsDropdownOpen(false);
    clearErrors(name);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative font-inter">
        <label className="block font-semibold">* {label}:</label>
        <div
          className="border p-2 w-full rounded cursor-pointer bg-gray-50 dark:bg-gray-800"
          onClick={(e) => {
            setIsDropdownOpen(!isDropdownOpen);
            e.stopPropagation();
          }}
        >
          {watch(name) || `Select a ${label}`}
        </div>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full border bg-white dark:bg-gray-900 shadow-lg mt-1 rounded max-h-60 overflow-y-auto"
          >
            <input
              type="text"
              ref={inputRef}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-full border-b dark:bg-gray-800 dark:text-white outline-none"
            />
            <ul className="max-h-52 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option}
                    className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No results found</li>
              )}
            </ul>
          </div>
        )}
        <input
          type="hidden"
          {...register(name, {
            required: `${label} is required`,
          })}
        />
        {errors[name]?.message && (
          <span className="text-red-500 text-sm flex items-center gap-1">
            <AiFillWarning /> {errors[name]?.message as string}
          </span>
        )}
      </div>
    </>
  );
};

export default AddCarSelectInput;
