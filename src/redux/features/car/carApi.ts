import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCar: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              params.append(key, value.join(","));
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
              params.append(key, value!.toString());
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
