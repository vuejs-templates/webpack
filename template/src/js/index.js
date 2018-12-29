import { Menu, Header } from '@/components' 

export default {
    name: "App",
    components: {
        Menu, 
        Header
    },
    data() {
        return {
            isLoginPage: false
        }
    },
    mounted() {
        const { name } = this.$route;
        if(name === 'Login') this.isLoginPage = true;
    },
    methods: {
        
    },
};