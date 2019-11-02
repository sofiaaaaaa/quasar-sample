<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="name"
      label="Task name"
      @input="$emit('update:name', $event)"
      autofocus
      v-select-all
      :rules="[val => !!val || 'Field is required']"
      ref="name"
      class="col"
    >
      <template v-slot:append>
        <q-icon v-if="name" name="close" @click="$emit('update:name','')" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
</template>

<script>
/* eslint-disable */
import { selectAll } from "src/directives/directive-select-all.js";
export default {
  props: ["name"],
  directives: {
    selectAll
  }
};
</script>

<style lang="scss" scoped>
</style>