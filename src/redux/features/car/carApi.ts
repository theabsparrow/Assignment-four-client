import { baseApi } from "@/redux/api/baseApi";
import { TInitialState } from "./carSlice.type";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCar: builder.query({
      query: (args?: TInitialState) => {
        const params = new URLSearchParams();
        if (args) {
          const entries = Object.entries(args);
          for (const [key, value] of entries) {
            if (value) {
              params.append(key, value.toString());
            }
          }
        }
        return {
          url: "/cars/get-allCars",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["car"],
    }),

    getCarModel: builder.query({
      query: (args?: { [key: string]: string }) => {
        const params = new URLSearchParams();
        if (args?.brand) {
          params.append("brand", args.brand.toString());
        }
        return {
          url: "/cars/get-models",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["car"],
    }),

    getcarCategory: builder.query({
      query: (args?: { [key: string]: string }) => {
        const params = new URLSearchParams();
        if (args?.limit) {
          params.append("limit", args.limit.toString());
        }
        return {
          url: "/cars/get-categories",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["car"],
    }),

    getcarBrand: builder.query({
      query: (args?: { [key: string]: string }) => {
        const params = new URLSearchParams();
        if (args?.limit) {
          params.append("limit", args.limit.toString());
        }
        return {
          url: "/cars/get-brands",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["car"],
    }),

    addCar: builder.mutation({
      query: (carInfo) => ({
        url: "/cars/create-car",
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
      query: (imageInfo) => ({
        url: `/cars/delete-image/${imageInfo?.id}`,
        method: "DELETE",
        body: imageInfo?.imageInfo,
      }),
      invalidatesTags: ["car"],
    }),
    deleteCar: builder.mutation({
      query: (params) => ({
        url: `/cars/delete/${params?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["car"],
    }),
  }),
});

export const { useGetCarQuery } = carApi;
export const { useGetCarModelQuery } = carApi;
export const { useGetcarCategoryQuery } = carApi;
export const { useGetcarBrandQuery } = carApi;
export const { useAddCarMutation } = carApi;
export const { useGetSingleCarQuery } = carApi;
export const { useUpdateCarMutation } = carApi;
export const { useUpdateGalleryImageMutation } = carApi;
export const { useRemoveGalleryImageMutation } = carApi;
export const { useDeleteCarMutation } = carApi;
