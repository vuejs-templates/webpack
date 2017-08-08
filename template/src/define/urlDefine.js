/**
 * @urlDefine
 * @author  stylehuan
 * @create  2016-12-14 13:15
 */
import base from 'assets/js/common';
import interFace from "./interfaces"
let protocol = 'http://';
let domain = {
    // shareDomain: protocol + "m.tcy365.com/"
};
if (!base.isLocal) {
    if (base.isTest) {
        //TODO
    } else if (base.isPre) {
        //TODO
    }
} else {
    domain.main = '';
}
export {domain, interFace}
