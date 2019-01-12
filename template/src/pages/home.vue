<template>
  <div class="page-wrap home-wrap">
    <Title title="Ecommerce Overview"></Title>
    <div class="home-general-rules">
      <div class="general-rulesItem" v-for="(item, index) in GeneralRulesDatas" :key="index">
        <GeneralRulesItem
          :icon="item.icon"
          :title="item.title"
          :label="item.label"
          :backgroundColor="item.backgroundColor"
        ></GeneralRulesItem>
      </div>
    </div>
    <div class="table-wrap">
      <div class="table-form-wrap">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <div class="content-wrap left">
            <el-form-item>
              <el-input v-model="formInline.name" placeholder="Search">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item>
          </div>
          <div class="content-wrap right">
            <el-form-item label="Date">
              <el-date-picker v-model="formInline.date" type="date" placeholder="Pick date"></el-date-picker>
            </el-form-item>
            <el-form-item label="Type">
              <el-select v-model="formInline.type" placeholder="Pick type">
                <el-option label="ONE" value="ONE"></el-option>
                <el-option label="TWO" value="TWO"></el-option>
                <el-option label="THREE" value="THREE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="State">
              <el-select v-model="formInline.state" placeholder="Pick state">
                <el-option label="online" value="online"></el-option>
                <el-option label="offline" value="offline"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Search</el-button>
              <el-button type="primary" @click="onReset" plain>Reset</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :pageSize="2" :total="20" :currentPage="1" @onPressButton="handlePageClick"></Pagination>
    </div>
  </div>
</template>

<script src="@/js/home.js"></script>

<style src="@/styles/home.less" lang="less"></style>
