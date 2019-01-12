<template>
  <div class="header-wrap">
    <div class="title-wrap">
      <div class="title" v-text="title || 'GENERAL'"></div>&nbsp;&nbsp;|&nbsp;&nbsp;
      <div class="subtitle" v-text="subtitle || 'Dashboard'"></div>
    </div>
    <div class="content">
      <div class="dropdown-wrap">
        <el-badge :value="12" class="item mail">
          <i class="iconfont icon-mail"></i>
        </el-badge>
      </div>
      <div class="dropdown-wrap">
        <el-badge :value="9" class="notification item">
          <i class="iconfont icon-notification"></i>
        </el-badge>
      </div>
      <div class="dropdown-wrap">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            Twin Atlantic
            <i class="iconfont icon-caret-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="Profile">Profile</el-dropdown-item>
            <el-dropdown-item command="Setting">Setting</el-dropdown-item>
            <el-dropdown-item command="SignOut">SignOut</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="avatar-wrap">
        <img src="/static/avatar.png">
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.less" lang="less"></style>
