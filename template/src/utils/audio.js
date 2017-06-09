const audioUrl = {
  ok: 'static/voice/ok.m4a',
  no: 'static/voice/no.m4a',
  book: 'static/voice/book.m4a'
}
import {Howl} from 'howler'

export default {
  play(name) {
    // let sound = new Audio(audioUrl[name])
    let sound = new Howl({
      src: [audioUrl[name]],
      volume: 0.4,
    })
    sound.play()
  }
}
