import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCar: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([Key, value]) => {
            if (Array.isArray(value)) {
              params.append(Key, value.join(","));
            } else {
              params.append(Key, value as string);
            }
          });
        }
        return {
          url: "/cars/get-allCars",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["car"],
    }),
    addCar: builder.mutation({
      query: (carInfo) => ({
        url: "/cars//create-car",
        method: "POST",
        body: carInfo,
      }),
      invalidatesTags: ["car"],
    }),
  }),
});

export const { useGetCarQuery } = carApi;
export const { useAddCarMutation } = carApi;
