<template>
  <div class="app">
    <span class="message">Have fun!</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>

<style lang="scss">
@import "./buefyStyles";

.app {
  height: 100vh;
  background: #24292e;
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
