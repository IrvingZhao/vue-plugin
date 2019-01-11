import Util from './utils';

export default {
    install(Vue) {
        Vue.$util = Util;
        Vue.prototype.$util = Util;

        Vue.filter("simpleDate", function (val) {
            return Util.getSimpleDate(val);
        });

        Vue.filter("fullDate", function (val) {
            return Util.getFullDate(val);
        });

        Vue.filter("dateFormat", function (val, pattern) {
            return Util.dateFormat(val, pattern);
        });
    }
}

export {
    Util
}