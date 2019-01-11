import ColumnDefine from './columnDefine';
import GeminiScroll from '@/plugins/geminiScrollbar';
// import {Table} from 'element-ui';

export default {
    name: "xlb-config-column-grid",
    created() {
    },
    props: {
        tableParams: {
            type: Object,
            required: true
        },
        allConfigColumns: {
            type: Array,
            required: true
        },
        visibleColumns: Array
    },
    computed: {
        tableParamComputed() {
            if (!this.tableParams.height) {
                this.tableParams.height = "auto";
            }
            return this.tableParams;
        },
        visibleColumnComputed() {
            if (this.visibleColumns && this.visibleColumns.length > 0) {
                return this.visibleColumns;
            }
            return this.allConfigColumns.map(item => item.key);
        }
    },
    mounted() {
        setTimeout(() => {
            let table = this.$refs.table;

            //设置表格中滚动条信息
            let div = document.createElement("div");
            div.innerHTML = '<div class="gm-scrollbar -vertical"><div class="thumb"></div></div><div class="gm-scrollbar -horizontal"><div class="thumb"></div></div>';

            table.$refs.bodyWrapper.classList.add("gm-scroll-view");
            for (let i = div.children.length - 1; i >= 0; i--) {
                table.$el.appendChild(div.children.item(i));
            }
            let headHeight = table.$refs.headerWrapper.offsetHeight;

            //初始化滚动条
            let scroll = this.holdObj.scroll = new GeminiScroll({
                element: table.$el,
                createElements: false,
                offsetY: 48
            });
            scroll.create();

            setTimeout(() => {
                this.updateGridHeight();
            }, 0);

        }, 0);
    },
    updated() {
        if (this.holdObj.scroll) {
            setTimeout(() => {
                this.updateGridHeight();
            }, 0);
        }
    },
    data() {
        return {
            holdObj: {
                scroll: null
            },
            columnDefineParams: {
                visible: false,
            }
        }
    },
    methods: {
        updateGridHeight() {
            this.tableParams.height = this.$refs.gridArea.offsetHeight;//从新设置表格高度
            this.holdObj.scroll.update();//scroll重新计算滚动区域高度
            setTimeout(() => {
                //获取数据
                let table = this.$refs.table;//表格组件对象
                let scrollBarWidth = this.holdObj.scroll.SCROLLBAR_WIDTH;//滚动条宽度

                let wrapperHeight = this.$refs.gridArea.offsetHeight;//表格内容区整体大小
                let wrapperWidth = this.$refs.gridArea.offsetWidth;//表格内容区域宽度

                let wrapperBodyHeight = wrapperHeight - table.$refs.headerWrapper.offsetHeight;//表格body区域大小
                //左侧固定列
                let leftWrapper = table.$refs.fixedWrapper;
                if (leftWrapper) {
                    //由于滚动条高度由减小，需重新设置 左侧固定列整体高度 及 body 高度
                    leftWrapper.style.height = wrapperHeight + "px";
                    table.$refs.fixedBodyWrapper.style.height = (wrapperBodyHeight - 6) + "px";
                }
                //右侧固定列，同左侧
                let rightWrapper = table.$refs.rightFixedWrapper;
                if (rightWrapper) {
                    rightWrapper.style.height = wrapperHeight + "px";
                    rightWrapper.style.right = "6px";
                    table.$refs.rightFixedBodyWrapper.style.height = (wrapperBodyHeight - 6) + "px";//去除滚动条区域
                } else {
                    //当不具有右侧固定列时，右侧出现滚动条区域预留空间，由于滚动条宽度减少，重新设置 head 和 body区域宽度
                    table.$refs.bodyWrapper.querySelector(".el-table__body").style.width = (wrapperWidth - 6) + "px";
                    table.$refs.headerWrapper.querySelector(".el-table__header").style.width = (wrapperWidth + scrollBarWidth - 6) + "px";
                }
            }, 0);
        },
        editColumn() {
            this.columnDefineParams.visible = true;
        },
        updateColumns(val) {
            this.$refs.table.bodyWrapper.scrollTo(0, 0);
            this.$emit("updateColumns", val);
        }
    },
    render(_c) {
        let me = this;
        let slotEls = [];
        if (me.$slots.default) {
            slotEls = [...me.$slots.default];
        }
        me.visibleColumnComputed.forEach((item) => {
            let slotItem = me.$slots[item];
            if (slotItem && slotItem instanceof Array) {
                slotItem.forEach((vNodeItem, j) => {
                    if (!vNodeItem.key) { //如果slot中的节点 没有 key时，补充一个key，避免出现slot渲染问题
                        vNodeItem.key = item + j;
                    }
                    slotEls.push(vNodeItem);
                });
            }
        });

        if (me.$slots.defaultRight) {
            me.$slots.defaultRight.forEach(item => {
                slotEls.push(item);
            })
        }

        return _c("div", {
            ref: "gridArea",
            style: {
                width: "100%",
                height: "100%"
            },
            directives: [
                {
                    name: "resize",
                    value() {
                        me.updateGridHeight();
                    }
                }
            ],
        }, [
            // _c(Table, {class: "gm-scrollbar-container", ref: "table", props: me.tableParamComputed}, slotEls),
            _c("el-table", {class: "gm-scrollbar-container", ref: "table", props: me.tableParamComputed}, slotEls),
            _c(ColumnDefine, {
                ref: "columnDefine",
                props: {
                    visible: me.columnDefineParams.visible,
                    allConfigColumns: me.allConfigColumns,
                    checkedColumns: me.visibleColumnComputed
                }, on: {
                    "update:visible"(val) {
                        me.columnDefineParams.visible = false;
                    },
                    "updateColumns"(val) {
                        me.updateColumns(val);
                    }
                }
            })
        ]);
    }
}
