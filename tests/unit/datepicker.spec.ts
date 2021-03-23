import { mount } from '@vue/test-utils';
import DatePicker from '../../src/library';

test('mounts and displays the input field and 2 buttons', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(DatePicker, {
    propsData: {
      // msg: 'Hello world',
    },
  });

  expect(wrapper.element.querySelectorAll('button').length).toEqual(2);
  expect(wrapper.element.querySelectorAll('input').length).toEqual(1);
});

test('Datepicker is hidden by default', () => {
  // mount() returns a wrapped Vue component we can interact with
  const wrapper = mount(DatePicker, {
    propsData: {
      // msg: 'Hello world',
    },
  });

  expect(wrapper.vm.$data.showPicker).toEqual(false);
  expect(wrapper.element.querySelectorAll('.j-datepicker--picker').length).toEqual(0);
});

test('Datepicker opens when input is clicked', () => {
  const wrapper = mount(DatePicker, {});

  wrapper.find('input').trigger('click');

  expect(wrapper.vm.$data.showPicker).toEqual(true);
  expect(wrapper.find('.j-datepicker--modal')).not.toBeNull();
});
