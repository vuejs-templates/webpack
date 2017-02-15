<template>
	<div class="Hello">
		<transition appear v-on:enter="enter">
			<h1>{{ msg }}</h1>
		</transition>
		<transition appear v-on:enter="enter">
			<div class="Hello_logo"></div>
		</transition>
	</div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
	    created(){
	    },
	    methods: {
	        enter(el, done) {
				TweenLite.fromTo(el, 1, {y: -20}, {y: 20, onComplete: done});
	        }
	    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
	.Hello {
		@import (reference) "~styles/common.less";

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 60vh;

		&_logo {
			.sprite;
			.sprite-lhs;
		}
	}
</style>
