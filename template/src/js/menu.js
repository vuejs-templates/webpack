export default {
    data() {
        return {
            menuList: [{
                title: '一级标题', titleDatas: [{
                    title: '二级标题', url: '/', actived: true, routeName: 'Main'
                },{
                    title: '二级标题', url: '/', actived: false, routeName: 'Other'
                }]
            }]
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initMenu()
        })
    },
    methods: {
        handleClick(index, subIndex, actived) {
            const datas = this.menuList;
            for (let [_index, item] of datas.entries()) {
                for (let [_subIndex, subItem] of item.titleDatas.entries()) {
                    if (_subIndex === subIndex && index === _index) {
                        subItem.actived = !actived;
                    } else {
                        subItem.actived = false;
                    }
                }
            }
            this.$router.push(`${datas[index].titleDatas[subIndex].url}`);
        },
        initMenu() {
            const datas = this.menuList;
            const { name } = this.$route;
            for (let [_index, item] of datas.entries()) {
                for (let [_subIndex, subItem] of item.titleDatas.entries()) {
                    if(name.indexOf(subItem.routeName) != -1) {
                        subItem.actived = true;
                    } else {
                        subItem.actived = false;
                    }
                }
            }
        }
    }
};