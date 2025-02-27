// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './plugins/i18n';
import './assets/tailwind.css';

// Create app
const app = createApp(App);

// Register plugins
app.use(createPinia());
app.use(router);
app.use(i18n);

// Mount app
app.mount('#app');