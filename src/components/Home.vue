<template>
    <div>
    <Button 
        @btn-click="toggleTask" 
        :text="showAddTask ? 'Close' : ' Add Task' " 
        :color="showAddTask ? 'red' : 'green' " 
        />
    <AddTask 
        v-if="showAddTask" 
        @add-task="createTask" 
        title="Task Tracker"/>
    <Tasks 
        @delete-task="deleteTask"
        @toggle-reminder="toggleReminder" 
        :tasks="tasks"/> 

    </div>
</template>

<script>
    import Tasks from './Tasks.vue';
    import AddTask from './AddTask.vue';
    import Button from './Button.vue'
    export default {
        name: 'Home',
        components:{
            Tasks,
            AddTask,
            Button

        },
        data() {
            return {
                tasks:[],
                showAddTask:false
            }
        },
        methods: {
            async deleteTask(id){
                if(confirm('Are you sure you want to delete')){
                    const response = await fetch(`api/tasks/${id}`, { method: 'DELETE' });
                    await response.json();
                    if(!response.ok) {
                    alert('Error deleting task')
                    }else{
                    this.tasks = this.tasks.filter(task => task.id !== id);
                    }
                }
            },
            toggleReminder(id){
                this.tasks = this.tasks.map((task) => {
                    console.log(id);
                    if(task.id === id){
                    return  { ...task, reminder: !task.reminder }
                    }
                    return task;
                })
            },  
            async fetchTasks(){
                const response = await fetch('api/tasks');
                const data = await response.json();
                return data;
            },
            async fetchTask(id){
                const response = await fetch(`api/tasks/${id}`);
                const data = await response.json();
                return data;
            },
            async createTask(newTask) {
                const response = await fetch('api/tasks', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                })
                const data = await response.json();
                this.tasks = [...this.tasks, data];
            },
            toggleTask(){
                this.showAddTask = !this.showAddTask;
            }
        },
        async created() {
            this.tasks =  await this.fetchTasks();
        },
    }
</script>