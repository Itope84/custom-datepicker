<template>
  <div class="j-datepicker--modal">
    <div class="options">
      <button
        class="option"
        v-for="option in options"
        :key="option.days"
        @click="selectDate(option)"
      >Last {{option.text}}</button>
    </div>
    <b-datepicker
      v-model="privateDates"
      inline
      :min-date="minDate"
      :max-date="maxDate"
      range
    >
    </b-datepicker>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';

const optionDays = [1, 2, 7, 14, 30, 90, 180];

const DatePicker = Vue.extend({
  name: 'DatepickerModal',
  props: {
    dates: {
      type: Array as PropType<Array<number>>,
      default: () => [],
    },
  },
  model: {
    prop: 'dates',
    event: 'input',
  },

  data() {
    return {
      showPicker: false,
      privateDates: [] as Date[],
      // TODO: options can be a prop
      options: optionDays.map((option, index) => ({
        days: option,
        text: index < 2 ? `${option * 24} hours` : `${option} days`,
      })),
    };
  },
  watch: {
    dates: {
      immediate: true,
      deep: true,
      handler(val, prev) {
        if (val !== prev) this.privateDates = val;
      },
    },
    privateDates: {
      deep: true,
      handler(val, prev) {
        if (val !== prev) {
          this.$emit('input', val);
          this.$emit('close');
        }
      },
    },
  },
  computed: {
    minDate(): Date {
      return new Date(2020, 1, 1);
    },
    maxDate(): Date {
      return new Date();
    },
  },
  methods: {
    selectDate(option: { days: number; text: string }) {
      const from = new Date();
      from.setDate(from.getDate() - option.days);
      this.privateDates = [from, new Date()];
    },
  },
});

export default DatePicker;
</script>
