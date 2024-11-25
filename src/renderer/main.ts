import '@/assets/style/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(router).mount('#app')
