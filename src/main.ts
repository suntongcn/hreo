import { createApp } from 'vue'
import App from './App.vue'

import './assets/main2.css'
declare const window: Window & { WeixinJSBridge: any, WVJBCallbacks: any };

createApp(App).mount('#app')
