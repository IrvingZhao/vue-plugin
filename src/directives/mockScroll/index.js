const addEvent = (function (window, undefined) {
    let _eventCompat = function (event) {
        let type = event.type;
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }
        //alert(event.delta);
        if (event.srcElement && !event.target) {
            event.target = event.srcElement;
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function () {
                event.returnValue = false;
            };
        }
        /*
           ......其他一些兼容性处理 */
        return event;
    };
    if (window.addEventListener) {
        return function (el, type, fn, capture) {
            if (type === "mousewheel" && document.mozFullScreen !== undefined) {
                type = "DOMMouseScroll";
            }
            el.addEventListener(type, function (event) {
                fn.call(this, _eventCompat(event));
            }, capture || false);
        }
    } else if (window.attachEvent) {
        return function (el, type, fn, capture) {
            el.attachEvent("on" + type, function (event) {
                event = event || window.event;
                fn.call(el, _eventCompat(event));
            });
        }
    }
    return function () {
    };
})(window);

function scrollListener(e) {
    let elScrollTop = this.scrollTop;
    this.scrollTo(0, elScrollTop + e.delta * -120);
}

export default {
    name: "mock-scroll",
    bind(el) {
        el.style.overflow = "hidden";
        addEvent(el, "mousewheel", scrollListener);
    },
    unbind(el) {

    }
}
