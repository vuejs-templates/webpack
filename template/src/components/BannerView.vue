<template>
  <div class="banner-wrap">
    <div class="content">
      <span class="welcome">{{title}}</span>
      <span class="login-time" v-if="subTitle">{{subTitle}}</span>
    </div>
    <div class="content right-content">
      <div class="banner-item" :style="{ 
          justifyContent: !item.subKey ? 'center' : 'space-between',
        }" v-for="(item, index) in bannerDatas" :key="index">
        <div class="banner-cell" :class="item.subKey ? 'banner-cell-top' : ''">
          <span>{{item.key}}</span>
          <span>{{item.value}}</span>
        </div>
        <div class="banner-cell banner-cell-bottom" v-if="item.subKey">
          <span>{{item.subKey}}</span>
          <span>{{item.subValue}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
    bannerDatas: Array
  }
};
</script>

<style lang="less" scoped>
@import url('../styles/index.less');
@linarLeftColor: #4766b1;
@linarRightColor: @mainColor;
@cellHeight: 250px;
.banner-wrap {
    .flexDisplay();
    flex-direction: row;
    justify-content: space-between;
    height: @cellHeight;
    border-radius: 6px;
    background: -webkit-linear-gradient(left, @linarLeftColor, @linarRightColor);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, @linarLeftColor, @linarRightColor);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, @linarLeftColor, @linarRightColor);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, @linarLeftColor, @linarRightColor);
    /* 标准的语法（必须放在最后） */
    width: 100%;
    .content {
        .flexDisplay();
        height: @cellHeight;
        color: #fff;
        flex-direction: column;
        justify-content: center;
        &.right-content {
            flex-direction: row;
            width: 60%;
        }
        .welcome {
            font-size: 24px;
            padding-left: 30px;
            margin-bottom: 15px;
        }
        .login-time {
            font-size: 20px;
            padding-left: 30px;
        }
        .banner-item {
            .flexDisplay();
            flex: 1;
            height: @cellHeight;
            flex-direction: column;
            padding: 0 30px;
            .banner-cell {
                .flexDisplay();
                flex-direction: column;
                &.banner-cell-top {
                    padding-top: 30px;
                }
                &.banner-cell-bottom {
                    padding-bottom: 30px;
                }
                span {
                    &:first-child {
                        font-size: 20px;
                    }
                    &:last-child {
                        font-size: 30px;
                    }
                }
            }
        }
    }
}
</style>
