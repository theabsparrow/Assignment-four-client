export type TMenuItems = {
  setDisplay?: (value: boolean) => void;
  display?: boolean;
  path: string;
  label: string;
  icon?: React.ElementType;
};
