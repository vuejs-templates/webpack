class fullscreen{
  // constructor(element) {
  //   this.element = element
  // }
  on(element=document.documentElement) {
    if(element.requestFullscreen) {
      element.requestFullscreen()
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
    this.full = true
  }
  off() {
    if(document.exitFullscreen) {
      document.exitFullscreen()
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
    this.full = false
  }
  toggle() {
    if (this.full === true) {
      this.off()
    }else{
      this.on()
    }
  }
}

export default new fullscreen()

// import fullscreen from '@utils/fullscreen.js'
