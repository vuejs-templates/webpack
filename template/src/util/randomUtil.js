/**
 * @randomUtil1
 * @author  stylehuan
 * @create  2016-12-27 17:36
 */
export default {
    uuid(){
        function s4() {
            return (((1 + Math.random()) * 0x10000) || 0).toString(16).substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    getUid(){
        return this.uuid();
    },
    getSmallRandom(len){
        return Math.random().toString(36).slice(2).slice(0, len);
    },
    getIntRandom(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    },
    getFloatRandom(min, max, toFixed){
        toFixed = toFixed || 1;
        return (Math.random() * (max - min) + min).toFixed(toFixed);
    }
}