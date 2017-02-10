<template>
    <div class='btn'>
        <slot></slot>
    </div>
</template>

<style scoped lang='less'>
    .btn {
        display: inline-block;
        border: 1px solid #ddd;
        padding: 5px 10px;
        color: #333;
        background-color: #eee;
        cursor: pointer;
        user-select: none;

        &:hover {
            background: #eee;
        }
    }
</style>
