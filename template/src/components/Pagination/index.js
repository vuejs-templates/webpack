export default {
    props: {
        total: Number,
        pageSize: Number,
        currentPage: Number,
    },
    methods: {
        handleCureentClick(val) {
            this.$emit("onPressButton", val);
        }
    }
};