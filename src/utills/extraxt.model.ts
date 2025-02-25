export type TCar = {
  brand: string;
  model: string;
};

export const exTractModel = (carData: TCar[]): Record<string, string[]> => {
  return carData.reduce((acc, car) => {
    if (!acc[car.brand]) acc[car.brand] = [];
    if (!acc[car.brand].includes(car.model)) acc[car.brand].push(car.model);
    return acc;
  }, {} as Record<string, string[]>);
};
