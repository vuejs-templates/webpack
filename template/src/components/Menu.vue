<template>
  <div class="menu-wrap">
    <div class="title-wrap">
      <div class="title-padding">
        <div>DEMO</div>
      </div>
    </div>
    <div class="menu-item" v-for="(item, index) in menuList" :key="index">
        <div class="menu-title-view" v-if="item.title">
            <span>{{item.title}}</span>
        </div>
        <div class="menu-content" :class="subItem.actived ? 'actived' : ''" v-for="(subItem, subIndex) in item.titleDatas" :key="subIndex" @click="handleClick(index, subIndex, subItem.actived)">
            <span>{{subItem.title}}</span>
        </div>
    </div>
  </div>
</template>

<script src='@/js/menu.js'></script>

<style src='@/styles/menu.less' lang='less'></style>
