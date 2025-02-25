import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCar: builder.query({
      query: () => ({
        url: "/cars/get-allCars",
        method: "GET",
      }),
    }),
    addCar: builder.mutation({
      query: (carInfo) => ({
        url: "/cars//create-car",
        method: "POST",
        body: carInfo,
      }),
    }),
  }),
});

export const { useGetCarQuery } = carApi;
export const { useAddCarMutation } = carApi;
