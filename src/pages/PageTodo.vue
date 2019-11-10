<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search></search>
          <sort />
        </div>
        <p
          v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
        >No Search Results</p>

        <q-scroll-area class="q-scroll-area-tasks">
          <no-tasks
            v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"
          ></no-tasks>
          <tasks-todo v-if="Object.keys(tasksTodo).length" :tasksTodo="tasksTodo" />
          <tasks-completed
            :tasksCompleted="tasksCompleted"
            v-if="Object.keys(tasksCompleted).length"
            class="q-mb-xl"
          />
        </q-scroll-area>

        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTask = true"
            round
            color="primary"
            size="24"
            icon="add"
            class="all-pointer-events"
          />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner-hearts color="red" size="5.5em" />
        </span>
      </template>
    </div>
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      showAddTask: false
    };
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapGetters('settings', ['settings']),
    ...mapState('tasks', ['search', 'tasksDownloaded'])
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true;
    });
  },
  components: {
    addTask: require('components/Tasks/Modals/AddTask.vue').default,
    tasksTodo: require('components/Tasks/TasksTodo.vue').default,
    tasksCompleted: require('components/Tasks/TasksCompleted.vue').default,
    noTasks: require('components/Tasks/Modals/NoTasks.vue').default,
    search: require('components/Tasks/Tools/Search.vue').default,
    sort: require('components/Tasks/Tools/Sort.vue').default
  }
};
</script>

<style>
.q-scroll-area-tasks {
  display: flex;
  flex-grow: 1;
}
</style>