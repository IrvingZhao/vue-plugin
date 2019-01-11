<template>
    <div class="page-content">
        <div class="search-form-area">
            <slot name="searchForm"></slot>
        </div>
        <div class="tool-bar-area">
            <slot name="toolBar"></slot>
        </div>
        <div class="grid">
            <slot name="grid"></slot>
        </div>
        <slot name="pagination"></slot>
    </div>
</template>

<script>
    export default {
        name: "xlb-base-page"
    }
</script>

<style lang="scss">
    .page-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        .search-form-area {
            flex: 0 0;
            width: 100%;
            height: 100%;
        }
        .tool-bar-area {
            flex: 0 0;
            width: 100%;
            height: 100%;
        }
        .grid {
            flex: 1 1 auto;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
</style>