<template>
  <q-input outlined v-select-all v-model="searchField" label="Search" class="col">
    <template v-slot:append>
      <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import { selectAll } from "src/directives/directive-select-all.js";

export default {
  computed: {
    ...mapState("tasks", ["search"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      }
    }
  },
  directives: {
    selectAll
  },
  methods: {
    ...mapActions("tasks", ["setSearch"])
  }
};
</script>

<style lang="scss" scoped>
</style>