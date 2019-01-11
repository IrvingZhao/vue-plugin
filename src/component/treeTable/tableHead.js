export default {
    name: "tree-table-head",
    props: ["columns"],
    updated() {
        this.$refs.tableHeadContent.style.width = this.$refs.tableHeadContent.scrollWidth + "px";
    },
    methods: {
        resize() {
            this.$refs.tableHeadContent.style.width = "auto";
            this.$refs.tableHeadContent.style.width = this.$refs.tableHeadContent.scrollWidth + "px";
        }
    },
    render(_c) {
        let slots = [];
        return (
            <div class="table-head-content" ref="tableHeadContent">
                <div class="row head">
                    {
                        this._l(this.columns, (column, index) => column.renderHeader ? column.renderHeader.call(this._renderProxy, h, {column}) : column.label)
                    }
                </div>
            </div>);
        // return (<div class="row head">
        //     this._l(this.columns,(column,index)=>{
        //     <div class='col' style="flex:20 0 200px"></div>
        //     // return (<div class="col" style="flex:20 0 200px">
        //     // <div class="col-content">
        //     // column.renderHeader
        //     // ? column.renderHeader.call(this._renderProxy,
        //     // h, {column})
        //     // : column.label
        //     // </div>
        //     // </div>)
        // })
        // </div>)
    }
}