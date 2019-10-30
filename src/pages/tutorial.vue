<template>
  <q-page padding>
    <ul>
      <li v-for="task in tasks" :key="task.id">
         <div>{{ task.name }}</div>
        <small>{{task.dueDate}} @ {{task.dueTime}}</small>
        </li>
    </ul>
     <ul>
      <task v-for="(task,index) in tasks" v-bind:key="task" :task="task" :index="index">{{task.name}}</task>
    </ul>
  </q-page>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      tasks : [
        {
           id: 2,
          name: 'Go to shop',
          dueDate: '2019/05/12',
          dueTime: '18:30'
        },
        { 
          id: 2,
          name: 'Get Bananas',
          dueDate: '2019/05/13',
          dueTime: '18:30'
        },
        { 
          id: 3,
          name: 'Get apples',
          dueDate: '2019/05/14',
          dueTime: '18:30'
        },
      ]
    }
  },
  methods: {
    deleteTask(index){
      this.tasks.splice(index, 1)
    }
  },
  components: {
    'task' : require('components/Task.vue').default
  }
}
</script>

<style>
</style>