// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
//vue-sweetalert2

//Element-UI
import ElementUI from 'element-ui'; //import ElementUI Library
import 'element-ui/lib/theme-chalk/index.css'; //moved as sepearate CSS Fileto css in /layout/app.php
Vue.use(ElementUI); //connect Vue to use with ElementUI



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
