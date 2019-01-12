export default {
    props: {},
    data() {
        return {
            datas: [{
                title: 'GENERAL',
                datas: [{
                    subtitle: 'Dashboard', actived: true, icon: 'icon-dashboard', path: '/home', 
                    subPages: [{
                        subtitle: 'Details', actived: false, path: '/details', 
                    }]
                }, {
                    subtitle: 'Layouts', actived: false, icon: 'icon-apartment', path: '/charts', subPages: [],
                }, {
                    subtitle: 'Pages', actived: false, icon: 'icon-folder', subPages: [],
                },]
            }, {
                title: 'ELEMENTS',
                datas: [{
                    subtitle: 'UI Elements', actived: false, icon: 'icon-desktop', subPages: [],
                }, {
                    subtitle: 'Charts', actived: false, icon: 'icon-barchart', subPages: [],
                }, {
                    subtitle: 'Structure', actived: false, icon: 'icon-radarchart', subPages: [],
                }, {
                    subtitle: 'Widgets', actived: false, icon: 'icon-piechart', subPages: [],
                }, {
                    subtitle: 'Tables', actived: false, icon: 'icon-calendar', subPages: [],
                }, {
                    subtitle: 'Form Stuff', actived: false, icon: 'icon-comment', subPages: [],
                },]
            }]
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initMenu()
        })
    },
    methods: {
        initMenu() {
            console.log('initMenu')
            const datas = this.datas;
            const { pathname } = window.location;
            let menuValue = {};
            for (let item of datas) {
                for (let i = 0; i < item.datas.length; i++) {
                    let subItem = item.datas[i];
                    if (pathname == subItem.path) {
                        subItem.actived = true;
                        menuValue = {
                            title: item.title,
                            subItem: subItem,
                        };
                    } else {
                        let actived = false;
                        for(let j of subItem.subPages) {
                            if(j.path === pathname) {
                                menuValue = {
                                    title: subItem.subtitle,
                                    subItem: j,
                                };
                                actived = true;
                            }
                        }
                        subItem.actived = actived;
                    }
                }
            }
            this.$emit('onPress', menuValue);
        },
        handleClick(index, subIndex) {
            const datas = this.datas;
            for (let [_index, item] of datas.entries()) {
                for (let [_subIndex, subItem] of item.datas.entries()) {
                    if (_subIndex === subIndex && index === _index) {
                        subItem.actived = true;
                    } else {
                        subItem.actived = false;
                    }
                }
            }
            this.$router.push(`${datas[index].datas[subIndex].path}`);
            this.$emit('onPress', {
                title: datas[index].title,
                subItem: datas[index].datas[subIndex]
            });
        }
    }
};