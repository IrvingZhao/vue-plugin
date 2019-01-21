<template>
    <div v-if="formStatus==='normal'" :class="{'search-form':true,'active':searchForm.active && hasMore}">
        <div class="form-item-area" v-gemini-scroll="scrollConfig" ref="formItemArea">
            <div class="gm-scrollbar -vertical">
                <div class="thumb"></div>
            </div>
            <div class="gm-scrollbar -horizontal">
                <div class="thumb"></div>
            </div>
            <div class="gm-scroll-view" ref="scrollArea">
                <slot></slot>
            </div>
        </div>
        <div class="search-button-area">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="text" @click="reset">重置</el-button>
        </div>
        <div class="search-form-toggle-area" @click="toggleForm" v-if="hasMore">
            <span v-if="searchForm.active" class="el-icon-my-arrow-top"></span>
            <span v-else class="el-icon-my-arrow"></span>
            <span>更多搜索条件</span>
        </div>
    </div>
    <div v-else-if="formStatus==='mini'" class="search-params">
        <span>搜索条件：</span>
        <el-tag type="primary" :closable="true" @close="searchTagClose(item.key)"
                v-if="item.check?item.check(item.value):item.value"
                v-for="(item) in searchLabels" :key="item.key" :disable-transitions="tagTransition">
            {{item.label}}{{item.format?item.format(item.value):item.value}}
        </el-tag>
        <el-button size="mini" type="primary" @click="edit">编辑</el-button>
        <el-button size="mini" type="text" @click="reset">重置</el-button>
    </div>
</template>

<script>

    export default {
        name: "xlb-search-form",
        props: {
            searchLabels: Array,
        },
        watch: {
            searchLabels(newVal) {
                if (newVal && newVal.length > 0) {
                    this.formStatus = "mini";
                } else {
                    this.formStatus = "normal";
                    this.searchForm.active = false;
                }
            },
        },
        updated() {
            this.computedProperty();
            this.updateView();
        },
        data() {
            return {
                hasMore: false,
                formStatus: "normal",
                scrollConfig: {
                    createElements: false,
                    autoCreate: false,
                    instance: null,
                },
                searchForm: {
                    active: false,
                    text: "展开"
                },
                tagTransition: true
            };
        },
        methods: {
            computedProperty() {
                let formItemArea = this.$refs.formItemArea;
                this.hasMore = this.formStatus === 'normal' && formItemArea.scrollHeight > formItemArea.offsetHeight;
            },
            updateView() {
                if (this.searchForm.active && this.hasMore) {
                    console.info("created");
                    this.scrollConfig.instance.create();
                } else {
                    this.scrollConfig.instance.getViewElement().scrollTo(0, 0);
                    this.scrollConfig.instance.destroy();
                }
            },
            toggleForm() {
                this.searchForm.active = !this.searchForm.active;
                this.searchForm.text = this.searchForm.active ? "关闭" : "展开";
            },
            searchTagClose(key) {
                this.$emit("clearItem", key);
            },
            search() {
                this.$emit("search");
                // this.searchForm.active = false;
            },
            reset() {
                this.$emit("reset");
                if (this.formStatus !== "normal") {
                    this.searchForm.active = false;
                }
                this.formStatus = "normal";
            },
            edit() {
                this.formStatus = "normal";
                this.searchForm.active = true;
                // this.scrollConfig.autoCreate = true;
            }
        }
    }
</script>

<style lang="scss">
    .search-form {
        transition: all 0.1s ease-in;
        flex: 0 0 50px;
        position: relative;
        display: flex;
        height: 50px;
        overflow: hidden;
        padding-bottom: 15px;

        &.active {
            flex: 0 0 150px;
            height: 150px;
            overflow: auto;

            .gm-scrollbar {
                display: block;

                &.-horizontal {
                    display: none;
                }
            }
        }

        .form-item-area {
            flex: 1 1 auto;
            overflow: hidden;
            position: relative;
        }

        .gm-scrollbar {
            display: none;
        }

        .gm-scroll-view {
            display: flex;
            flex-wrap: wrap;
        }

        .search-button-area {
            flex: 0 0 200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .search-form-toggle-area {
            position: absolute;
            bottom: 0;
            left: 50%;
            font-size: 12px;
            color: #909399;
            width: 100px;
            margin-left: -50px;
            cursor: pointer;
            text-align: center;
        }

        .form-label {
            flex: 0 0 100px;
            text-align: right;
            padding-right: 15px;
        }
    }

    .search-params {
        flex: 0 0 auto;
        margin-top: 10px;

        > span {
            font-size: 14px;
        }

        .el-tag {
            margin: 5px 5px;
        }
    }
</style>