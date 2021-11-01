<template>
    <div  @click="$emit('toggle-reminder', id)"  
          :class="[reminder && 'reminder', 'task' ]"
    >
        <h3>
            {{text}}
             <i @click="$emit('delete-task', id)" class="fas fa-times"></i>    
            </h3>
        <p>{{day}}</p>
    </div>
</template>

<script>
    export default {
        name:'Task',
        props:{
            id:[String, Number],
            text: String,
            day: String,
            reminder: Boolean,
        },
    }
</script>

<style scope>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>