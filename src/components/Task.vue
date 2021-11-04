<template>
    <div  
          :class="[reminder && 'reminder', 'task' ]">
             <i  @click="$emit('toggle-reminder', id)" :class="[reminder && 'icn-reminder', 'fas fa-bell']"></i>  
             <i @click="$emit('delete-task', id)" class="icn-delete fas fa-times"></i>  


        <h3 @dblclick="$emit('edit-task', id)">
            {{text}}
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
.icn-reminder{
 color:green;

}
.icn-delete{
  color: rgb(216, 4, 4);
  float: right;
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