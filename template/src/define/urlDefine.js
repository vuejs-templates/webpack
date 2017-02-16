/**
 * @urlDefine
 * @author  stylehuan
 * @create  2016-12-14 13:15
 */
import base from "assets/js/common";
let protocol = "http://";
let domain = {
    // shareDomain: protocol + "m.tcy365.com/"
};
let interFace = {

    // test: "/api/test/xxxx",
};

if (!base.isLocal) {
    if (base.isTest) {
        //TODO
    } else {
        //TODO
    }
}

export {domain, interFace}
