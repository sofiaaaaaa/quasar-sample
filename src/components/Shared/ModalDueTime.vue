<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="dueTime"
      @input="$emit('update:dueTime', $event)"
      label="Due Time"
      class="row"
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time :value="dueTime" @input="$emit('update:dueTime', $event)" />
          </q-popup-proxy>
        </q-icon>
        <q-icon
          v-if="dueTime"
          name="close"
          @click="$emit('update:dueTime','')"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
/* eslint-disable */

export default { props: ["dueTime"] };
</script>

<style lang="scss" scoped>
</style>