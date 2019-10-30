<template>
  <q-page class="q-pa-md">
    <q-list bordered separator>
      <q-item
        v-for="task in tasks"
        :key="task.id"
        v-ripple
        @click="task.completed = !task.completed"
        :class="!task.completed ? 'bg-grey-1' : 'bg-green-1'"
        clickable
      >
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{'text-strikethrough': task.completed}">{{task.name}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="18px" class="q-mr-xs" />
            </div>
            <div class="column">
              <q-item-label class="row justify-end" caption>{{task.dueDate}}</q-item-label>
              <small>
                <q-item-label class="row justify-end" caption>{{task.dueTime}}</q-item-label>
              </small>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      tasks: [
        {
          id: 1,
          name: "Go to shop",
          completed: true,
          dueDate: "2019/06/14",
          dueTime: "12:30"
        },
        {
          id: 2,
          name: "Get bananas",
          completed: false,
          dueDate: "2019/06/14",
          dueTime: "12:30"
        },
        {
          id: 3,
          name: "Get apples",
          completed: false,
          dueDate: "2019/06/14",
          dueTime: "12:30"
        }
      ]
    };
  }
};
</script>

<style>
</style>