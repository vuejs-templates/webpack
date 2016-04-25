<template>
    {{{{raw-helper}}}}
    <button :style="{width:btnWidth}"
            :class="{alert:alert,disabled:!allow,warning:warning,next:next}"
            @click.stop.prevent="btnFunc()">{{text}}
    </button>
    {{{{/raw-helper}}}}
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            text: {
                default: '确认'
            },
            cut: {
                default: 0
            },
            allow: {
                default: true
            },
            alert: {
                default: false
            },
            warning: {
                default: false
            },
            next: {
                default: false
            },
            btnFn: {
                type: Function,
                default: function () {
                }
            }
        },
        vuex: {
            getters: {},
            actions: {}
        },
        data () {
            return {}
        },
        computed: {
            btnWidth () {
                if (!this.cut) {
                    return 100 + "px"
                }
                return (1 / this.cut) * 100 + "%"
            }
        },
        methods: {
            btnFunc () {
                if (this.allow) {
                    this.btnFn()
                }
            }
        },
        events: {},
        created () {
        },
        attached () {
        }
    }
</script>

<style scoped>
    button {
        color: #666;
    }

    button::before {
        content: "";
        width: 200%;
        height: 200%;
        position: absolute;
        left: -50%;
        top: -50%;
        transform: scale(.5);
        border: 2px solid #666;
    }

    .disabled,
    .disabled:active {
        background-color: #AAAAAA !important;
        color: #fff !important;
        pointer-events: none;
        cursor: not-allowed;
    }

    .disabled::before,
    .alert::before {
        display: none !important;
    }

    .warning {
        background-color: #fff;
        color: #FFC100;
    }

    .warning::before {
        content: "";
        width: 200%;
        height: 200%;
        position: absolute;
        left: -50%;
        top: -50%;
        transform: scale(.5);
        border: 2px solid #FFC100;
    }

    .alert {
        background-color: #FFC100;
        color: #fff;
    }

    :active {
        color: #666;
        background-color: #f8f8f8;
    }

    .warning:active {
        color: #FFC100;
    }

    .alert:active {
        color: hsla(0, 0%, 100%, .4);
        background-color: #E2AB00;
    }

    .next {
        color: #fff;
        background-color: #75D3BB;
    }

    .next::before {
        display: none;
    }

    .next:active {
        color: hsla(0, 0%, 100%, .4);
        background-color: #5D9E8E;
    }
</style>
