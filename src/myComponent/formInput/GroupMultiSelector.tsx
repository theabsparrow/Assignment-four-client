import { useState } from "react";
import { TValue } from "./formInput.const";
import { IoCloseSharp } from "react-icons/io5";
import { DeliveryMethod } from "@/pages/dashboard/admin/addCar/addcar.interface";

type TGroupMultiSelectorProps = {
  methods: string[];
  estimatedTimes: TValue[];
  selectedGroup: DeliveryMethod[];
  setSelectedGroup: (value: DeliveryMethod[]) => void;
};

const GroupMultiSelector: React.FC<TGroupMultiSelectorProps> = ({
  methods,
  estimatedTimes,
  selectedGroup,
  setSelectedGroup,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedCost, setSelectedCost] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableMethods = methods.filter(
    (method) => !selectedGroup.some((group) => group.method === method)
  );

  const handleAddGroup = () => {
    if (selectedMethod && selectedCost !== null && selectedTime) {
      const newGroup = {
        method: selectedMethod,
        cost: selectedCost,
        estimatedTime: selectedTime,
      };

      setSelectedGroup([...selectedGroup, newGroup]);

      // Reset for next selection
      setSelectedMethod(null);
      setSelectedCost(null);
      setSelectedTime(null);
    }
  };

  const handleRemoveGroup = (item: DeliveryMethod) => {
    setSelectedGroup(
      selectedGroup.filter((group) => group.method !== item.method)
    );
  };
  return (
    <section className="border-y border-green-500 py-5 mt-5 font-inter">
      <h2 className="  font-semibold text-center text-xl">
        Select Delivery Methods
      </h2>

      {/* Display Selected Groups */}
      <header className="mb-2">
        {selectedGroup.length > 0 && (
          <h3 className="font-semibold text-lg text-gray-800 mb-3">
            Selected Groups:
          </h3>
        )}
        <div className="flex flex-wrap gap-4">
          {selectedGroup.map((group, index) => (
            <div
              key={index}
              className="bg-blue-100 flex items-start gap-4 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 border border-gray-300 rounded-lg p-4 shadow-sm w-full md:w-auto"
            >
              <div>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-gray-900">Method:</span>{" "}
                  {group.method}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-gray-900">Cost:</span> $
                  {group.cost}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-medium text-gray-900">
                    Estimated Time:
                  </span>{" "}
                  {group.estimatedTime}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveGroup(group)}
                className="hover:text-red-500 transition"
              >
                <IoCloseSharp size={20} />
              </button>
            </div>
          ))}
        </div>
      </header>

      <main>
        <div className=" grid grid-cols-3 space-x-5 py-2">
          <div>
            <p className="text-sm text-gray-800 mb-2">Delivery methods</p>
            <select
              value={selectedMethod || ""}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="border rounded px-4 py-2 w-full outline-none text-gray-600 dark:text-gray-300"
            >
              <option value="" disabled>
                Select Method
              </option>
              {availableMethods.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm text-gray-800 mb-2">Estimated time</p>
            <select
              value={selectedTime || ""}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border rounded px-4 py-2 w-full outline-none text-gray-600 dark:text-gray-300"
            >
              <option value="" disabled>
                Select Estimated Time
              </option>
              {estimatedTimes.map((item) => (
                <option key={`${item.label}`} value={item.value as string}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm text-gray-800 mb-2">Delivery cost</p>
            <input
              type="number"
              value={selectedCost || ""}
              onChange={(e) => setSelectedCost(Number(e.target.value))}
              className="border rounded px-4 py-[6px] w-full outline-none"
              placeholder="Enter Cost"
            />
          </div>
        </div>
        {/* Add Group Button */}
        <button
          onClick={handleAddGroup}
          disabled={!selectedMethod || selectedCost === null || !selectedTime}
          className={` px-4 py-2 rounded ${
            selectedMethod && selectedCost !== null && selectedTime
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Add Method
        </button>
      </main>
    </section>
  );
};

export default GroupMultiSelector;
