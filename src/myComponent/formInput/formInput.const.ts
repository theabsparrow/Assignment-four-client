export type TValue = {
  value: string | boolean;
  label: string;
};

export const sortingOrderInfo: TValue[] = [
  { value: "-deliveryCost", label: "Delivery Cost(desc)" },
  { value: "-totalPrice", label: "Total Price(desc)" },
  { value: "deliveryCost", label: "Delivery Cost" },
  { value: "totalPrice", label: "Total Price" },
];
