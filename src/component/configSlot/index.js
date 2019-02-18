export default {
    name: "xlb-config-slot",
    props: {
        slotKeys: {
            type: Array,
            required: true
        },
        sort: {
            type: Array,
            default: null
        },
        enabled: {
            type: Boolean,
            default: false
        }
    },
    // props: ["slotKeys", "sort","enabled"],
    render(_c) {
        let slotKeyMap = {};
        let sortKeys = this.sort || Object.keys(this.$slots);
        let hasDefault = false;
        let slotEls = [];
        this.slotKeys.forEach((item) => {
            slotKeyMap[item] = true;
        });
        sortKeys.forEach((item) => {
            if (!this.enabled || item === "default" || slotKeyMap[item]) {
                if (item === "default") {
                    hasDefault = true;
                }
                if (this.$slots[item]) {
                    this.$slots[item].forEach((vNodeItem) => {
                        slotEls.push(vNodeItem);
                    });
                }
            }
        });

        if (!hasDefault) {
            if (this.$slots.default) {
                this.$slots.default.forEach((vNodeItem) => {
                    slotEls.push(vNodeItem);
                });
            }
        }
        return _c("div", {}, slotEls);
    }
}