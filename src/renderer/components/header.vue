<template>
    <div class="header">
        <div class="header-logo">
            <span class="logo iconfont">&#xe60f;</span>
            <span class="text">工具箱</span>
        </div>
        <div class="header-setbutton iconfont">
            <div class="setbutton" @click="toggleDark" v-if="isDark">
                &#xe600;
            </div>
            <div class="setbutton" @click="toggleDark" v-else>
                &#xe602;
            </div>
            <div class="setbutton" @click="minimize">&#xe629;</div>
            <div class="setbutton" v-if="!ismax" @click="maximize">&#xe651;</div>
            <div class="setbutton" v-else @click="unmaximize">&#xe614;</div>
            <div class="setbutton" @click="close">&#xe603;</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const isDark = ref(false);
const ismax = ref();
window.onload = () => {
    setbuttons.getmax((event, str) => {
        ismax.value = str
    })
}
const toggleDark = () => {
    isDark.value = !isDark.value
    const html = document.querySelector('html')
    if (html) {
        if (isDark.value) {
            html.classList.remove("dark");
            html.classList.add("light");
        } else {
            html.classList.remove("light");
            html.classList.add("dark");
        }
    }
}
function minimize() {
    setbuttons.minimize()
}
function maximize() {
    setbuttons.maximize()
}
function unmaximize() {
    setbuttons.unmaximize()
}
function close() {
    setbuttons.close()
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    -webkit-app-region: drag;
    box-shadow: 0px -1px 0px #77777777 inset;

    &-logo {
        display: flex;
        color: #409eff;
        text-shadow: 0 0 8px #409eff;
        transition: all 0.3s;

        .logo {
            width: 30px;
            height: 30px;
            margin: 15px 0px 15px 15px;
            font-size: 26px;
            line-height: 30px;
            text-align: center;
            -webkit-app-region: no-drag;
        }

        .text {
            height: 30px;
            margin: 15px 0;
            font-size: 16px;
            font-weight: 700;
            line-height: 30px;
            -webkit-app-region: no-drag;
        }

        &:hover {
            text-shadow: 0 0 14px #409eff;
        }
    }

    &-setbutton {
        display: flex;

        .setbutton {
            width: 30px;
            height: 30px;
            line-height: 30px;
            margin: 15px 5px;
            text-align: center;
            border-radius: 5px;
            -webkit-app-region: no-drag;
            transition: background-color 0.3s;
            transition: font-size 0;

            &:hover {
                background-color: #77777777;
            }

            &:active {
                font-size: 14px;
            }
        }

        .setbutton_theme {
            height: 30px;
            margin: 15px 5px;
            text-align: center;
        }
    }
}
</style>