<template>
    <div class="IndexPage">
        <demo-component></demo-component>
    </div>
</template>
<script>
    import DemoComponent from '../components/DemoComponent';

    export default {
        components: {DemoComponent},
        name: 'index-page',
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    .IndexPage {

    }
</style>
