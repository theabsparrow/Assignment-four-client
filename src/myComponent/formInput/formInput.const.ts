export type TValue = {
  value: string;
  label: string;
};

export const genders: TValue[] = [
  { value: "", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

export const conditions: TValue[] = [
  { value: "", label: "Select a condition" },
  { value: "New", label: "New" },
  { value: "Used", label: "Used" },
  { value: "Certified Pre-Owned", label: "Certified Pre-Owned" },
];

export const sortingOrders: TValue[] = [
  { value: "-price", label: "Price (desc)" },
  { value: "-year", label: "Year (desc)" },
  { value: "-brand", label: "Brand (desc)" },
  { value: "price", label: "Price" },
  { value: "year", label: "Year" },
  { value: "brand", label: "Brand" },
];
