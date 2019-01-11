import Component from './component';
import Directives from './directives';
import Plugin from './plugins'

import "./icon.scss";

export default {
    install(Vue) {
        Vue.use(Component);
        Vue.use(Directives);
        Vue.use(Plugin);
    }
}
