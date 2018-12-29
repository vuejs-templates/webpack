<template>
  <div class="header-wrap">
    <div class="content">
      <el-input placeholder="请输入内容">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div class="content right-content">
        <img src='static/avatar.jpg'>
        <i class="el-icon-setting"></i>
        <i class="el-icon-bell"></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style src='@/styles/header.less' lang='less'></style>
