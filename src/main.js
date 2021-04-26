import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

Vue.config.productionTip = false
// Api Key Goes Here

//initialise firebase
firebase.initializeApp(firebaseConfig);
//utility variables
const auth = firebase.auth()
const db = firebase.firestore()
const fbFunctions = firebase.functions()
const storage = firebase.storage()
//export utilities
export {
  db,
  auth,
  fbFunctions,
  storage,
}


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
