export type TGender = {
  value: string;
  label: string;
};

export const genders: TGender[] = [
  { value: "", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];
