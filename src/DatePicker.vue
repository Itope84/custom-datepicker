<template>
  <div
    class="j-datepicker"
    v-click-outside="closePicker"
  >
    <div class="j-datepicker--input__wrapper">
      <button
        class="j-datepicker--nav left"
        @click="prevRange"
      >
        <chevron-left></chevron-left>
      </button>
      <div class="j-datepicker--input">
        <input
          type="text"
          :placeholder="placeholder"
          @click="showPicker = !showPicker"
          :value="getSelectedDateString"
          readonly
        >
      </div>

      <button
        class="j-datepicker--nav right"
        @click="nextRange"
      >
        <chevron-right></chevron-right>
      </button>
    </div>

    <datepicker-modal
      v-if="showPicker"
      v-model="dates"
      @close="closePicker"
    ></datepicker-modal>

  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';
import ChevronLeft from './svgs/chevron-left.svg';
import ChevronRight from './svgs/chevron-right.svg';
import DatepickerModal from './DatepickerModal.vue';

import clickOutside from './directives/click-outside';
import { getDateString, getDiffDays } from './utils/dates';

const DatePicker = Vue.extend({
  name: 'DatePicker',
  props: {
    placeholder: {
      type: String,
      default: 'Click to select date range',
    },
    value: {
      type: Array as PropType<Array<number>>,
      default: () => [],
    },
  },
  watch: {
    dates: {
      immediate: true,
      deep: true,
      handler(val, prev) {
        if (val !== prev) this.$emit('input', val);
      },
    },
  },
  components: {
    ChevronLeft,
    ChevronRight,
    DatepickerModal,
  },
  directives: {
    clickOutside,
  },
  data() {
    return {
      dates: [] as Date[],
      showPicker: false,
    };
  },
  computed: {
    minDate(): Date {
      return new Date(2020, 1, 1);
    },
    maxDate(): Date {
      return new Date();
    },
    getSelectedDateString(): string | null {
      if (!this.dates?.length) return null;
      return this.dates.map((date) => getDateString(date)).join(' - ');
    },
  },
  methods: {
    closePicker() {
      this.showPicker = false;
    },
    prevRange() {
      if (this.dates.length < 2) return;
      const days = getDiffDays(this.dates[0], this.dates[1]);
      const from = new Date(this.dates[0]);
      from.setDate(from.getDate() - days);
      // set dates
      this.dates = [from, this.dates[0]];
    },
    nextRange() {
      if (this.dates.length < 2) return;
      const days = getDiffDays(this.dates[0], this.dates[1]);
      const to = new Date(this.dates[1]);
      to.setDate(to.getDate() + days);
      // set dates
      this.dates = [this.dates[1], to];
    },
  },
});

export default DatePicker;
</script>
