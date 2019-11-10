<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted() {
    this.getSettings();
    this.handleAuthStateChange();
  }
};
</script>
<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>