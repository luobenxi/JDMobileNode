import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';
import 'lib-flexible';
import  FastClick  from  'fastclick';
import 'babel-polyfill';
import es6Promise from 'es6-promise';
import Meta from 'vue-meta';
import Vant from 'vant';
import 'vant/lib/index.css';
import './style/common/loading.css';

Vue.use(Vant);
Vue.use(Meta);

FastClick.attach(document.body);

es6Promise.polyfill();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
