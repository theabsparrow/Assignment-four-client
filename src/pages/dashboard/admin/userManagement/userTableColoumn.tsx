import { ColumnDef } from "@tanstack/react-table";
import { TExtendedUser } from "@/interface/userInterface/userInfo";
import imageIcon from "../../../../assets/profile-photo.png";
import { USER_ROLE } from "@/config/role.const";
import { toast } from "sonner";
import DeleteModal from "@/myComponent/modal/DeleteModal";
import { useDeleteUserMutation } from "@/redux/features/user/userApi";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

export const userTableColumns = (): ColumnDef<TExtendedUser>[] => [
  {
    accessorKey: "profileImage",
    header: "User",
    cell: ({ row }) => {
      const image = row.original?.profileImage;
      return (
        <div>
          {image ? (
            <img className="w-11 h-11 rounded-full " src={image as string} />
          ) : (
            <img className="w-12 h-12 rounded-full " src={imageIcon} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: " Name",
    cell: ({ row }) => {
      const fullName = `${row.original?.name.firstName} ${
        row.original?.name?.middleName && row.original?.name?.middleName
      } ${row.original?.name.lastName}`;
      const trimmedName =
        fullName.length > 15 ? fullName.slice(0, 15) + "..." : fullName;
      const id = row.original._id;
      return (
        <div className="relative group inline-block">
          <h1>
            {" "}
            <Link
              to={`/dashboard/admin/manage-users/${id}`}
              className="text-blue-600 hover:underline"
            >
              {trimmedName}
            </Link>
          </h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {fullName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
      const trimmedEmail =
        email.length > 20 ? email.slice(0, 20) + "..." : email;
      return (
        <div className="relative group inline-block">
          <h1>{trimmedEmail}</h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {email}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber;
      const trimmedPhone =
        phone.length > 14 ? phone.slice(0, 14) + "..." : phone;
      return (
        <div className="relative group inline-block">
          <h1>{trimmedPhone}</h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {phone}
          </p>
        </div>
      );
    },
  },
  { accessorKey: "gender", header: "Gender" },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      const date = row.original.dateOfBirth;
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`py-1 px-2 rounded-xl text-white ${
            status === "active" ? "bg-green-600 " : "bg-red-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <span
          className={`py-1 px-2 rounded-xl text-white ${
            role === USER_ROLE.admin ? "bg-blue-600 " : "bg-yellow-600"
          }`}
        >
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "verifyWithEmail",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.original.verifyWithEmail ? "Yes" : "No";
      return (
        <span
          className={`py-1 px-2 rounded-xl text-white ${
            verified === "Yes" ? "bg-green-600 " : "bg-yellow-600"
          }`}
        >
          {verified}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const user = useAppSelector(currentUser);
      const role = row.original.role;
      const [deleteUser] = useDeleteUserMutation();

      const confirmDelete = async (
        setOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
      ) => {
        setLoading(true);
        if (user?.userRole === USER_ROLE.admin && role === USER_ROLE.admin) {
          toast.error("you can`t delete an admin", { duration: 3000 });
          setLoading(false);
          return;
        }
        const toastId = toast.loading("user is deleting.....");
        try {
          const id = row.original._id;
          const res = await deleteUser(id).unwrap();
          if (res?.success) {
            toast.success("user data deleted successfully ", {
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
      return <DeleteModal confirmDelete={confirmDelete} label="this user ?" />;
    },
  },
];
