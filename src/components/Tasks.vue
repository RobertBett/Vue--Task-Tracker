<template>
    <div v-for="task in tasks" :key="task.id">
        <Task 
            @delete-task="$emit('delete-task', task.id)"
            @toggle-reminder="$emit('toggle-reminder', task.id)"
             @edit-task="$emit('edit-task', task.id)" 
            :id="task.id" 
            :text="task.text" 
            :day="task.day" 
            :reminder="task.reminder"
        />
    </div>
</template>

<script>
    import Task from './Task.vue'
    export default {
        name:'Tasks',
        props:{
            tasks: Array,
        },
        components:{
            Task
        },
        emits:['delete-task', 'toggle-reminder', 'edit-task'],
    };
</script>