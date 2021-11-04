<template>
  <div class="container">
    <Header 
        @toggle-task="toggleTask"
        :showAddTask="showAddTask"
        :showEditTask="showEditTask"
        title="Task Tracker"/>
        <router-view 
        @toggle-task="toggleTask"
        @show-edit="toggleEdit"
        :showEditTask="showEditTask"
        :showAddTask="showAddTask"/>
    <Footer/>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  data() {
      return {
          showAddTask:false,
          showEditTask:false,
      }
  },
  components: {
    Header,
    Footer
  },
  methods: {
      toggleTask(){
          if(this.showEditTask){
              this.showEditTask = false;
              return 
          }
          this.showAddTask = !this.showAddTask;
      },
      toggleEdit(boolean) {
          if(this.showAddTask){
              this.showAddTask = false;
          }
          this.showEditTask = boolean;
      }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid rgb(3, 6, 8);
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}

</style>
