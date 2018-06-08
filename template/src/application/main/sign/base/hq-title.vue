<template>
  <h3 class="hq-title"><slot/></h3>
</template>
<style lang='less'>
  .hq-title{
    font-weight: normal;
    line-height: rem-calc(40);
    height: rem-calc(40);
    color: #646464;
    font-size: rem-calc(15);
    padding: 0 rem-calc(15);
    background-color: #f7f7f7;
    &::before{
       content:' ';
       display:inline-block;
       width: rem-calc(3);
       height: rem-calc(16);
       line-height: rem-calc(16);
       background-color: #00b0ff;
       margin-right: rem-calc(8);
       margin-bottom: rem-calc(-3);
     }
  }
</style>
