export type TValue = {
  value: string | boolean;
  label: string;
};

export const genders: TValue[] = [
  { value: "", label: "Select your gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];

export const conditions: TValue[] = [
  { value: "", label: "select condition" },
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

export const userSortingOrder: TValue[] = [
  { value: "-firstName", label: "Name (desc)" },
  { value: "-email", label: "Email (desc)" },
  { value: "-phoneNumber", label: "Phone (desc)" },
  { value: "firstName", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phoneNumber", label: "Phone " },
];

export const roles: TValue[] = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

export const statuses: TValue[] = [
  { value: "active", label: "Active" },
  { value: "deactive", label: "Deactive" },
];

export const iSDelete: TValue[] = [
  { value: "false", label: "False" },
  { value: "true", label: "True" },
];

export const isInStock: TValue[] = [
  { value: "true", label: "Available" },
  { value: "false", label: "Not Available" },
];
export const userRoles: TValue[] = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];
export const userStatus: TValue[] = [
  { value: "active", label: "Active" },
  { value: "deactive", label: "Deactive" },
];
