<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search></search>
      <sort />
    </div>
    <p
      v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
    >No Search Results</p>
    <no-tasks v-if="!Object.keys(tasksTodo).length && !search"></no-tasks>
    <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" />
    <tasks-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length" />
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="showAddTask = true" round color="primary" size="24" icon="add" />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState("tasks", ["search"])
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  },
  components: {
    addTask: require("components/Tasks/Modals/AddTask.vue").default,
    tasksTodo: require("components/Tasks/TasksTodo.vue").default,
    tasksCompleted: require("components/Tasks/TasksCompleted.vue").default,
    noTasks: require("components/Tasks/Modals/NoTasks.vue").default,
    search: require("components/Tasks/Tools/Search.vue").default,
    sort: require("components/Tasks/Tools/Sort.vue").default
  }
};
</script>

<style>
</style>