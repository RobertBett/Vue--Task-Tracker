import {createRouter, createWebHistory} from 'vue-router';
import About from '../views/About';
import Home from '../containers/Home.vue'

const routes = [
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path:'/',
        name:'Home',
        component: Home,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router
