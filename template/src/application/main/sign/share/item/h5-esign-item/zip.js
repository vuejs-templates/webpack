/*eslint-disable */
import './exif'

function Zip (options) {
  options = options || {}
  this.canvas = document.createElement('canvas')
  this.context = this.canvas.getContext('2d')
  this.zipFileSize = 0
  this.quality = options.quality|| 0.1
  this.compressNum = 0
  this.oldsrc = null
  this.orientation = null
  this.resolve = null
  this.maxSize = options.maxSize || 400 * 1024
}

Zip.prototype.getInfo = function (blob = null, base64 = null) {
  return new Promise((resolve, reject) => {
    let source = blob ? blob : this.dataURLtoBlob(base64)
    EXIF.getData(source, function(){
      let Orientation = EXIF.getTag(this, 'Orientation')
      let width,height,_self = this
      if (base64) {
        var img = new Image()
        img.src = base64
        img.onload = (ev) => {
          resolve({Orientation,
            fileSize: this.size,
            width:ev.target.width,
            height:ev.target.height,
            src:ev.target})
        }
      } else {
        this.reader = new FileReader()
        this.reader.readAsDataURL(source)
        this.reader.onload = (e) => {
          var img = new Image()
          img.src = e.target.result
          img.onload = (ev) => {
            resolve({Orientation,
              fileSize: e.total,
              width:ev.target.width,
              height:ev.target.height,
              base64:e.target.result,
              src:ev.target})
          }
        }
      }
    })
  })
}

Zip.prototype.toDataURL = function (file) {
  return new Promise( (resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload  = e => {
      resolve(e.target.result)
    }
    reader.onerror = e => {
      reject(reader.error)
    }
  })
}

Zip.prototype.run = function (blob = null, base64 = null) {
  return new Promise((resolve, reject) => {
    let repeat = (o) => {
      // debugger
      if (o && (o.fileSize >= this.maxSize)) {
        return this.getInfo(null ,this.compress(o.src))
      } else {
        return new Promise((solve,ject) => {
          solve({
            fileSize: o.fileSize,
            width: o.width,
            height: o.height,
            base64: o.src.src,
            src: o.src
          })
        })
      }
      //  if (!o) {
      //    resolve()
      //  } else {
      //    debugger
      //    alert(this.Orientation)
      //  if (this.Orientation) {
      //      debugger
      //      let zipImage = o.src
      //      let width = zipImage.width
      //      let height = zipImage.height
      //      let zipCanvas = document.createElement('canvas'),
      //          zipCtx = zipCanvas.getContext('2d')
      //        switch (this.orientation){
      //          case 6:
      //            zipCanvas.width = height
      //            zipCanvas.height = width
      //            zipCtx.rotate(90 * Math.PI / 180)
      //            zipCtx.drawImage(zipImage, 0, -height)
      //            break;
      //          case 8:
      //            zipCanvas.width = zipImage.height
      //            zipCanvas.height = zipImage.width
      //            zipCtx.rotate(3 * 90 * Math.PI / 180)
      //            zipCtx.drawImage(zipImage, -width, 0)
      //            break;
      //          case 3:
      //            zipCanvas.width = zipImage.width
      //            zipCanvas.height = zipImage.height
      //            zipCtx.rotate(2 * 90 * Math.PI / 180)
      //            zipCtx.drawImage(zipImage, -width, -height)
      //            break;
      //          default:
      //            zipCanvas.width = width
      //            zipCanvas.height = height
      //            zipCtx.rotate(0 * 90 * Math.PI / 180)
      //            zipCtx.drawImage(zipImage, 0, 0)
      //            break;
      //        }
      //      let ndata = zipCanvas.toDataURL('image/jpeg', 0.92)
      //      document.getElementById('abc').src = ndata
      //      this.Orientation = null
      //      resolve({
      //        fileSize: o.fileSize,
      //        width: width,
      //        height: height,
      //        base64: ndata,
      //        src: o.src
      //      })
      //  } else {
      //  if (o) {
      //  resolve({
      //    fileSize: o.fileSize,
      //    width: o.width,
      //    height: o.height,
      //    base64: o.src.src,
      //    src: o.src
      //  })
      //  }
      //  }
      // }
    }
    this.getInfo(blob, base64).then(
      (o) => {
        this.oldsrc = o
        this.Orientation = o.Orientation
        return this.getInfo(null ,this.compress(o.src))
      }
    ).then(
      o => repeat(o)
    ).then(
      o => repeat(o)
    ).then(success => {
      if (this.Orientation) {
        let zipImage = success.src
        let width = zipImage.width
        let height = zipImage.height
        let zipCanvas = document.createElement('canvas'),
          zipCtx = zipCanvas.getContext('2d')
        switch (this.Orientation){
          case 6:
            zipCanvas.width = height
            zipCanvas.height = width
            zipCtx.rotate(90 * Math.PI / 180)
            zipCtx.drawImage(zipImage, 0, -height)
            break;
          case 8:
            zipCanvas.width = zipImage.height
            zipCanvas.height = zipImage.width
            zipCtx.rotate(3 * 90 * Math.PI / 180)
            zipCtx.drawImage(zipImage, -width, 0)
            break;
          case 3:
            zipCanvas.width = zipImage.width
            zipCanvas.height = zipImage.height
            zipCtx.rotate(2 * 90 * Math.PI / 180)
            zipCtx.drawImage(zipImage, -width, -height)
            break;
          default:
            zipCanvas.width = width
            zipCanvas.height = height
            zipCtx.rotate(0 * 90 * Math.PI / 180)
            zipCtx.drawImage(zipImage, 0, 0)
        }
        let ndata = zipCanvas.toDataURL('image/jpeg', 0.92)
        // document.getElementById('abc').src = ndata
        this.Orientation = null
        resolve({
          fileSize: success.fileSize,
          width: width,
          height: height,
          base64: ndata,
          src: success.src
        })
      } else {
        resolve(success)
      }
    }, error => {
      console.dir(error)
    }).catch(error => console.log(error))
  })
}
/* description: 压缩
 * @ param
 *   base64 图片base64
 * @ return
 *    Blob  文件Blob
 */
Zip.prototype.compress = function (images, quality = this.quality) {
  let img = images,initSize = img.src.length, width = img.width,height = img.height,
    tCanvas = document.createElement('canvas'),tctx = tCanvas.getContext('2d'),ratio

  if ((ratio = width * height / 4000000)>1) {
    ratio = Math.sqrt(ratio)
    width /= ratio
    height /= ratio
  }else {
    ratio = 1
  }
  this.canvas.width = width
  this.canvas.height = height
  this.context.fillStyle = "#fff"
  this.context.fillRect(0, 0, width, height)
  let count,nw,nh
  if ((count = width * height / 1000000) > 1) {
    count = 5
    nw = ~~(width / count)
    nh = ~~(height / count)
    tCanvas.width = nw
    tCanvas.height = nh
    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
        this.context.drawImage(tCanvas, i * nw, j * nh, nw, nh)
      }
    }
  } else {
    this.context.drawImage(img, 0, 0, width, height)
  }
  let zipBase64 = this.canvas.toDataURL('image/jpeg', quality )
  tCanvas.width = tCanvas.height = this.canvas.width = this.canvas.height = 0
  return zipBase64
}

Zip.prototype.dataURLtoBlob = function (dataURL) {
  if (!dataURL) return
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bStr = atob(arr[1])
  let n = bStr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime });
}
export default Zip

/*eslint-enable */
