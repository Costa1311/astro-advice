export const getDestinyNumber = (dateString: string): number => {
  if (!dateString) return 0;
  const digits = dateString.replace(/\D/g, "");
  let sum = digits.split("").reduce((acc, d) => acc + parseInt(d), 0);

  // 11 и 22 — управляющие числа в нумерологии, их не сокращают
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0);
  }
  return sum;
};
