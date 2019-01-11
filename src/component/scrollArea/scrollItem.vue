<template>
    <div class="scroll-item" v-item-width="scrollArea.computedItemWidth">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "scroll-item",
        inject: ["scrollArea"],
        created() {
            if (!this.scrollArea) {
                throw new Error("scroll-item must be child of scroll-area");
            }
        },
        directives: {
            itemWidth: {
                componentUpdated(el, binding) {
                    el.style.flex = "0 0 " + binding.value;
                },
            }
        },

    }
</script>

<style scoped>
    .scroll-item {
        transition: margin-left 0.3s ease-in;
    }
</style>