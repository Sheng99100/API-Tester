import { createApp } from 'vue'
import {router} from './router'
import ElementPlus from 'element-plus'
import App from './Index.vue'

import 'element-plus/dist/index.css'
import './style.css'
import builder from "./TestBuilder.js";

const app = createApp(App)
app.use(ElementPlus)
    .use(router)
    .mount('#app')

builder.init();