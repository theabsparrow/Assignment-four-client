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
    orderDetails: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
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
  }),
});

export const { useCreateOrderMutation } = orderApi;
export const { useVerifyOrderQuery } = orderApi;
export const { useOrderDetailsQuery } = orderApi;
export const { useOrderTrackingMutation } = orderApi;
