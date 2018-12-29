<template>
  <div class="login-wrap">
    <div class="login-main">
      <div class="login-title">DEMO</div>
      <div class="login-content">
        <el-form label-position="right" :model="form" :rules="rules" ref="form">
          <el-form-item label="登录账号" prop="name">
            <el-input v-model="form.name" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script src="@/js/login.js"></script>

<style lang="less" src="@/styles/login.less"></style>
