// eslint-disable-next-line arrow-body-style
export const getDateString = (date: Date): string => {
  return `${date.getFullYear()}/${`${date.getMonth() + 1}`.padStart(
    2,
    '0',
  )}/${`${date.getDate()}`.padStart(2, '0')}`;
};

export const getDiffDays = (from: Date, to: Date): number => {
  const diffTime = Math.abs(to.getTime() - from.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
