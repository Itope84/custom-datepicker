<template>
  <div class="app">
    <span class="message">Have fun!</span>
    <div class="flex">
      <div class="picker-section">
        <date-picker></date-picker>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DatePicker from './library';

export default Vue.extend({
  name: 'App',
  components: {
    DatePicker,
  },
});
</script>

<style lang="scss">
// Disabled this to show that only needed component and styles are imported from buefy
// @import './buefyStyles';

.app {
  height: 100vh;
  background: #24292e;
}

.flex {
  display: flex;
  justify-content: center;
  padding: 20px;

  .picker-section {
    width: 300px;
  }
}

.message {
  color: #ffcc0d;
  font-size: 4rem;
  background: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
