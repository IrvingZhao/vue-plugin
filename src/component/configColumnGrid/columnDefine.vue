<template>
    <el-dialog :visible.sync="diaVisible" width="300px" title="排序">
        <div class="operator">
            <el-button type="text" @click="checkAll">全选</el-button>
            <el-button type="text" @click="unCheckAll">取消全选</el-button>
        </div>
        <el-tree :data="columnChecks" node-key="id" default-expand-all draggable :allow-drop="checkDrop"
                 ref="columnTree" @node-click="nodeClick">
            <span slot-scope="{node,data}">
                <el-checkbox v-model="checkedMap[node.key]"></el-checkbox>
                <span style="margin-left: 15px;">{{node.label}}</span>
            </span>
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="diaVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    // import {Dialog, Button, Tree, Checkbox} from "element-ui";

    export default {
        name: "column-define",
        props: ["visible", "allConfigColumns", "checkedColumns"],
        // components: {
        //     "el-dialog": Dialog,
        //     "el-button": Button,
        //     "el-tree": Tree,
        //     "el-checkbox": Checkbox
        // },
        computed: {
            diaVisible: {
                get() {
                    return this.visible
                },
                set(val) {
                    this.$emit("update:visible", val)
                }
            },
        },
        watch: {
            allConfigColumns: "updateColumns",
            checkedColumns: "updateChecked",
            visible(newVal) {
                if (newVal) {
                    this.checkedMap = {};
                    this.updateColumns();
                    this.updateChecked();
                }
            }
        },
        mounted() {
            this.updateColumns();
            this.updateChecked();
        },
        data() {
            return {
                columnChecks: [],
                checkedMap: {},
            }
        },
        methods: {
            submit() {
                this.diaVisible = false;
                let nodes = this.$refs.columnTree.children;
                let checkedKey = [];
                if (nodes) {
                    nodes.forEach((item) => {
                        if (this.checkedMap[item.id]) {
                            checkedKey.push(item.id);
                        }
                    })
                }
                this.$emit("updateColumns", checkedKey);
            },
            updateColumns() {
                this.columnChecks = [];
                if (this.allConfigColumns) {
                    this.allConfigColumns.forEach((item) => {
                        this.columnChecks.push({
                            id: item.key,
                            label: item.value,
                        });
                        if (!this.checkedMap[item.key]) {
                            this.$set(this.checkedMap, item.key, false);
                        }
                    });
                }
            },
            updateChecked() {
                this.checkedColumns.forEach(item => {
                    this.$set(this.checkedMap, item, true);
                });
            },
            nodeClick(data) {
                this.$set(this.checkedMap, data.id, !this.checkedMap[data.id]);
            },
            checkDrop(draggingNode, dropNode, type) {
                return type !== 'inner';
            },
            checkAll() {
                for (let item in this.checkedMap) {
                    if (this.checkedMap.hasOwnProperty(item)) {
                        this.checkedMap[item] = true;
                    }
                }
            },
            unCheckAll() {
                for (let item in this.checkedMap) {
                    if (this.checkedMap.hasOwnProperty(item)) {
                        this.checkedMap[item] = false;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .operator {
        padding: 0 20px;
    }
</style>
