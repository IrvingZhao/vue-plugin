<template>
    <xlb-base-page>
        <xlb-search-form slot="searchForm" :search-labels="smallData" @search="search" @reset="reset"
                         @clearItem="clearItem">
            <div class="search-form-item" v-for="i in 10" :key="i">
                <div class="form-label">测试label{{i}}：</div>
                <el-input v-model="searchForm['param'+i]"></el-input>
            </div>
        </xlb-search-form>
        <xlb-toolbar slot="toolBar">
            <template slot="pageTitle">订单流水</template>
            <demo-slot-test page-key="123">
                <el-button size="small" slot="a">按钮3</el-button>
                <template slot="c">
                    <el-button size="small">slot 按钮1</el-button>
                    <el-button size="small">slot 按钮2</el-button>
                </template>
                <el-button size="small" icon="el-icon-my-user-define">自定义列
                </el-button>
                <el-button size="small" slot="b">按钮4</el-button>
                <el-button size="small">测试2</el-button>
            </demo-slot-test>
            <!--<xlb-config-slot :slot-keys="['a','c']" :enabled="true">-->
            <!--<el-button size="small" slot="a">按钮3</el-button>-->
            <!--<template slot="c">-->
            <!--<el-button size="small">slot 按钮1</el-button>-->
            <!--<el-button size="small">slot 按钮2</el-button>-->
            <!--</template>-->
            <!--<el-button size="small" icon="el-icon-my-user-define">自定义列-->
            <!--</el-button>-->
            <!--<el-button size="small" slot="b">按钮4</el-button>-->
            <!--<el-button size="small">测试2</el-button>-->
            <!--</xlb-config-slot>-->
        </xlb-toolbar>
        <xlb-config-column-grid slot="grid" ref="grid" :table-params="tableParams" :all-config-columns="allTableColumns"
                                :visible-columns.sync="visibleColumns" @updateColumns="updateColumns">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column fixed prop="date" label="日期" min-width="250"></el-table-column>
            <el-table-column slot="name" prop="name" label="姓名" min-width="200">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <template slot="defaultRight">
                <el-table-column prop="zip" label="邮编-右侧最后" min-width="200"></el-table-column>
            </template>
            <el-table-column slot="province" prop="province" label="省份"
                             min-width="200"></el-table-column>
            <el-table-column slot="city" prop="city" label="市区" min-width="200"></el-table-column>
            <el-table-column slot="address" prop="address" label="地址" min-width="350">
            </el-table-column>
            <el-table-column slot="zip" prop="zip" label="邮编" min-width="200"></el-table-column>
            <el-table-column slot="name1" prop="name" label="姓名1" min-width="200"></el-table-column>
            <el-table-column slot="province1" prop="province" label="省份1"
                             min-width="200"></el-table-column>
            <el-table-column slot="city1" prop="city" label="市区1" min-width="200"></el-table-column>
            <el-table-column slot="address1" prop="address" label="地址1" min-width="350"
                             :show-overflow-tooltip="true"></el-table-column>
            <el-table-column key="zip1" slot="zip1" prop="zip" label="邮编1" min-width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button>测试</el-button>
                </template>
            </el-table-column>
        </xlb-config-column-grid>
        <div slot="pagination" class="pagination">
            <el-pagination
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>

    </xlb-base-page>
</template>

<script>

    function generateTableData() {
        let result = [];
        for (let i = 1; i < 20; i++) {
            result.push({
                date: '2016-05-' + i,
                name: '王小虎' + i,
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
                zip: 200333
            })
        }
        return result;
    }

    function getSearchFormData() {
        let result = {};
        for (let i = 0; i < 10; i++) {
            result["param" + i] = "";
        }
        return result;
    }

    function generateSmallData() {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push({
                label: "测试label" + i + "：",
                key: "param" + i,
            });
        }
        return result;
    }

    export default {
        name: "index",
        data() {
            return {
                searchForm: getSearchFormData(),
                searchFormSmallLabels: generateSmallData(),
                smallData: [],
                tableParams: {
                    data: generateTableData(),
                    size: "small",
                    height: "auto"
                },
                allTableColumns: [],
                visibleColumns: [],
            }
        },
        created() {
            console.info(this);
        },
        mounted() {
            // this.$bread.set([
            //     {name: "测试"},
            //     {name: "首页", path: "/page"}
            // ]);
            this.allTableColumns = [
                {key: "name", value: "姓名"},
                {key: "province", value: "省份"},
                {key: "city", value: "时区"},
                {key: "address", value: "地址"},
                {key: "zip", value: "邮编"},
                {key: "name1", value: "姓名1"},
                {key: "province1", value: "省份1"},
                {key: "city1", value: "时区1"},
                {key: "address1", value: "地址1"},
                {key: "zip1", value: "邮编1"},
            ];
            this.visibleColumns = [
                // "province"
            ];
        },
        methods: {
            updateColumns(val) {
                this.visibleColumns = val;
            },
            customColumn() {
                this.$refs.grid.editColumn();
            },
            clearItem(key) {
                this.searchForm[key] = "";
                this.smallData = this.smallData.filter((item) => {
                    return item.key !== key;
                });
            },
            search() {
                let smallData = [];
                this.searchFormSmallLabels.forEach(item => {
                    if (this.searchForm[item.key]) {
                        smallData.push({...item, value: this.searchForm[item.key]});
                    }
                });
                this.smallData = smallData;
            },
            reset() {
                this.searchForm = getSearchFormData();
                this.smallData = [];
            },
            arraySpanMethod({row, column, rowIndex, columnIndex}) {
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },
            format(a) {
                return a;
            }
        }
    }
</script>

<style scoped lang="scss">
    .page-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .expend-button {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .search-form-item {
        flex: 0 0 500px;
        display: flex;
        align-items: center;
        margin: 0 10px 10px 0;
    }

    .tool-bar {
        flex: 0 0 32px;
    }

    .grid {
        flex: 1 1 auto;
        overflow: auto;
    }

    .pagination {
        flex: 0 0 32px;
    }
</style>