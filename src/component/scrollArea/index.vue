<template>
    <div class="scroll-area">
        <div :class="'scroll-control '+(config.disableLeft ? 'disable' : '')" :style="scrollAreaStyle">
            <i class="el-icon-my-prevpage" @click="scrollLeft"></i>
        </div>
        <div class="scroll-content" ref="scrollContent">
            <slot></slot>
        </div>
        <div :class="'scroll-control ' + (config.disableRight ? 'disable' : '')" :style="scrollAreaStyle">
            <i class="el-icon-my-nextpage" @click="scrollRight"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "xlb-scroll-area",
        created() {
        },
        props: {
            itemWidth: { //单个元素宽度，每个元素宽度相等
                type: [Number, String]
            },
            perSize: Number,//每页个数，等分宽
            scrollType: { //滚动类型，page 整页；item 单个元素，适用于设置perSize 或 itemWidth 的元素 ；数字 滚动像素数
                type: [Number, String],
                default: "page"
            }
        },
        provide() {
            return {
                scrollArea: this
            }
        },
        mounted() {
            this.computedItemWidth = this.getItemWidth();
        },
        computed: {
            scrollAreaStyle: {
                get() {
                    return 'font-size:' + this.controlSize + 'px;flex: 0 0 ' + this.controlSize + 'px';
                }
            },
            maxScrollSize: {
                get() {
                    let $scrollContent = this.$refs.scrollContent;
                    if (this.scrollType === "page") {
                        return Math.ceil($scrollContent.scrollWidth / $scrollContent.offsetWidth) - 1;//总页数
                    } else if (this.scrollType === "item") {
                        if (this.perSize) {
                            return this.$slots.default.length - this.perSize;//超出内容区个数
                        }
                        if (this.itemWidth) {
                            let width;
                            if (isNaN(this.itemWidth)) {
                                width = this.itemWidth.replace("px", "");
                            } else {
                                width = this.itemWidth;
                            }
                            return Math.ceil(($scrollContent.scrollWidth - $scrollContent.offsetWidth) / width);//超出内容区个数
                        }
                        throw new Error("scroll type cannot be 'item', when there are no itemWidth or perSize ");
                    } else if (typeof this.scrollType === "number") {
                        return Math.ceil(($scrollContent.scrollWidth - 300) / this.scrollType);
                    }
                }
            },
        },
        data() {
            return {
                controlSize: 12,
                scrollSize: 0,
                config: {
                    disableLeft: false,
                    disableRight: false,
                },
                computedItemWidth: "0px"
            }
        },
        methods: {
            getItemWidth() {
                let width;
                if (this.itemWidth) {
                    if (isNaN(this.itemWidth)) {
                        return this.itemWidth;
                    } else {
                        return this.itemWidth + "px";
                    }
                }
                if (this.perSize) {//每页N个，计算百分比
                    let parent = this.$refs.scrollContent;
                    if (!parent) {
                        return "0px";
                    }
                    let value = this.perSize;
                    return Math.floor(parent.offsetWidth / value) + "px";
                }
                return "auto";
            },
            getScrollWidth(scrollIndex) {//scrollIndex，左侧滚动数
                if (this.scrollType === "page") {
                    return (this.$refs.scrollContent.offsetWidth * scrollIndex) + "px";
                } else if (this.scrollType === "item") {
                    if (this.perSize) {
                        if (scrollIndex === 0) {
                            return "0%";
                        } else {
                            return (100 / (this.perSize)) * scrollIndex + "%";
                        }
                    }
                    if (this.itemWidth) {
                        if (isNaN(this.itemWidth)) {
                            return (this.itemWidth.replace("px", "") * scrollIndex) + "px";
                        } else {
                            return (this.itemWidth * scrollIndex) + "px";
                        }
                    }
                } else if (typeof this.scrollType === "number") {
                    return this.scrollType * scrollIndex + "px";
                }
            },
            scrollLeft(e) {
                if (this.scrollSize === 0) {
                    return;
                }
                this.disableRight = false;
                this.scrollSize -= 1;
                if (this.scrollSize === 0) {
                    this.disableLeft = true;
                }
                this.scroll();
            },
            scrollRight(e) {
                if (this.scrollSize >= this.maxScrollSize) {
                    return;
                }
                this.disableLeft = false;
                this.scrollSize += 1;
                if (this.scrollSize >= this.maxScrollSize) {
                    this.disableRight = true;
                }
                this.scroll();
            },
            scroll(dir) {
                let firstScrollItem = this.$refs.scrollContent.children[0];
                let scrollWidth = this.getScrollWidth(this.scrollSize * -1);
                firstScrollItem.style.marginLeft = scrollWidth;
            }
        }
    }
</script>

<style lang="scss">
    .scroll-area {
        width: 100%;
        display: flex;
        align-items: center;
        .scroll-control {
            flex: 0 0 36px;
            font-size: 36px;
            color: #D8D8D8;
            margin: 0 10px;
            > i:hover {
                color: #4A90E2;
                cursor: pointer;
            }
            &.disable > i:hover {
                color: #D8D8D8;
                cursor: default;
            }
        }
        .scroll-content {
            display: flex;
            flex: 1 1 auto;
            overflow: hidden;
        }
    }
</style>