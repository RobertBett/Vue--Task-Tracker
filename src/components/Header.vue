<template>
    <header>
        <h1> {{ title }}</h1>
        <Button 
            @btn-click="$emit('toggle-task')" 
            :text="showAddTask || showEditTask ? 'Close' : ' Add Task' " 
            :color="showAddTask || showEditTask ? 'red' : 'green' "/>
    </header>
</template>

<script>
    import Button from './Button.vue'
    export default{
        name:'Header',
        components:{
            Button
        },
        props:{
            title: String,
            showAddTask:Boolean,
            showEditTask:Boolean

        },
        emits:['toggle-task'],
        
    }
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
