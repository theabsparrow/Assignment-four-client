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
    getSingleCar: builder.query({
      query: (args) => ({
        url: `/cars/${args}`,
        method: "GET",
      }),
      providesTags: ["car"],
    }),
    updateCar: builder.mutation({
      query: (carInfo) => ({
        url: `/cars/update-info/${carInfo?.id}`,
        method: "PATCH",
        body: carInfo.carInfo,
      }),
      invalidatesTags: ["car"],
    }),
    updateGalleryImage: builder.mutation({
      query: (imageInfo) => ({
        url: `/cars/update-image/${imageInfo?.id}`,
        method: "PATCH",
        body: imageInfo?.imageInfo,
      }),
      invalidatesTags: ["car"],
    }),
    removeGalleryImage: builder.mutation({
      query: (imageInfo) => (
        console.log(imageInfo),
        {
          url: `/cars/delete-image/${imageInfo?.id}`,
          method: "DELETE",
          body: imageInfo?.imageInfo,
        }
      ),
      invalidatesTags: ["car"],
    }),
    deleteCar: builder.mutation({
      query: (params) => (
        console.log(params),
        {
          url: `/cars/delete/${params?.id}`,
          method: "DELETE",
        }
      ),
      invalidatesTags: ["car"],
    }),
  }),
});

export const { useGetCarQuery } = carApi;
export const { useAddCarMutation } = carApi;
export const { useGetSingleCarQuery } = carApi;
export const { useUpdateCarMutation } = carApi;
export const { useUpdateGalleryImageMutation } = carApi;
export const { useRemoveGalleryImageMutation } = carApi;
export const { useDeleteCarMutation } = carApi;
