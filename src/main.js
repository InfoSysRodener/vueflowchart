import Vue from 'vue'
import App from './App.vue'

// import vue-panzoom
import panZoom from 'vue-panzoom'

// install plugin
Vue.use(panZoom);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
