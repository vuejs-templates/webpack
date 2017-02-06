<template>
    <div class='btn' @click='say'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        methods: {
            say () {
                alert('hello')
            }
        }
    }
</script>

<style scoped lang='less'>
    .btn {
        display: inline-block;
        border: 1px solid #ddd;
        padding: 5px 10px;
        cursor: pointer;
        user-select: none;

        &:hover {
            background: #eee;
        }
    }
</style>
