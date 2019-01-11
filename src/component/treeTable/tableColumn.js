import {getPropByPath} from 'element-ui/src/utils/util';

const DEFAULT_RENDER_CELL = function (h, {row, column, $index}) {
    const property = column.property;
    let value = property && getPropByPath(row, property).v;
    if (column && column.formatter) {
        value = column.formatter(row, column, value, $index);
    }
    return <span>{value}</span>;
};

export default {
    name: "table-column",
    inject: ["table"],
    props: {
        renderHeader: Function,
        prop: String,
        property: String,
        label: String,
        width: {
            type: [Number, String],
            required: true
        },
        formatter: Function,
    },
    computed: {
        columnWidth() {
            let num = 0;
            if (isNaN(this.width)) {
                num = this.width.replace("px", "") * 1;
            } else {
                num = this.width;
            }
            return num + " 0 " + num + "px";
        }
    },
    created() {
        if (!this.table) {
            throw new Error("tree-table-column must be child of tree-table");
        }
        let columnConfig = {
            renderHeader: this.renderHeader || ((h, scope) => this.$scopedSlots.header(scope)),
            property: this.prop || this.property,
            label: this.label,
            width: this.columnWidth,
            formatter: this.formatter,
        };

        columnConfig.renderCell = (h, {column, row, $index, hasChildren, rowActive, level}) => {
            let renderCell = null;
            if (this.$scopedSlots.default) {
                renderCell = () => this.$scopedSlots.default({column, row, $index});
            }
            if (!renderCell) {
                renderCell = DEFAULT_RENDER_CELL;
            }
            return (
                <div class="col" style={{flex: columnConfig.width}} key={"column" + $index + column.index}>
                    <div class="col-content"
                         style={column.index === 0 ? ("padding-left:" + (level * 20 + 15) + "px") : ""}>{column.index === 0 ? (hasChildren ?
                        <i class={{
                            "expand-icon": true,
                            "el-icon-my-folder-open": rowActive,
                            "el-icon-my-folder-close": !rowActive
                        }}/> :
                        <i class="expand-icon el-icon-my-file"/>) : ""}{renderCell(h, {column, row, $index})}</div>
                </div>);
        };

        columnConfig.renderHeader = (h, data) => {
            let renderHeader = null;
            if (this.$scopedSlots.header) {
                renderHeader = () => this.$scopedSlots.header(data);
            } else if (this.renderHeader) {
                renderHeader = () => this.renderHeader(h, data);
            }
            if (!renderHeader) {
                renderHeader = (h, {column}) => {
                    return column.label || '';
                }
            }

            return (<div class="col" style={{flex: columnConfig.width}}>
                <div class="col-content">{renderHeader(h, data)}</div>
            </div>);

        };

        this.table.addColumns(columnConfig);
    },
    render(_c) {
    }
}