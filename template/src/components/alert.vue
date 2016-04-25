<template>
    <div class="box"
         v-show="alertShow"
         transition="scale">
        <div class="popup"
             @click.stop="">
            <div class="title">{{title}}</div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <div class="btn-group"
                 v-if="btnList.length">
                <button v-for="btn in alertBtnList"
                        @click="btn.fn">{{btn.text}}
                </button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {
        hidePopup
    } from '../store/actions'

    export default{
        props: [
            'title',
            'alertShow',
            'btnList'
        ],
        vuex: {
            getters: {}
            ,
            actions: {
                hidePopup
            }
        },
        data() {
            return {}
        },
        computed: {
            alertBtnList () {
                const that = this
                let hidePopup = this.hidePopup
                let alertVal = []
                let val = this.btnList
                for (let i in val) {
                    alertVal.push({})
                    alertVal[i] = {
                        text: val[i].text,
                        fn: function () {
                            val[i].fn.bind(that)()
                            hidePopup()
                        }
                    }
                    if (i == val.length - 1) break
                }
                return alertVal
            }
        },
        methods: {},
        events: {},
        created() {
        },
        attached() {
        }
    }
</script>

<style scoped>
    .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 4;
        padding: 20px;
    }

    .popup {
        width: 100%;
        background-color: #fff;
        border-radius: 3px;
    }

    .title {
        padding: 20px 20px 10px;
        text-align: center;
    }

    .scale-transition {
    }

    .scale-enter {
        animation: scaleIn .3s;
    }

    .scale-leave {
        animation: scaleOut .3s;
    }

    @keyframes scaleIn {
        0% {
            transform: scale(0);
        }

        60% {
            transform: scale(1.1);
        }

        80% {
            transform: scale(1.1);
        }

        100% {
            transform: scale(1);
        }
    }

    @keyframes scaleOut {
        100% {
            transform: scale(0);
        }

        40% {
            transform: scale(1.2);
        }

        10% {
            transform: scale(1.1);
        }

        0% {
            transform: scale(1);
        }
    }

    .btn-group {
        height: 48px;
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .btn-group::before {
        content: "";
        width: 100%;
        height: 1px;
        border-top: 1px solid #d5d5d6;
        transform: scaleY(.5);
        transform-origin: 0 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }

    button {
        flex: 1;
    }

    button:active {
        color: rgba(0, 0, 0, .6);
        background-color: #f7f7f7;
    }

    .content {
        padding: 0 20px 20px;
    }
</style>
