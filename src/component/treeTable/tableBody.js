import TableRow from './tableRow';

export default {
    name: "table-head",
    props: ["columns", "data"],
    components: {TableRow},
    methods: {
        tableContentAreaResizeHandle() {
            this.scrollConfig.instance.update();
        },
        resize() {
            this.$refs.tableBodyContent.style.width = "auto";
            this.$refs.tableBodyContent.style.width = this.$refs.tableBodyContent.scrollWidth + "px";
            this.scrollConfig.instance.update();
        }
    },
    updated() {
        this.$refs.tableBodyContent.style.width = this.$refs.tableBodyContent.scrollWidth + "px";
        this.scrollConfig.instance.create();
    },
    data() {
        return {
            scrollConfig: {
                createElements: false,
                autoCreate: false,
                instance: null,
                offsetY: 6
            },
        }
    },
    directives: {
        tableHeadScroll: {
            bind(el, binding, vNode) {
                let context = vNode.context;
                el.addEventListener("scroll", (e) => {
                    let target = e.target;
                    // context.$refs.tableHead.scrollTo(target.scrollLeft, 0);
                    context.$emit("tableBodyScroll", target);
                });
            }
        }
    },
    render(_c) {

        let activeHeightParam = {
            active: false,
        };

        let renderRow = (item, rIndex) => {
            return <table-row columns={this.columns} row={item} rIndex={rIndex}></table-row>;
        };

        return (
            <div class="table-body-content" v-gemini-scroll={this.scrollConfig}>
                <div class="gm-scrollbar -vertical">
                    <div class="thumb"></div>
                </div>
                <div class="gm-scrollbar -horizontal">
                    <div class="thumb"></div>
                </div>
                <div class="gm-scroll-view" v-table-head-scroll>
                    <div ref="tableBodyContent" v-resize={this.tableContentAreaResizeHandle}>
                        {
                            this._l(this.data, renderRow)
                        }
                    </div>
                </div>
            </div>
        );
    }
}