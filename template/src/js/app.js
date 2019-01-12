import { Menu, Header } from '@/components'

export default {
    components: {
        Menu,
        Header
    },
    data() {
        return {
            headerTitle: '',
            headerSubTitle: '',
            isLoginPage: false,
        }
    },
    mounted() {
        const { pathname } = window.location;
        if (pathname === '/login' || pathname === '/') this.isLoginPage = true;
    },
    methods: {
        handlePressMenu(item) {
            if (!this.isLoginPage) {
                this.headerTitle = item.title;
                if (item.subItem && item.subItem.subtitle != undefined)
                    this.headerSubTitle = item.subItem.subtitle;
            }
        }
    },
};