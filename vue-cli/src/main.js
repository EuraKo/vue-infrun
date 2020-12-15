import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

// 아래 문법은 위의 문법의 구버전
// var App = {
//   template:'<div>app</div>'
// };

// new Vue({
//   el:'#app',
//   component:{
//   'app': App
// }
// });
