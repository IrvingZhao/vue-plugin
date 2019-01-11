function append(nextNode, curNode, parentNode) {
    if (nextNode) {
        nextNode.insertBefore(curNode, parentNode);
    } else {
        parentNode.appendChild(curNode);
    }
}

function getTransactionEnd(data) {
    return function () {
        if (data.active) {
            this.style.height = "auto";
        } else {
            if (data.remove) {
                this.remove();
            }
        }
    };
}


function changeHeight(el, data) {
    if (data.transiction !== undefined && data.noTransictionClass !== undefined) {
        if (data.transiction) {
            el.classList.remove(data.noTransictionClass);
        } else {
            el.classList.add(data.noTransictionClass);
        }
    }
    if (data.active) {
        if (data.remove) {
            append(data.nextNode, el, data.parentNode);
        }
        el.style.height = el.scrollHeight + "px";
    } else {
        el.style.height = el.scrollHeight + "px";
        setTimeout(() => {
            el.style.height = 0 + "px";
        }, 0);
    }
}

function childActiveHandle(e) {
    this.style.height = (this.offsetHeight + e.changeHeight) + "px";
}

const transitionEventArray = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd".split(" ");

export default {
    name: "active-height",
    bind(el, binding) {
        el.addEventListener("active-height", childActiveHandle);
        transitionEventArray.forEach((item) => {
            el.addEventListener(item, getTransactionEnd(binding.value), true);
        })
    },
    inserted(el, binding) {
        let data = binding.value;
        data.nextNode = el.nextSibling;
        data.parentNode = el.parentNode;
        changeHeight(el, data);
    },
    update(el, binding) {
        let data = binding.value;
        changeHeight(el, data);
    },
    componentUpdated(el, binding) {
    },
    unbind() {
    }
}