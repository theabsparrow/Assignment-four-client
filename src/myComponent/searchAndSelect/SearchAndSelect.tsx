import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export type TSearchSelectProps = {
  options: string[];
  label: string;
  name: string;
  setValue: (value: string) => void;
  selectedBrand: string;
};

const SearchAndSelect = ({
  options,
  label,
  name,
  setValue,
  selectedBrand,
}: TSearchSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterOptions = options
    .sort((a, b) => a.localeCompare(b))
    .filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSelect = (option: string) => {
    setValue(option);
    setSearchTerm("");
    setDropDownOpen(false);
  };

  useEffect(() => {
    if (dropDownOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [dropDownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative font-inter">
      <h1 className="text-gray-500 font-semibold hidden lg:block">
        * {label}:
      </h1>
      <div
        className="p-1 lg:p-2 w-full rounded cursor-pointer bg-gray-50 dark:bg-gray-800 border"
        onClick={(e) => {
          setDropDownOpen(!dropDownOpen);
          e.stopPropagation();
        }}
      >
        <h1 className="whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-2 text-sm lg:text-base">
          {selectedBrand || `Select a ${name}`}{" "}
          <RiArrowDropDownLine className="text-xl lg:text-2xl" />
        </h1>
      </div>
      {dropDownOpen && (
        <div
          ref={dropDownRef}
          className="absolute z-10 border bg-white dark:bg-gray-900 shadow-lg mt-1 rounded max-h-60 overflow-y-auto"
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
            {filterOptions.length > 0 ? (
              filterOptions.map((option) => (
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
      <input type="hidden" />
    </div>
  );
};

export default SearchAndSelect;
