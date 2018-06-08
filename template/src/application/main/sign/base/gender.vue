<script>
  export default {
    name: 'c_gender',
    data () {
      return {
        seled: this.gender
      }
    },
    template: `
            <div class="choose_gender">
              <div class="choose_gender_content">
                <div class="male" :class="{seled: seled}" @click="checkgander('M')">男</div>
                <div class="famale" :class="{seled: !seled}" @click="checkgander('F')">女</div>
             </div>
            </div>`,
    props: ['gender'],
    watch: {
      'gender' (val) {
        if (val) {
          this.seled = true
        } else {
          this.seled = false
        }
      }
    },
    methods: {
      checkgander (n) {
        if (n == 'M') {
          this.seled = true
          this.$emit('Click', n)
        } else {
          this.seled = false
          this.$emit('Click', n)
        }
      }
    }
  }
</script>
<style lang='less' >
 /* .progressscanidcard-page .listbox ul > li .choose_gender{
    margin-top: rem-calc(15/2) !important;
  }*/
  input{
    font-size: rem-calc(30/2)!important;
  }
  .choose_gender {
    display: inline-block;
    width: rem-calc(170px);
    height: rem-calc(31px);
    /*background-color: red;*/
    overflow: hidden;
    position: relative;
    .choose_gender_content {
      /*width: rem-calc(160px);*/
      overflow: hidden;
      height: rem-calc(31px);
      position: relative;
      & > div {
        position: absolute;
        top: rem-calc(-14.5px);
        color: #999999;
        display: inline-block;
        /*border: 1px solid #c3c3c3;*/
        background: url("~@/assets/image/gender.png") no-repeat;
        background-size: 100% 100%;
        border-radius: rem-calc(100px);
        position: relative;
        width: rem-calc(160px);
        /*padding-left: rem-calc(20px);*/
        box-sizing: border-box;
        height: rem-calc(60px);
        line-height: rem-calc(60px);
        vertical-align: middle;
        text-indent: rem-calc(58px);
        font-size: rem-calc(26px);
        transform: scale(.5);
        /*margin-left: rem-calc(-25px);*/
        &:before {
          content: '';
          position: absolute;
          top: rem-calc(12px);
        }
        &.male {
          position: absolute;
          left: rem-calc(-160/4px);
          padding-left: rem-calc(24px);
          &:before {
            background: url("~@/assets/image/male.png") no-repeat;
            background-size: 100%;
            width: rem-calc(28px);
            height: rem-calc(30px);
            left: rem-calc(40px) !important;
            top: rem-calc(28/2) !important;
          }
          &.seled {
            border: none;
            background: #91dbfe;
            color: #fff;
            &:before {
              background: url("~@/assets/image/male_seled.png") no-repeat;
              background-size: 100%;
              width: rem-calc(28px);
              height: rem-calc(30px);
              left: rem-calc(20px);
            }
          }
        }
        &.famale {
          position: absolute;
          right: rem-calc(-158/4px);
          padding-left: rem-calc(22px);
          /*margin-left: rem-calc(-45px);*/
          &.seled {
            background: #fb7d8f;
            color: #fff;
            border: none;
            &:before {
              background: url("~@/assets/image/famale_seled.png") no-repeat;
              background-size: 100% 100%;
              width: rem-calc(20px);
              height: rem-calc(30px);
              left: rem-calc(26px);
            }
          }
          &:before {
            background: url("~@/assets/image/famale.png") no-repeat;
            background-size: 100% 100%;
            width: rem-calc(20px);
            height: rem-calc(30px);
            left: rem-calc(46px) !important;
            top: rem-calc(28/2) !important;
          }
        }
      }
    }
  }
</style>
