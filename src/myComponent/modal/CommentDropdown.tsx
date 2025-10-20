import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PiDotsThreeBold } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const CommentDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section ref={dropdownRef}>
      <div
        className="absolute right-0 top-[30%] opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
        onMouseEnter={(e) => e.stopPropagation()}
      >
        <button
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <BsThreeDots />
        </button>
      </div>
      <div className="md:hidden " onMouseEnter={(e) => e.stopPropagation()}>
        <button
          className="cursor-pointer p-2 bg-gray-300 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <PiDotsThreeBold />
        </button>
      </div>

      {open && (
        <div className="absolute w-[8vw] right-0 bg-gray-400 dark:bg-gray-800 shadow-xl rounded-lg py-1 z-50 border border-gray-400 overflow-hidden">
          <button className="flex items-center w-full gap-4 text-sm hover:bg-gray-200 py-1 px-2 cursor-pointer duration-500">
            <CiEdit className="text-xl" /> Edit
          </button>
          <button className="flex items-center w-full gap-4 text-sm hover:bg-gray-200 py-1 px-2 cursor-pointer duration-500">
            <MdDeleteOutline className="text-xl" /> Delete
          </button>
        </div>
      )}
    </section>
  );
};

export default CommentDropdown;
