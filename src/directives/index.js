import ActiveHeight from './activeHeight';
import GeminiScrollBar from './geminiScrollbar';
import MockScroll from './mockScroll';
import ResizeHandle from './resizeHandle';

let directives = [
    ActiveHeight, GeminiScrollBar, MockScroll, ResizeHandle
];

export default {
    install(Vue, options) {
        directives.forEach((item) => {
            Vue.directive(item.name, item);
        });
    }
}
export {
    ActiveHeight, GeminiScrollBar, MockScroll, ResizeHandle
}