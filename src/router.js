import { createWebHistory, createRouter } from 'vue-router'

import HomeView from "./components/Home/HomeView.vue"
import WorkSpaceView from "./components/WorkSpace/WorkSpaceView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/work_space', component: WorkSpaceView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})