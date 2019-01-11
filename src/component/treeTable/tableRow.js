export default {
    name: "table-row",
    // props: ["row", "rIndex", "columns", "isChild"],
    props: {
        row: Object,
        rIndex: Number,
        columns: Array,
        childLevel: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            activeHeightParam: {
                active: false,
                remove: true,
            },
        }
    },
    methods: {
        testClickMethod() {
            this.activeHeightParam.active = !this.activeHeightParam.active;
        }
    },
    render(_c) {
        let children = [];
        let hasChildren = this.row.children && this.row.children.length > 0;
        children.push(
            <div class="row body" key={"row" + this.rIndex} onClick={this.testClickMethod}>
                {
                    this._l(this.columns, (column, cIndex) => {
                        return column.renderCell.call(this._renderProxy, h, {
                            column,
                            row: this.row,
                            $index: this.rIndex,
                            level: this.childLevel,
                            rowActive: this.activeHeightParam.active,
                            hasChildren
                        });
                    })
                }
            </div>
        );
        if (hasChildren) {
            let expandRows = [];
            this.row.children.forEach((childRow, childRIndex) => {
                expandRows.push(
                    <table-row row={childRow} rIndex={childRIndex} columns={this.columns}
                               childLevel={this.childLevel + 1}></table-row>
                );
            });
            children.push(
                <div class="expand" v-active-height={this.activeHeightParam}>
                    {expandRows}
                </div>
            )
        }
        return children.length > 1 ? <div>{children}</div> : children[0];
    }
}