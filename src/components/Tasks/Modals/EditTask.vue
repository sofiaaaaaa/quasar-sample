<template>
  <q-card>
    <modal-header>Eidt Task</modal-header>
    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName" />
        <modal-due-date :dueDate.sync="taskToSubmit.dueDate" @clear="clearDueDate" />
        <modal-due-time :dueTime.sync="taskToSubmit.dueTime" v-if="taskToSubmit.dueDate" />
      </q-card-section>
      <modal-buttons></modal-buttons>
      <!-- <pre>{{ taskToSubmit }}</pre> -->
    </q-form>
  </q-card>
</template>

<script>
/* eslint-disable */
import { mapActions } from "vuex";

export default {
  props: ["task", "id"],
  data() {
    return {
      taskToSubmit: {}
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      console.log("submitForm");
      this.$refs.modalTaskName.$refs.name.validate();
      console.log(this.$refs.modalTaskName.$refs.name);
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
    },
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit("close");
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = "";
      this.taskToSubmit.dueTime = "";
    }
  },
  components: {
    modalHeader: require("components/Shared/ModalHeader.vue").default,
    modalTaskName: require("components/Shared/ModalTaskName.vue").default,
    modalDueDate: require("components/Shared/ModalDueDate.vue").default,
    modalDueTime: require("components/Shared/ModalDueTime.vue").default,
    modalButtons: require("components/Shared/ModalButtons.vue").default
  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  }
};
</script>

<style>
</style>
