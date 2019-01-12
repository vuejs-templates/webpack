<template>
    <div class="sf-title-wrap">
        <div class="title" v-text="title"></div>
        <div class="button" v-if="buttonText" @click="onPress"></div>
    </div>
</template>

<script src="./index.js"></script>

<style src="./index.less" lang="less"></style>
