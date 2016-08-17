/* -----------------------工具方法------------------------ */

var Config = require("./config.js");

var G_LOGIN_CHECK = true; // 检测登录标记，未登录则做统一处理

function doAjax(url, params, method) {
    var deferred = $.Deferred();
    $.ajax({
        type : method || "POST",
        url : url,
        traditional : true,
        data : params || {},
        dataType : "json",
        success : function(response, status, xhr) {
            doOnSuccess(deferred, response, status, xhr);
        },
        error : function(xhr, status, thrown) {
            doOnError(deferred, xhr, status, thrown);
        }
    });
    return deferred.promise();
}

function doSyncAjax(url, params, method) {
    var result = $.ajax({
        type : method || "GET",
        url : url,
        traditional : true,
        data : params || {},
        dataType : "json",
        async : false,
        error : function(response) {
            if (G_LOGIN_CHECK && response.responseText
                    && response.responseText.indexOf("</body>") == -1) {
                redirectLogin();
            }
        }
    });
    return result.responseText ? JSON.parse(result.responseText) : "";
}

function doJsonAjax(url, params, method) {
    var deferred = $.Deferred();
    $.ajax({
        type : method || "POST",
        url : url,
        traditional : true,
        data : params || {},
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(response, status, xhr) {
            doOnSuccess(deferred, response, status, xhr);
        },
        error : function(xhr, status, thrown) {
            doOnError(deferred, xhr, status, thrown);
        }
    });
    return deferred.promise();
}

function doJsonSyncAjax(url, params, method) {
    var result = $.ajax({
        type : method || "GET",
        url : url,
        traditional : true,
        data : params || {},
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        async : false,
        error : function(response) {
            if (G_LOGIN_CHECK && response.responseText
                    && response.responseText.indexOf("</body>") == -1) {
                redirectLogin();
            }
        }
    });
    return result.responseText ? JSON.parse(result.responseText) : "";
}

function doJsonpAjax(url, params) {
    var deferred = $.Deferred();
    params = params || {};
    params.formatType = "jsonp";
    $.ajax({
        type : "GET",
        url : url,
        traditional : true,
        data : params,
        dataType : "jsonp",
        jsonp : "amp_jsonp_callback",
        success : function(response, status, xhr) {
            doOnSuccess(deferred, response, status, xhr);
        },
        error : function() {
            doOnError(deferred);
        }
    });
    return deferred.promise();
}

function doJsonpSyncAjax(url, params) {
    var result = $.ajax({
        type : "GET",
        url : url,
        traditional : true,
        data : params || {},
        dataType : "jsonp",
        jsonp : "amp_jsonp_callback",
        async : false,
        error : function(response) {
            if (G_LOGIN_CHECK && response.responseText
                    && response.responseText.indexOf("</body>") == -1) {
                redirectLogin();
            }
        }
    });
    return result.responseText ? JSON.parse(result.responseText) : "";
}

function doOnSuccess(deferred, response, status, xhr) {
    if (G_LOGIN_CHECK && !hasLogin(response, xhr)) {
        redirectLogin();
    } else {
        deferred.resolve(response);
    }
}

function doOnError(deferred) {
    deferred.reject();
}

function hasLogin(response, xhr) {
    if (response && xhr && xhr.getResponseHeader("hasLogin") == "false") {
        return false;
    } else {
        return true;
    }
}

function redirectLogin() {
    window.location.href = Config.CONTEXT_PATH + "/login?service=" + encodeURIComponent(window.location.href);
}

function addUrlParam(url, name, value) {
    var currentUrl = url.split("#")[0];
    if (/\?/g.test(currentUrl)) {
        if (/name=[-\w]{4,25}/g.test(currentUrl)) {
            currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
        } else {
            currentUrl += "&" + name + "=" + value;
        }
    } else {
        currentUrl += "?" + name + "=" + value;
    }
    if (url.split("#")[1]) {
        url = currentUrl + "#" + url.split("#")[1];
    } else {
        url = currentUrl;
    }
    return url;
}

function parseJSON(vueObject) {
    return JSON.parse(JSON.stringify(vueObject));
}

function stringifyJSON(vueObject) {
    return JSON.stringify(vueObject);
}

module.exports = {
    doAjax : doAjax,
    doSyncAjax : doSyncAjax,
    doJsonAjax : doJsonAjax,
    doJsonSyncAjax : doJsonSyncAjax,
    doJsonpAjax : doJsonpAjax,
    doJsonpSyncAjax : doJsonpSyncAjax,
    addUrlParam : addUrlParam,
    redirectLogin : redirectLogin,
    parseJSON : parseJSON,
    stringifyJSON : stringifyJSON
};
