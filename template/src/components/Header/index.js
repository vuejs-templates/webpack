export default {
    props: {
        title: String,
        subtitle: String,
    },
    mounted() { },
    methods: {
        handleCommand(command) {
            if(command === 'SignOut') {
                this.logout();
            }
        },
        logout() {
            this.$confirm("确定退出该帐号?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                localStorage.removeItem("USER_INFO");
                setTimeout(() => {
                    location.href = "/login";
                }, 500);
            }).catch(() => { });
        }
    }
};