<template>
    <div>
    <AddTask 
        v-if="showAddTask" 
        @add-task="createTask" 
        title="Task Tracker"/>
    <EditTask 
        v-if="showEditTask"
        @edited-task="afterEditTask"
        :task="editedTask"
    />
    <Button 
        @btn-click="toggleTask" 
        :text="showAddTask ? 'Close' : ' Add Task' " 
        :color="showAddTask ? 'red' : 'green' "/>
    <Tasks 
        @delete-task="deleteTask"
        @toggle-reminder="toggleReminder" 
        @edit-task="editTask" 
        :tasks="tasks"/> 
    </div>
</template> 

<script>
    import Tasks from '../components/Tasks.vue';
    import AddTask from '../components/AddTask.vue';
    import Button from '../components/Button.vue'
    import EditTask from '../components/EditTask.vue'
    export default {
        name: 'Home',
        components:{
            Tasks,
            AddTask,
            EditTask,
            Button

        },
        data() {
            return {
                tasks:[],
                showAddTask:false,
                showEditTask:false,
                editedTask:{},
            }
        },
        methods: {
            async afterEditTask(editedTask){
                await fetch(`api/tasks/${editedTask.id}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedTask),
                })
                this.tasks =  await this.fetchTasks();
                this.showEditTask = false;
            },
            async editTask(id){
                const response = await fetch(`api/tasks/${id}`);
                this.editedTask = await response.json();
                this.showEditTask = true;

            },
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
            async toggleReminder(id){
                const response = await fetch(`api/tasks/${id}`)
                const updatedTask = await response.json();

                await fetch(`api/tasks/${id}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( { ...updatedTask, reminder: !updatedTask.reminder }),
                })
                this.tasks =  await this.fetchTasks();
                
            },  
            async fetchTasks(){
                const response = await fetch('api/tasks');
                const data = await response.json();
                return data.reverse();
            },
            async fetchTask(id){
                const response = await fetch(`api/tasks/${id}`);
                const data = await response.json();
                return data;
            },
            async createTask(newTask) {
                await fetch('api/tasks', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),
                })
                this.tasks =  await this.fetchTasks();

                this.showAddTask = false;
            },
            toggleTask(){
                this.showAddTask = !this.showAddTask;
            }
        },
        async created() {
            this.tasks =  await this.fetchTasks();
            this.showAddTask= false;
            this.showEditTask =false;
        },
    }
</script>