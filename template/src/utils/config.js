/* -----------------------系统配置/系统常量定义------------------------ */

function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0, index + 1);
    return result;
}

var G_CONTEXT_PATH = getContextPath();
if (process.env.NODE_ENV === "development") {
    G_CONTEXT_PATH = "/xsxx";
}

module.exports = {

    /** 部署上线文跟路径 */
    CONTEXT_PATH : G_CONTEXT_PATH,

    /** 学生基本信息管理首页地址 */
    XSXX_INDEX_URL : G_CONTEXT_PATH + "/index.html"

};
