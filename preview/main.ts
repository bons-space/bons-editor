import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Editor from  '../src/index'

import 'element-plus/dist/index.css'

createApp(App)
  .use(router)
  .use(Editor)
  .mount('#app');
