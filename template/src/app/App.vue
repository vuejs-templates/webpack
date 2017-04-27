<template>
    <div class="App">
        <div class="App_logoSprite"></div>
        <div class="App_logoStatic"></div>
        <img src="~static/lhs.png" width="124" height="124">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'app',
    }
</script>

<style src="styles/main.less" lang="less"></style>

<style scoped lang="less" rel="stylesheet/less">

    @import (reference) "~styles/main.less";

    .App {

    }
    .App_logoSprite {
        .sprite;
        .sprite-lhs;
    }

    .App_logoStatic {
        background: url('~static/lhs.png');
        background-size: 124px 124px;
        width: 124px;
        height: 124px;
    }
</style>
