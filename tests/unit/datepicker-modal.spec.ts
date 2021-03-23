import { mount } from '@vue/test-utils';
import DatepickerModal from '../../src/DatepickerModal.vue';

// TODO: not passing yet
test('Sets the right date range when option is selected', () => {
  const wrapper = mount(DatepickerModal);

  // 2md options is 2 days
  const twoDaysButton = wrapper.find('.options :nth-child(2)');

  twoDaysButton.trigger('click');

  const date = new Date();
  date.setDate(date.getDate() - 2);

  const today = new Date();

  // expect(wrapper.vm.$data.privateDates).toEqual([date, today]);
  expect(wrapper.emitted()).not.toBeFalsy();
  console.log(wrapper.emitted());
  expect(wrapper.emitted()[0]).toEqual([[date, today]]);
});
