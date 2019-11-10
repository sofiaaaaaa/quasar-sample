export default {
  methods: {
    submitForm() {
      console.log('submitForm');
      this.$refs.modalTaskName.$refs.name.validate();
      console.log(this.$refs.modalTaskName.$refs.name);
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask();
      }
    },
    clearDueDate() {
      this.taskToSubmit.dueDate = '';
      this.taskToSubmit.dueTime = '';
    }
  },
  components: {
    modalHeader: require('components/Shared/ModalHeader.vue').default,
    modalTaskName: require('components/Shared/ModalTaskName.vue').default,
    modalDueDate: require('components/Shared/ModalDueDate.vue').default,
    modalDueTime: require('components/Shared/ModalDueTime.vue').default,
    modalButtons: require('components/Shared/ModalButtons.vue').default
  }
};
