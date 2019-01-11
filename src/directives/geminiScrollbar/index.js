// import GeminiScrollbar from 'gemini-scrollbar';
import GeminiScrollbar from '../../plugins/geminiScrollbar/index';
import '../../plugins/geminiScrollbar/style.css';

export default {
    name: "gemini-scroll",
    bind(el, binding) {
        let geminiScrollbar = new GeminiScrollbar({
            element: el,
            ...binding.value
        });
        if (binding.value.autoCreate) {
            geminiScrollbar.create();
        }
        el.geminiScrollBar = geminiScrollbar;
        binding.value.instance = geminiScrollbar;
    },
    unbind(el, binding) {
        if (el.geminiScrollBar) {
            el.geminiScrollBar.destroy();
        }
    },
    update() {
    },
    componentUpdated(el, binding) {
        el.geminiScrollBar.update();
    }
}