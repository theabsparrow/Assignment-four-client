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
      providesTags: ["tracking"],
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
      providesTags: ["tracking"],
    }),

    orderDetails: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["tracking"],
    }),

    orderTracking: builder.mutation({
      query: (trackingInfo) => ({
        url: `/order/tracking/${trackingInfo.orderId}`,
        method: "PATCH",
        body: { isTracking: trackingInfo.isTracking },
      }),
      invalidatesTags: ["tracking"],
    }),
    deleteMyOrder: builder.mutation({
      query: (id) => (
        console.log(id),
        {
          url: `/order/delete-myOrder/${id}`,
          method: "PATCH",
        }
      ),
      invalidatesTags: ["tracking"],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
export const { useVerifyOrderQuery } = orderApi;
export const { useOrderDetailsQuery } = orderApi;
export const { useOrderTrackingMutation } = orderApi;
export const { useGetMyOrdersQuery } = orderApi;
export const { useDeleteMyOrderMutation } = orderApi;
