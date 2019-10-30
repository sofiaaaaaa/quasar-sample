<template>
    <li>
        <div><slot></slot> {{task.name}} {{ index }}</div>
        <small>{{task.dueDate}} @ {{task.dueTime}}</small>
        <button @click="deleteTask(index)">x</button>
    </li>
</template>
<script>
/* eslint-disable */
export default {
    props: ['task','index']
}
</script>
<style>
</style>