<!--
  使用native图片上传（多项),对应于其它资料和证件影像上传
-->
<template>
  <div class="hq-gather-multiple">
    <div class="bar-title">
      <div v-if="richTitle" class="title-rich">
        <h3>
          <span>{{customerName}}</span>
          <label :class="customerType.code">{{customerType.name}}</label>
        </h3>
        <p>
          <small>{{certType}}</small>
          <small>{{certNo}}</small>
        </p>
      </div>
      <h3 v-else>{{name}}</h3>
      <span class="btn-upload" @click="gather" v-if="editable">
        <i class="camera"></i>
      </span>
    </div>
    <div class="list-preview" v-if="hasImage">
      <span v-for="(image,index) in images" class="item" :key="index">
        <i @click="remove(index)"></i>
        <em>
          <img :src="image.url" @click="enlarge(image)"/>
        </em>
      </span>
    </div>
    <div class="tips" v-if="tips">{{tips}}</div>

  </div>
</template>
<script>
  import clone from '@/widget/util/clone'
  import isArray from '@/widget/util'
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
      },
      richTitle: {
        type: Boolean,
        default () {
          return false
        }
      },
      multiple: {
        type: Boolean,
        default () {
          return true
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
      customerName: {
        get () {
          return this.model.customerName
        }
      },
      name: {
        get () {
          return this.model.name
        }
      },
      tips: {
        get () {
          return this.model.tips
        }
      },
      customerType: {
        get () {
          const {customerType} = this.model
          return ({
            1: {name: '投保人', code: 'applicant'},
            2: {name: '被保人', code: 'insurant'},
            3: {name: '受益人', code: 'beneficiary'}
          })[customerType]
        }
      },
      certNo: {
        get () {
          return this.model.certNo
        }
      },
      certType: {
        get () {
          return this.model.certType
        }
      },
      editable: {
        get () {
          const {model: {maxNum}, images} = this
          return (images || []).length < maxNum
        }
      },
      images: {
        get () {
          return this.model.imagePathList || []
        },
        set (imagePathList) {
          this.update({imagePathList})
        }
      },
      hasImage: {
        get () {
          return this.images && this.images.length > 0
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
        if (this.multiple) return this.gatherMultiple()
        window.callCamera().then(result => {
          const img = JSON.parse(result) // imageObject有url，local有个key
          let images = clone(this.images) || []
          images.push(img)
          this.images = images
        }).catch(console.error)
      },
      // 从native处获取图片，多选模式
      gatherMultiple () {
        const {maxNum = 1} = this.model
        const num = Math.max(1, maxNum - this.images.length)
        window.callCameraMultiple(num).then(result => {
          const appendImages = JSON.parse(result) || []
          let images = clone(this.images) || []
          this.images = images.concat(appendImages)
        }).catch(console.error)
      },
      // 移除图片
      remove (index) {
        const images = clone(this.images)
        images.splice(index, 1)
        this.images = images
      },
      // 放大图片
      enlarge ({url}) {
        window.articleDetail(url)
      }
    }
  }
</script>
<style lang='less'>
  .hq-gather-multiple{
    width: 100%;
    box-sizing: border-box;
    padding-right: 10px;
    .sign {
      background: url("~@/assets/styles/images/sign/sign.png") no-repeat center;
      background-size: contain;
    }
    .camera {
      background: url("~@/assets/styles/images/sign/camera.png") no-repeat center;
      background-size: contain;
    }
    .bar-title {
      display: flex;
      align-items: center;
      > h3 {
        line-height: 45px;
        height: 45px;
        font-weight: normal;
      }
      > .title-rich, > h3{
        flex: 1;
      }
    }
    .title-rich {
      padding-top: 5px;
      padding-bottom: 5px;
      > h3, > p{
        display: flex;
      }
      > h3 {
        font-weight: normal;
      }
      h3{
        color: #333;
        font-size: 15px;
        font-weight: normal;
      }
      h3, p{
        line-height: inherit;
        margin: 8) 0;
      }
      label{
        display:inline-block;
        border-radius: 3px;
        font-size: 12px;
        color: white;
        padding: 0 5px;
        margin-left: 12px;
        position:relative;
        top: -1.5px;
        line-height: 17.5px;
        height: 17.5px;
      }
      /*投保人*/
      .applicant{
        background-color: #00adff;
      }
      /*被保人*/
      .insurant{
        background-color: #00cdbf;
      }
      /*受益人*/
      .beneficiary{
        background-color: #fa9a28;
      }
      small{
        color:#999;
        font-size: 13px;
      }
      small + small {
        margin-left: 12px;
      }
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
        margin:8) 8) 8) 0;
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
