import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/router'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/theme.css'


createApp(App)
  .use(router)
  .mount('#app')

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        router.push('/');
      }
      return Promise.reject(error);
    }
  );

