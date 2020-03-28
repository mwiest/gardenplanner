import Vue from "vue";
import App from "./App.vue";
import Firebase from "firebase";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "./registerServiceWorker";
import router from "./router";

// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

let app = null;

const firebaseConfig = {
  apiKey: "AIzaSyCbu6YlT2JkYwnohRgl_yoalUUE9vRbqq8",
  authDomain: "gardenplanner-cdd8b.firebaseapp.com",
  databaseURL: "https://gardenplanner-cdd8b.firebaseio.com",
  projectId: "gardenplanner-cdd8b",
  storageBucket: "gardenplanner-cdd8b.appspot.com",
  messagingSenderId: "1018772976013",
  appId: "1:1018772976013:web:31f455be780137279ecdc4"
};
Firebase.initializeApp(firebaseConfig);

Firebase.auth().onAuthStateChanged(() => {
  console.log("onAuthStateChange");
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
