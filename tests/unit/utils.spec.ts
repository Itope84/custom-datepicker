import { getDateString, getDiffDays } from '../../src/utils/dates';

test('Returns the right string given date range', () => {
  expect(getDateString(new Date(2020, 11, 18))).toEqual('2020/12/18');
});

test('Returns the right difference in days', () => {
  expect(getDiffDays(new Date(2020, 11, 18), new Date(2020, 11, 21))).toEqual(3);
});
