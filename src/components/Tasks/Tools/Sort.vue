<template>
  <q-select
    filled
    v-model="sortBy"
    class="col q-ml-sm"
    map-options
    :options="options"
    emit-value
    label="Sort by"
    stack-label
  />
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      options: [
        {
          label: "Name",
          value: "name"
        },
        {
          label: "Date",
          value: "dueDate"
        }
      ]
    };
  },
  computed: {
    ...mapState("tasks", ["sort"]),
    sortBy: {
      get() {
        return this.sort;
      },
      set(value) {
        this.setSort(value);
      }
    }
  },
  methods: {
    ...mapActions("tasks", ["setSort"])
  }
};
</script>

<style>
.q-select {
  flex: 0 0 112px;
}
</style>