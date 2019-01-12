<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="content left">
          <div class="welcome-text">Welcome to <div class="name">Seafood Market</div></div>
      </div>
      <div class="content right">
        <div class="title-content">
          <div class="welcome">Sign In</div>
          <div class="sub-welcome">Please enter your login information to enter.</div>
        </div>
        <div class="form-content">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="submit-button-content">
              <el-button type="primary" @click="submitForm('ruleForm')">Sign In</el-button>
              <div class="forgot-password">Forgot password?</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/js/login.js"></script>

<style src="@/styles/login.less" lang="less"></style>
