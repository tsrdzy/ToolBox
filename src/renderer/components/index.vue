<template>
    <div class="tsrtoolbox">
        <div class="tsrtoolbox-header">
            <headnav />
        </div>
        <div class="tsrtoolbox-main">
            <div class="tsrtoolbox-nav">
                <navigation></navigation>
            </div>
        </div>





    </div>
</template>

<script lang="ts" setup>
import navigation from "@/components/nav.vue";
import headnav from '@/components/header.vue';
</script>

<style lang="scss" scoped>
.tsrtoolbox {
    width: 100%;
    height: 100%;

    &-header {
        width: 100%;
        height: 60px;
    }

    &-main {
        display: flex;
        height: calc(100% - 60px);

        .tsrtoolbox-nav {
            width: 100%;
        }
    }
}
</style>