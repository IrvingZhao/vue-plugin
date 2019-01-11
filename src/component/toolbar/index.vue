<template>
    <div class="tool-bar-content">
        <div class="left-toolbar">
            <div class="page-title">
                <slot name="pageTitle"></slot>
            </div>
            <div class="page-sec-title">
                <slot name="pageSecTitle"></slot>
            </div>
        </div>
        <div class="right-toolbar">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "xlb-toolbar",
    }
</script>

<style lang="scss">
    .tool-bar-content {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;
        .left-toolbar {
            flex: 0 0 auto;
            display: flex;
            align-items: baseline;
            .page-title {
                color: #303133;
                font-size: 24px;
                font-weight: bold;
            }
            .page-sec-title {
                margin-left: 15px;
            }
        }
        .right-toolbar {
            flex: 0 0 auto;
        }
    }
</style>