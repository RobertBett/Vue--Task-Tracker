<template>
     <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input 
        type="text" 
        v-model="newText"
        name="text" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input
        type="text"
        v-model="newDay"
        name="day"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" :checked="newReminder" v-model="newReminder" name="reminder" />
    </div>

    <input type="submit" value="Edit Task" class="btn btn-block" />
  </form>
</template>

<script>
    export default {
        name: "EditTask",
         props:['task'],
        watch:{
          task: function (newVal){
            this.newText =newVal.text
            this.newDay =newVal.day
            this.newReminder = newVal.reminder
          }
        },
        data(){
          return{
            newText:this.task.text,
            newDay: this.task.day,
            newReminder: this.task.reminder,
          }
        },
        methods: {
            onSubmit(event){
               event.preventDefault();
                if (!this.newText) {
                   alert('Please add a task');
                   return 
                }
                const editedTask = {
                    id: this.task.id,
                    text: this.newText,
                    day: this.newDay,
                    reminder: this.newReminder,
                }
                this.$emit('edited-task', editedTask);
            }
        },
        emits:['edited-task',]
    }

</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>