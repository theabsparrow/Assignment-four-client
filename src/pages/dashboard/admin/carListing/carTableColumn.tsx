import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useDeleteCarMutation } from "@/redux/features/car/carApi";
import { useState } from "react";
import { toast } from "sonner";
import { TCarInfo } from "@/interface/carInterface/car.interface";
import { formatPrice } from "@/utills/formatedPrice";
import { TbCurrencyTaka } from "react-icons/tb";
import { formatedDate } from "@/pages/myProfile/myProfile.utills";

export const carTableColumns = (): ColumnDef<TCarInfo>[] => [
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      const id = row.original._id;
      const model: string = row.original.model;
      const trimedModel =
        model.length > 15 ? model.slice(0, 15) + "..." : model;
      return (
        <div className="relative group inline-block">
          <h1>
            {" "}
            <Link
              to={`/admin/carDetails/${id}`}
              className="text-blue-600 hover:underline"
            >
              {trimedModel}
            </Link>
          </h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {model}
          </p>
        </div>
      );
    },
  },
  { accessorKey: "brand", header: "Brand" },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: string = row.original.category;
      const trimmedcategory =
        category.length > 10 ? category.slice(0, 10) + "..." : category;
      return (
        <div className="relative group inline-block">
          <h1>{trimmedcategory}</h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {category}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const condition: string = row.original.condition;
      const trimmedCondition =
        condition.length > 10 ? condition.slice(0, 10) + "..." : condition;
      return (
        <div className="relative group inline-block">
          <h1>{trimmedCondition}</h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {condition}
          </p>
        </div>
      );
    },
  },
  { accessorKey: "year", header: "Year" },
  {
    accessorKey: "madeIn",
    header: "Made In",
    cell: ({ row }) => {
      const country: string = row.original.madeIn;
      const trimmedCountry =
        country.length > 10 ? country.slice(0, 10) + "..." : country;
      return (
        <div className="relative group inline-block">
          <h1>{trimmedCountry}</h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {country}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
    cell: ({ row }) => (
      <span
        className={`${
          row.original.inStock
            ? "text-green-700 bg-green-300 rounded-xl p-1"
            : "text-red-700 bg-red-300 rounded-xl p-1"
        }`}
      >
        {row.original.inStock ? "Available" : "Not Available"}
      </span>
    ),
  },
  {
    accessorKey: "negotiable",
    header: "Negotiate",
    cell: ({ row }) => (
      <span
        className={`${
          row.original.negotiable
            ? "text-green-700 bg-green-300 rounded-xl p-1"
            : "text-red-700 bg-red-300 rounded-xl p-1"
        }`}
      >
        {row.original.negotiable ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = formatPrice(row.original?.price);
      return (
        <p className="flex items-center gap-1 text-lg">
          <TbCurrencyTaka /> {price}
        </p>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Creation",
    cell: ({ row }) => {
      const date = formatedDate(new Date(row?.original?.createdAt));

      return (
        <p className="flex flex-col ">
          <span>{date.creationDate}</span>
          <span>{date.creationTime}</span>
        </p>
      );
    },
  },

  {
    header: "Remove",
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [deleteCar] = useDeleteCarMutation();

      const handleDelete = (id: string) => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

      // delete functionality
      const confirmDelete = async () => {
        const toastId = toast.loading("car data deleting.....");
        try {
          const id = row.original._id;
          const res = await deleteCar({ id }).unwrap();
          if (res?.success) {
            toast.success("car data deleted successfully ", {
              id: toastId,
              duration: 3000,
            });
            setIsModalOpen(false);
          }
        } catch (error: any) {
          const errorInfo =
            error?.data?.message || error?.error || "Something went wrong!";
          toast.error(errorInfo, { id: toastId, duration: 3000 });
        }
      };
      return (
        <div>
          <button
            onClick={() => handleDelete(row.original._id)}
            className="px-2 py-1 bg-red-500 text-white rounded font-inter"
          >
            Delete
          </button>
          {isModalOpen && (
            <div
              onClick={closeModal}
              className="fixed inset-0 flex items-center justify-center "
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Are you sure you want to delete this car?
                </h3>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
];
