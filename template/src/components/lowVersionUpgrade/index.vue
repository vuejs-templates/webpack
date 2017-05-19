<template>
    <div class="lowMask" @click="onRootTouchHandler"></div>
</template>
<style type="text/css">
    .lowMask {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1999;
    }
</style>
<script type="text/javascript">
    import alert from "components/appModal"
    const ua = navigator.userAgent.toLowerCase();
    const isIos = !!navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    export default {
        props: {
            msg: {
                type: String,
                default: "高版本同城游才能参加此活动哦",
            },
            confirmButtonText: {
                type: String,
                default: "参加活动",
            },
            cancelButtonText: {
                type: String,
                default: "放弃活动",
            },
            skin: {
                type: String,
                default: "",
            },
            showClose: {
                type: Boolean,
                default: false
            },
            showCancelButton: {
                type: Boolean,
                default: true
            },
            pkgPath: {
                type: String,
                required: true
            },
            ok: Function,
            close: Function
        },
        methods: {
            onRootTouchHandler(){
                let downIng = false;
                let self = this;
                this.$alert(alert, {
                    showClose: this.showClose,
                    showCancelButton: this.showCancelButton,
                    msg: this.msg,
                    customClass: this.skin,
                    confirmButtonText: this.confirmButtonText,
                    cancelButtonText: this.cancelButtonText,
                    weakTips: "",
                    ok(){
                        let isAbort = true;
                        if (typeof this.ok == "function") {
                            isAbort = this.close();
                        }
                        if (!isAbort) return false;
                        if (isIos) {
                            url.directed(this.pkgPath);
                            return true;
                        }
                        if (/OPPO R9/.test(ua)) {
                            window.location.href = this.pkgPath;
                            return;
                        }
                        if (downIng) return false;
                        this.confirmButtonText = "下载中";
                        try {
                            this.$appInterface.downloadFile(this.pkgPath, '同城游app.apk');
                        } catch (err) {
                            window.location.href = this.pkgPath;
                        }
                        downIng = true;
                        return false;
                    },
                    close(){
                        if (typeof this.close == "function") {
                            this.close();
                        }
                    }
                });
            }
        }
    }
</script>