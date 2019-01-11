<template>
    <div class="table " v-resize="pageResizeHandle">
        <div class="table-head-area" ref="tableHead">
            <div class="table-head-content" ref="tableHeadContent">
                <table-head ref="tableHeaderComponent" :columns="columns"></table-head>
            </div>
        </div>
        <div class="table-body-area" ref="tableBody">
            <table-body ref="tableBodyComponent" :columns="columns" :data="data"
                        @tableBodyScroll="tableBodyScroll"></table-body>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import TableHead from './tableHead';
    import TableBody from './tableBody';

    export default {
        name: "xlb-tree-table",
        components: {TableHead, TableBody},
        props: ["data"],
        provide() {
            return {
                table: this
            }
        },
        data() {
            return {
                scrollConfig: {
                    createElements: false,
                    autoCreate: false,
                    instance: null,
                    offsetX: 0
                },
                columns: []
            }
        },
        methods: {
            addColumns(column) {
                column.index = this.columns.length;
                this.columns.push(column);
            },
            tableBodyScroll(target) {
                this.$refs.tableHead.scrollTo(target.scrollLeft, 0);
            },
            pageResizeHandle() {
                this.$refs.tableHeaderComponent.resize();
                this.$refs.tableBodyComponent.resize();
            }
        }
    }
</script>

<style lang="scss">
    .table {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
        color: #606266;
        .table-head-area {
            flex: 0 0 auto;
            overflow: hidden;
        }
        .table-body-area {
            flex: 1 1 auto;
            overflow: auto;
            width: 100%;
            height: 100%;
        }
        .table-body-content {
            width: 100%;
            height: 100%;
        }
        .row {
            display: flex;
            align-items: center;
            .col {
                padding: 8px 0;
            }
            .col-content {
                padding: 0 15px;
            }
            &.head {
                line-height: 23px;
                background: #4A90E2;
                color: #ffffff;
                font-weight: bold;
                font-size: 16px;
                top: 0;
                left: 0;
            }
            &.body {
                border-bottom: 1px solid #ebeef5;
                &:last-child {
                    /*border-bottom: 0;*/
                }
                &:hover {
                    background: #ecf5ff;
                }
            }
        }
        .expand-icon {
            color: #4A90E2;
            font-size: 16px;
            vertical-align: middle;
            margin-right: 10px;
        }
        .expand {
            transition: height 0.3s ease-in;
            overflow: hidden;
            height: 0;
        }
    }
</style>