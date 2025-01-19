export const calPriceUnit = (price: number) => {
  return new Intl.NumberFormat("ko-KR", {
    notation: "compact",
    maximumFractionDigits: 3,
  }).format(price * 10000);
};
