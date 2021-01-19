import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Vuelidate from 'vuelidate';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Vuelidate);

Vue.prototype.axios = axios;
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyDQLb8xfj4-ACICn8fW913MkYk1VaJ6rWE',
  authDomain: 'rick-and-morty-2454d.firebaseapp.com',
  projectId: 'rick-and-morty-2454d',
  storageBucket: 'rick-and-morty-2454d.appspot.com',
  messagingSenderId: '285295041018',
  appId: '1:285295041018:web:3fc80c6a0d9a6317bc6c43',
  measurementId: 'G-5QEFXXCZDW',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
