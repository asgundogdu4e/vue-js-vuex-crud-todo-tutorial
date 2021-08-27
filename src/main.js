import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(Vuelidate);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

let app = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


export default app;