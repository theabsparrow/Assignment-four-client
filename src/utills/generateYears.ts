export const getPastYears = (numYears: number) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: numYears }, (_, i) =>
    (currentYear - i).toString()
  );
};
