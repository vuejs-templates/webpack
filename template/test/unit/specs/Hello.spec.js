import Vue from 'vue'
import Hello from 'src/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><hello v-ref:hello></hello></div>',
      components: { Hello }
    }).$mount()

    const helloComponent = vm.$refs.hello

    // Only mounting the hello component does not make it "ready"
    // The following line will trigger its "ready" hook.
    vm.$appendTo(document.body)
    
    // the $nextTick callback will make sure, that the components DOM has been updated
    helloComponent.$nextTick(() => {
      expect(vm.$el.querySelector('.hello h1').textContent).to.contain('Hello World!')  
    })
    
  })
})
