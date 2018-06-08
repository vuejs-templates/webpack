<!--
  图片采集（使用native采集)
-->
<template>
  <div class="hq-gather">
    <div class="bar-title">
      <h3>{{title}}</h3>
      <span class="btn-upload" @click="gather">
        <i :class="iconType"></i>
      </span>
    </div>
    <div class="list-preview" v-if="hasImage">
      <span class="item">
        <i @click="remove"></i>
        <em>
          <img :src="image" @click="enlarge"/>
        </em>
      </span>
    </div>
    <div class="tips" v-if="tips">{{tips}}</div>
  </div>
</template>
<script>
  import clone from '@/widget/util/clone'
  export default {
    model: {
      event: 'update',
      prop: 'model'
    },
    props: {
      model: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        // model的镜像，因为连续发射update事件时，后续使用model时，model可能还没来得及更新
        cache: null
      }
    },
    computed: {
      title: {
        get () {
          return this.model.desc
        }
      },
      iconType: {
        get () {
          const {cType} = this.model
          // cType: 1 签名， 2 拍照， 3 人脸识别， 4. 提示语抄录
          const iconMap = {
            camera: [2, 3],
            sign: [1, 4]
          }
          return Object.keys(iconMap).find(iconType => iconMap[iconType].indexOf(cType) >= 0)
        }
      },
      tips: {
        get () {
          return this.model.tips
        }
      },
      signPkgPath: {
        get () {
          return this.model.signPkgPath
        },
        set (signPkgPath) {
          this.update({signPkgPath})
        }
      },
      signImgPath: {
        get () {
          return this.model.signImgPath
        },
        set (signImgPath) {
          this.update({signImgPath})
          if (signImgPath === null) {
            this.faceFlag = null
          }
        }
      },
      photoPath: {
        get () {
          return this.model.photoPath
        },
        set (photoPath) {
          this.update({photoPath})
        }
      },
      faceFlag: {
        get () {
          return this.model.faceFlag
        },
        set (faceFlag) {
          this.update({faceFlag})
        }
      },
      image: {
        get () {
          const {model, model: {cType}} = this
          return (cType === 1 || cType === 4) ? model.signImgPath : model.photoPath
        }
      },
      hasImage: {
        get () {
          return !!this.image
        }
      }
    },
    methods: {
      // 更新model
      update (append) {
        // 当连续地emit update event时，后续创建更新payload时可能最新的数据还没有刷新，因此这里要使用快速缓存 this.cache
        const cached = !!this.cache
        let model = clone(cached ? this.cache : this.model)
        for (let key in append) {
          model[key] = append[key]
        }
        this.cache = clone(model)
        this.$emit('update', model)
      },
      // 从native处获取图片
      gather () {
        const {certNo, keyWordRule, title, cType, name} = this.model
        const serialized = JSON.stringify({...keyWordRule, certNo})
        window.caSign(name || title, cType, serialized).then(result => {
          const res = JSON.parse(result)
          let {signImgPath, signPkgPath, photoPath, faceFlag} = this
          switch (cType) {
          case 1:
            signImgPath = res.gestureImage // 签名 url
            signPkgPath = res.signData // 签名加密包的路径
            break
          case 2:
            photoPath = res.captureImage // 拍照url
            break
          case 3:
            if (res.IDRecognizeResult === '0') { // failed
              faceFlag = "1"
            }
            photoPath = res.gestureImage // 人脸识别url
            break
          case 4:
            signImgPath = res.gestureImage
            break
          }
          this.update({signImgPath, signPkgPath, photoPath, faceFlag})
        }).catch(e => {
          console.error(e)
        })
      },
      // 移除图片
      remove () {
        const {cType} = this.model
        if (cType === 1) {
          this.signImgPath = null
        } else {
          this.photoPath = null
        }
      },
      // 放大图片
      enlarge () {
        const {image} = this
        window.articleDetail(image)
      }
    }
  }
</script>
<style lang=less>
  .hq-gather{
    padding-right: 10px;
    .sign {
      background: url("~@/assets/styles/images/sign/sign.png") no-repeat center center;
      background-size: contain;
    }
    .camera {
      background: url("~@/assets/styles/images/sign/camera.png") no-repeat center center;
      background-size: contain;
    }
    .bar-title {
      display: flex;
      align-items: center;
      h3 {
        line-height: 45px;
        height: 45px;
        font-weight: normal;
        flex: 1;
      }
      .btn-upload {
        width: 25px;
        height: 25px;
        display: flex;
        padding: 5px;
        > i {
          flex: 1;
        }
      }
    }
    .list-preview{
      line-height: 0;
      margin-bottom: 10px;
      &::after{
        content: ' ';
        clear: both;
        display: block;
        line-height: 0;
        height: 0;
      }
      &:empty::after{
        content:'';
        clear: none;
      }
      .item{
        float: left;
        margin:8px 8px 8px 0;
        width: 50px;
        height: 50px;
        position: relative;
        z-index: 0;
        > i{
          position: absolute;
          display: block;
          top: -10px;
          right: -10px;
          width: 20px;
          height: 20px;
          background: url('~@/assets/styles/images/sign/dele.png') no-repeat;
          background-size: contain;
          z-index:1;
        }
        em{
          display: block;
          width: 50px;
          height: 50px;
          overflow: hidden;
        }
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .tips {
      font-size: 12px;
      color: #00b0ff;
      line-height: 1.75;
      padding: 0;
      margin-top: -10px;
    }
  }
</style>
