import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: `/order/create-order/${orderInfo.carId}`,
        method: "POST",
        body: orderInfo.orderInfo,
      }),
    }),

    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify-order",
        method: "GET",
        params: { order_id },
      }),
      providesTags: ["orders"],
    }),

    getMyOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([Key, value]) => {
            if (Array.isArray(value)) {
              params.append(Key, value.join(","));
            } else if (typeof value === "object" && value !== null) {
              Object.entries(value).forEach(([subKey, subValue]) => {
                if (
                  subValue !== "" &&
                  subValue !== null &&
                  subValue !== undefined &&
                  subValue !== 0
                ) {
                  params.append(subKey, subValue);
                }
              });
            } else if (value !== undefined && value !== "") {
              params.append(Key, value!.toString());
            }
          });
        }
        return {
          url: "/order/my-orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orders"],
    }),

    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([Key, value]) => {
            if (Array.isArray(value)) {
              params.append(Key, value.join(","));
            } else if (typeof value === "object" && value !== null) {
              Object.entries(value).forEach(([subKey, subValue]) => {
                if (
                  subValue !== "" &&
                  subValue !== null &&
                  subValue !== undefined &&
                  subValue !== 0
                ) {
                  params.append(subKey, subValue);
                }
              });
            } else if (value !== undefined && value !== "") {
              params.append(Key, value!.toString());
            }
          });
        }
        return {
          url: "/order/all-orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orders"],
    }),

    orderDetails: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    orderTracking: builder.mutation({
      query: (trackingInfo) => ({
        url: `/order/tracking/${trackingInfo.orderId}`,
        method: "PATCH",
        body: { isTracking: trackingInfo.isTracking },
      }),
      invalidatesTags: ["orders"],
    }),

    orderStatus: builder.mutation({
      query: (orderInfo) => ({
        url: `/order/changeStatus/${orderInfo?.id}`,
        method: "PATCH",
        body: { status: orderInfo?.status },
      }),
      invalidatesTags: ["orders"],
    }),

    cancellMyOrder: builder.mutation({
      query: (id) => ({
        url: `/order/cancell-order/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),

    trackingStatus: builder.mutation({
      query: (info) => ({
        url: `/order/change-trackingStatus/${info?.id}`,
        method: "PATCH",
        body: { trackingStatus: info?.status },
      }),
      invalidatesTags: ["orders"],
    }),

    deleteMyOrder: builder.mutation({
      query: (id) => ({
        url: `/order/delete-myOrder/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
export const { useVerifyOrderQuery } = orderApi;
export const { useOrderDetailsQuery } = orderApi;
export const { useOrderTrackingMutation } = orderApi;
export const { useGetMyOrdersQuery } = orderApi;
export const { useDeleteMyOrderMutation } = orderApi;
export const { useGetAllOrdersQuery } = orderApi;
export const { useOrderStatusMutation } = orderApi;
export const { useTrackingStatusMutation } = orderApi;
export const { useCancellMyOrderMutation } = orderApi;
export const { useDeleteOrderMutation } = orderApi;
