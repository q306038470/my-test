import Vue from 'vue';
import App from './app.vue';
import './assets/style/test1.stylus.styl';
import './assets/style/test.stylus.styl'

const root = document.createElement('div');
document.body.appendChild(root);


new Vue({
  render: (h) => h(App)
}).$mount(root)