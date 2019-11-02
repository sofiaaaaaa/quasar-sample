<template>
  <div class="q-mt-lg">
    <list-header bgcolor="bg-green-4">Completed</list-header>
    <q-list bordered separator v-if="Object.keys(tasksCompleted).length">
      <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
    </q-list>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  props: ["tasksCompleted"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style lang="scss" scoped>
</style>