import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

type MultiSelectorProps = {
  options: string[];
  label: string;
  option: string[];
  setOptions: (value: string[]) => void;
};

const MultiSelector: React.FC<MultiSelectorProps> = ({
  options,
  label,
  option,
  setOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: string) => {
    if (!option.includes(item)) {
      setOptions([...option, item]);
    }
    setIsOpen(false);
  };

  const handleRemove = (item: string) => {
    setOptions(option.filter((i) => i !== item));
  };

  const availableOptions = options.filter((items) => !option.includes(items));

  return (
    <div className="relative w-full max-w-md">
      <p className="text-sm text-gray-800 mb-2">{label}</p>

      {/* Dropdown Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer bg-white dark:bg-gray-800 "
      >
        {option.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {option.map((item) => (
              <div
                key={item}
                className="text-sm flex items-center gap-2 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  className="hover:text-red-500 transition"
                >
                  <IoCloseSharp />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-600 dark:text-gray-300">
            {availableOptions.length > 0 ? "Select options" : "No more options"}
          </span>
        )}
        <FaChevronDown className="text-gray-500 dark:text-gray-400" />
      </div>

      {/* Dropdown List */}
      {isOpen && availableOptions.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {availableOptions.map((availableOption) => (
            <div
              key={availableOption}
              onClick={() => {
                handleSelect(availableOption);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-700 transition cursor-pointer text-gray-800 dark:text-gray-300"
            >
              {availableOption}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelector;
