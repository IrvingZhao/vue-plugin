import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/packages/theme-chalk/src/index.scss';

import router from './demo/config/router';
import Plugins from '../src/index';

Vue.use(ElementUI);
Vue.use(Plugins);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
