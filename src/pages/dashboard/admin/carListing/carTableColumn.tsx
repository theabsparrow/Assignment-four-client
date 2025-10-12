import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useDeleteCarMutation } from "@/redux/features/car/carApi";
import { toast } from "sonner";
import { TCarInfo } from "@/interface/carInterface/car.interface";
import { formatPrice } from "@/utills/formatedPrice";
import { TbCurrencyTaka } from "react-icons/tb";
import DeleteModal from "@/myComponent/modal/DeleteModal";

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
              to={`/dashboard/admin/manage-cars/${id}`}
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
        category.length > 13 ? category.slice(0, 13) + "..." : category;
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
        condition.length > 15 ? condition.slice(0, 15) + "..." : condition;
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
        country.length > 15 ? country.slice(0, 15) + "..." : country;
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
    header: "Remove",
    cell: ({ row }) => {
      const [deleteCar] = useDeleteCarMutation();
      const confirmDelete = async (
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
      ) => {
        setLoading(true);
        const toastId = toast.loading("car data deleting.....");
        try {
          const id = row.original._id;
          const res = await deleteCar({ id }).unwrap();
          if (res?.success) {
            toast.success("car data deleted successfully ", {
              id: toastId,
              duration: 3000,
            });
            setOpen(false);
            setLoading(false);
          }
        } catch (error: any) {
          const errorInfo =
            error?.data?.message || error?.error || "Something went wrong!";
          toast.error(errorInfo, { id: toastId, duration: 3000 });
          setLoading(false);
        }
      };
      return <DeleteModal confirmDelete={confirmDelete} label="this car ?" />;
    },
  },
];
