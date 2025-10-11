export const formatPrice = (num: number) => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)} Billion`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)} Million`;
  } else {
    return num.toLocaleString();
  }
};
