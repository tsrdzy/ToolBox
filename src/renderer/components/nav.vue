<template>
    <div class="main">
        <div class="navs">
            <el-menu default-active="0" @mouseenter="navsmouseenter" @mouseleave="navsmouseleave"
                class="el-menu-vertical" :collapse="isCollapse">
                <el-scrollbar height="100%">
                    <el-menu-item @click="onlists(i)" :index="i.toString()" :key="typelist.type"
                        v-for="typelist, i in typelists">
                        <el-icon><span class="iconfont" style="font-weight: 700;"
                                v-html="typelist.icon"></span></el-icon>
                        <template #title>{{ typelist.type }}</template>
                    </el-menu-item>
                </el-scrollbar>
            </el-menu>
        </div>
        <div class="content">
            <div class="cards">
                <el-card class="card" @click="openwindow(list.title, list.url)" :key="list.title" v-for="list in lists">
                    <div class="header">
                        <div class="logo"><span class="iconfont" v-html="list.logo"></span></div>
                        <div class="title">
                            <div class="text">{{ list.title }}</div>
                            <div class="tab">
                                <el-tag type="success">{{ list.type }}</el-tag>
                                <el-tag type="primary" :key="tag" v-for="tag in list.tag">{{ tag }}</el-tag>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="hint">
                        {{ list.intro }}
                    </div>
                    <div class="footer">
                        <div class="collect iconfont"><span>&#xe87d;</span>设为常用</div>
                        <div class="time">{{ list.time }}</div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const isCollapse = ref(true);
const typelists = ref([
    {
        type: '全部',
        icon: '&#xe650;',
        lists: []
    },
    {
        type: '文字类',
        icon: '&#xe611;',
        lists: []
    },
    {
        type: '文本类',
        icon: '&#xeb66;', label: "text",
        lists: []
    },
    {
        type: '图像类',
        icon: '&#xe872;', label: "graphics",
        lists: [
        { type: "计算", title: "测试工具", url: "/asmdbuilder", logo: "&#xe706;", tag: ["生成", "随机"], intro: "随机生成加减乘除的生成器", time: "2024年11月18日" },
        ]
    }, {
        type: '音频类',
        icon: '&#xe98e;', label: "audio",
        lists: []
    }, {
        type: '视频类',
        icon: '&#xeafb;', label: "video",
        lists: []
    }, {
        type: '开发类',
        icon: '&#xe733;', label: "exploit", lists: []
    }, {
        type: '运维类',
        icon: '&#xe6af;', label: "ops", lists: []
    }, {
        type: '设计类',
        icon: '&#xe70a;', label: "design", lists: []
    }, {
        type: '学术类',
        icon: '&#xe605;', label: "science", lists: []
    }, {
        type: '计算类',
        icon: '&#xe8b4;', label: "compute", lists: [
            { type: "计算", title: "测试工具", url: "/asmdbuilder", logo: "&#xe706;", tag: ["生成", "随机"], intro: "随机生成加减乘除的生成器", time: "2024年11月18日" },


        ]
    }, {
        type: '查询类',
        icon: '&#xe615;', label: "inquire", lists: []
    }, {
        type: '其他',
        icon: '&#xe631;', label: "other", lists: []
    }
])
const lists = ref([])
//移入
function navsmouseenter() {
    isCollapse.value = false;
}
//移出
function navsmouseleave() {
    isCollapse.value = true;
}
//侧边栏被单击
function onlists(data) {
    lists.value = typelists.value[data].lists
    if (data == 0) {
        lists.value = []
        for (let i = 0; i < typelists.value.length; i++) {
            lists.value = lists.value.concat(typelists.value[i].lists)
        }
    }
}
//创建窗口
function openwindow(name, url) {
    if (url == "" || url == undefined || url == null || url == "/") {
        const audio = new Audio("../assets/audio/hint.wav")
        audio.play();
        ElNotification.error({
            title: '错误',
            message: '该链接未设置,请联系作者',
            position: 'bottom-right',
            showClose: false,
        })
        return
    }
    api.openwindow([name, url])
}
//进入生命周期
onMounted(() => {
    onlists(0)
})
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    align-items: stretch;
    height: 100%;

    .navs {
        height: 100%;

        .el-menu-vertical {
            height: 100%;
        }

        .el-menu-vertical:not(.el-menu--collapse) {
            width: 120px;
        }
    }

    .content {
        width: 100%;
        padding: 10px;

        .cards {
            display: flex;
            flex-wrap: wrap;

            .card {
                width: 300px;

                hr {
                    margin: 4px 0;
                    border: 0;
                    box-shadow: 0 1px 0 #77777777;
                    height: 1px;
                }

                .header {
                    display: flex;
                    height: 50px;
                    width: 100%;

                    .logo {
                        height: 40px;
                        width: 40px;
                        margin: 5px;
                        text-align: center;
                        line-height: 40px;
                        box-shadow: 0 0 2px;
                        border-radius: 5px;

                        span {
                            font-size: 30px;
                        }

                        span {}
                    }

                    .title {
                        .text {
                            font-size: 18px;
                            height: 25px;
                            line-height: 25px;
                        }

                        .tab {
                            display: flex;
                            height: 25px;
                            line-height: 25px;

                            span {
                                height: 19px;
                                line-height: 19px;
                                margin: 3px 2px 3px 0;

                            }
                        }

                    }
                }

                .hint {}

                .footer {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;

                    .collect {
                        font-size: 12px;
                    }

                    .time {
                        color: #77777777;
                    }
                }
            }

            .card:hover {
                box-shadow: 0px 0px 6px #77777777;
            }

        }
    }
}
</style>