export default {
    name: "xlb-config-slot",
    props: ["slotKeys"],
    render(_c) {
        let slotEls = [];
        if (this.$slots.default) {
            slotEls = [...this.$slots.default];
        }
        this.slotKeys.forEach(item => {
            let slotItem = this.$slots[item];
            if (slotItem) {
                slotItem.forEach(vNodeItem => {
                    slotEls.push(vNodeItem);
                })
            }
        });
        if (this.$slots.defaultRight) {
            this.$slots.defaultRight.forEach(vNodeItem => {
                slotEls.push(vNodeItem);
            })
        }
        return _c("div", {}, slotEls);
    }
}