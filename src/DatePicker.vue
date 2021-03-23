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

    <div
      class="j-datepicker--picker"
      v-if="showPicker"
    >
      <b-datepicker
        v-model="dates"
        inline
        :min-date="minDate"
        :max-date="maxDate"
        range
      >
      </b-datepicker>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ChevronLeft from './svgs/chevron-left.svg';
import ChevronRight from './svgs/chevron-right.svg';
import clickOutside from './directives/click-outside';
import { getDateString, getDiffDays } from './utils/dates';

const DatePicker = Vue.extend({
  name: 'DatePicker',
  props: {
    placeholder: {
      type: String,
      default: 'Click to select date range',
    },
  },
  components: {
    ChevronLeft,
    ChevronRight,
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
<style lang="scss">
@import './styles.scss';

.j-datepicker {
  position: relative;

  &--input {
    &__wrapper {
      display: flex;
      // border: 2px solid transparent;
      border-radius: 4px;
      &:focus-within {
        // border-color: darken($color: #2f3544, $amount: 10);
      }
      align-items: stretch;
    }

    flex: 1;
    input {
      background-color: #292f33;
      color: #91929e;
      box-shadow: none !important;
      border: 2px solid transparent;
      width: 100%;
      flex-basis: 100%;
      height: 40px;
      cursor: pointer;
      padding: 8px;

      &::placeholder {
        color: #91929e;
      }
      border-radius: 0px;

      &:hover {
        border-color: transparent;
        background-color: darken($color: #2f3544, $amount: 10);
      }

      &:focus {
        outline: none;
        background-color: darken($color: #2f3544, $amount: 10);
        border-color: transparent;
      }
    }
  }

  &--nav {
    background-color: #2f3544;
    box-shadow: none;
    color: #fff;
    border: none;
    width: 36px;
    text-align: center;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: transparent;
      background-color: darken($color: #2f3544, $amount: 10);
    }

    &:hover {
      background-color: darken($color: #2f3544, $amount: 10);
    }

    &.left {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &.right {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  &--picker {
    position: absolute;
    top: 0;
    // display: none;
    // transform: 0;
  }
}
</style>
