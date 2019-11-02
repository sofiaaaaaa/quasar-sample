<template>
  <div>
    <list-header bgcolor="bg-orange-4">Todo</list-header>
    <q-list bordered separator v-if="Object.keys(tasksTodo).length">
      <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
    </q-list>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  props: ["tasksTodo"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style lang="scss" scoped>
</style>