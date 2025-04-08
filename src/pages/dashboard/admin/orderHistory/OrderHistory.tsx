import { useState } from "react";
import { myOrderInitialState } from "../../user/myOrders/myOrder.initailState";
import {
  useGetAllOrdersQuery,
  useOrderStatusMutation,
  useTrackingStatusMutation,
} from "@/redux/features/order/orderApi";
import TableSceleton from "@/myComponent/loader/TableSceleton";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { allOrderTableComumn } from "./AllOrderTableColumn";
import {
  deliveryMethod,
  orderStatus,
  paymentMethod,
  paymentOption,
} from "../../user/myOrders/myOrder.const";
import {
  sortingOrderInfo,
  TValue,
} from "@/myComponent/formInput/formInput.const";
import { toast } from "sonner";
import { TTrackingStatus } from "../../user/myOrders/myOrder.interface";

const OrderHistory = () => {
  const [filter, setFilter] = useState(myOrderInitialState);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sort, setSelectedSortingOrder] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderStatusChange] = useOrderStatusMutation();
  const [trackingStatusChange] = useTrackingStatusMutation();

  const queryParams = {
    fields: [
      "status",
      "userEmail",
      "deliveryMethod",
      "paymentMethod",
      "paymentOption",
      "orderID",
      "transactionStatus",
      "tracking",
      "deliveryCost",
      "totalPrice",
    ],
    filter: filter || {},
    searchTerm: searchText || "",
    sort: sort || "",
    page: page || 1,
    limit: limit || 10,
  };

  const { data, isLoading } = useGetAllOrdersQuery(queryParams);
  const allOrders = data?.data?.result;
  const meta = data?.data?.meta;
  const pageNumbers = Array.from({ length: meta?.totalPage }, (_, i) => i + 1);

  const handleFilterChange = (name: string, value: string) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setLimit(meta?.limit);
  };

  const handleDelete = (id: string) => {
    setIsModalOpen(true);
    setDeleteOrderId(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteOrderId(null);
  };

  const handelReset = () => {
    setFilter(myOrderInitialState);
    setSearchText("");
    setPage(1);
  };

  const confirmDelete = async () => {
    if (!deleteOrderId) {
      return setErrorMessage("Faild to delete. Please try again letter");
    }
    console.log(deleteOrderId);
    // const toastId = toast.loading("car data deleting.....");
    // try {
    //   const id = deleteOrderId;
    //   const res = await deleteMyOrder(id).unwrap();
    //   if (res?.success) {
    //     toast.success("order deleted successfully ", {
    //       id: toastId,
    //       duration: 3000,
    //     });
    //     setIsModalOpen(false);
    //   }
    // } catch (error: any) {
    //   const errorInfo =
    //     error?.data?.errorSource[0].message ||
    //     error?.data?.message ||
    //     error?.error ||
    //     "Something went wrong!";
    //   toast.error(errorInfo, { id: toastId, duration: 3000 });
    // }
  };

  const changeOrderStatus = async (id: string, status: string) => {
    const orderInfo = {
      id,
      status,
    };
    const toastID = "orderStatus";
    try {
      toast.loading("changing order status", { id: toastID });
      const res = await orderStatusChange(orderInfo).unwrap();
      if (res?.data) {
        toast.success(res?.message, { id: toastID });
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastID, duration: 3000 });
    }
  };

  const changeTrackingStatus = async (id: string, status: TTrackingStatus) => {
    const info = {
      id,
      status,
    };
    const toastID = "trackingStatus";
    try {
      toast.loading("updating tracking status", { id: toastID });
      const res = await trackingStatusChange(info).unwrap();
      if (res?.data) {
        toast.success(res?.message, { id: toastID });
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastID, duration: 3000 });
    }
  };

  const table = useReactTable({
    data: allOrders,
    columns: allOrderTableComumn({
      handleDelete,
      changeOrderStatus,
      changeTrackingStatus,
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <TableSceleton rows={11} columns={9}></TableSceleton>;

  return (
    <>
      {isModalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center font-inter"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this car?
            </h3>
            {errorMessage && (
              <h1 className="text-red-600 text-sm text-center mb-4">
                {errorMessage}
              </h1>
            )}
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
      <div className="mb-4 font-inter">
        <h2 className="text-2xl font-bold mb-4">Order listing</h2>
        <h1 className="text-xl">Total Orders: {allOrders.length}</h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 font-inter">
        <input
          type="text"
          placeholder="Search by order id or email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded outline-none"
        />

        <select
          value={filter.status}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("status", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">Order Status</option>
          {orderStatus.map((status, index) => (
            <option key={index} value={status as string}>
              {status as string}
            </option>
          ))}
        </select>

        <select
          value={filter.deliveryMethod}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("deliveryMethod", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">Delivery Methods</option>
          {deliveryMethod.map((item, index) => (
            <option key={index} value={item as string}>
              {item as string}
            </option>
          ))}
        </select>
        <select
          value={filter.paymentMethod}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("paymentMethod", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">Payment Methods</option>
          {paymentMethod.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={filter.paymentOption}
          onChange={(e) => {
            const value = e.target.value;
            handleFilterChange("paymentOption", value);
          }}
          className="border p-2 rounded outline-none"
        >
          <option value="">Payment Options</option>
          {paymentOption.map((item) => (
            <option key={item} value={item as string}>
              {item as string}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSelectedSortingOrder(e.target.value)}
          className="border p-2 rounded outline-none"
        >
          <option value="select category">Sort by</option>
          {sortingOrderInfo.map((sortingOrder: TValue) => (
            <option
              key={sortingOrder.value as string}
              value={sortingOrder.value as string}
              className="dark:bg-gray-700"
            >
              {sortingOrder.label}
            </option>
          ))}
        </select>
        <div>
          <button
            onClick={handelReset}
            className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition "
          >
            Reset
          </button>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-visible md:w-[75vw] pb-[122px]">
        <table className=" border-collapse border border-gray-300 w-full  ">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-2 border text-left cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-700 ">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(meta.page - 1)}
          disabled={meta?.page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div>
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold border
              ${
                meta?.page === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(meta.page + 1)}
          disabled={meta?.page === meta.totalPage}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default OrderHistory;
