<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header v-if="!settings.showTasksInOneList" bgcolor="bg-orange-4">Todo</list-header>
      <q-list bordered separator v-if="Object.keys(tasksTodo).length">
        <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";

export default {
  props: ["tasksTodo"],
  computed: {
    ...mapGetters("settings", ["settings"])
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    listHeader: require("components/Shared/ListHeader.vue").default
  }
};
</script>

<style lang="scss" scoped>
</style>