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
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
export const { useVerifyOrderQuery } = orderApi;
