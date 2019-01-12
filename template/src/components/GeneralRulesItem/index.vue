<template>
    <div class="GeneralRulesItem-wrap">
        <div class="icon-wrap" :style="{ backgroundColor: backgroundColor, }">
            <i class="iconfont" :class="icon"></i>
        </div>
        <div class="content">
            <div class="title" v-text="title"></div>
            <div class="label" v-text="label"></div>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.less" lang="less"></style>
