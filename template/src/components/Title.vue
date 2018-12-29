<template>
    <div class="componten-title-main">
        <div class="title-text">{{title}}</div>
        <div class="title-right" v-if="rightButton">
            <el-button type="primary" @click="handleClick">{{buttonText}}</el-button>
        </div>
    </div>   
</template>

<script>
export default {
    props: {
        title: String,
        buttonText: String,
        rightButton: Boolean,
    },
    methods: {
        handleClick() {
            this.$emit('onPress');
        }
    }
}
</script>

<style lang="less" src="@/styles/title.less"></style>
