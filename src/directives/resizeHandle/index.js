import './resize.scss';

function isIE() {
    let agent = navigator.userAgent.toLowerCase();
    return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
}

function createResizeElement(element, resizeHandle) {
    let obj = document.createElement("object");
    obj.type = "text/html";
    obj.classList.add("resize-trigger");
    obj.setAttribute('tabindex', '-1');

    obj.onload = function () {
        let win = obj.contentDocument.defaultView;
        win.addEventListener('resize', resizeHandle);//考虑是否绑定this
    };
    if (!isIE()) {
        obj.data = 'about:blank';
    }
    element.appendChild(obj);
    if (isIE()) {
        obj.data = 'about:blank';
    }
}

function ResizeHandle(param) {
    this.resizeHandle = param.resizeHandle;
    this.element = param.element;
    if (this.element.style.position === "" || this.element.style.position === "static") {
        this.element.style.position = "relative";
    }
    createResizeElement(this.element, this.resizeHandle);
}

export default {
    name: "resize",
    bind(el, binding) {
        let resizeHandle = new ResizeHandle({
            element: el,
            resizeHandle: binding.value
        });
    }
}