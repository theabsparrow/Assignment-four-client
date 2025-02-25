import { TCarInfo } from "@/interface/carsInfo";
import { useGetCarQuery } from "@/redux/features/car/carApi";

const useGetAllCars = (fields?: string[]) => {
  const { data, error, isLoading, refetch } = useGetCarQuery(undefined);
  const meta = data?.data?.meta;
  const cars = Array.isArray(data?.data?.result)
    ? (data.data.result as TCarInfo[])
    : [];
  const carData =
    fields && cars.length > 0
      ? cars.map((car) =>
          fields.reduce((acc, field) => {
            const key = field as keyof TCarInfo;
            if (car[key] !== undefined) {
              acc[field] = car[key];
            }
            return acc;
          }, {} as Record<string, unknown>)
        )
      : cars;
  return { carData, meta, error, isLoading, refetch };
};

export default useGetAllCars;
