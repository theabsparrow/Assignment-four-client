export type TValue = {
  value: string | boolean;
  label: string;
};

export const sortingOrders: TValue[] = [
  { value: "-price", label: "Price (desc)" },
  { value: "-year", label: "Year (desc)" },
  { value: "-brand", label: "Brand (desc)" },
  { value: "price", label: "Price" },
  { value: "year", label: "Year" },
  { value: "brand", label: "Brand" },
];

export const sortingOrderInfo: TValue[] = [
  { value: "-deliveryCost", label: "Delivery Cost(desc)" },
  { value: "-totalPrice", label: "Total Price(desc)" },
  { value: "deliveryCost", label: "Delivery Cost" },
  { value: "totalPrice", label: "Total Price" },
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
