import UUID from './uuId.js'

function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ?
    "" :
    ";expires=" + exdate.toGMTString());
};

//删除cookie
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
};

/**
 * 清空cookie
 */
function clearCookie() {
  var keys = document
    .cookie
    .match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

function setLocal(name, val) { /**设置localStorage */
  if (typeof val === 'object' && val !== null) {
    window.localStorage.setItem(name, JSON.stringify(val));
  } else {
    window.localStorage.setItem(name, val);
  }
}

function getLocal(name, val) { /**获取localStorage */
  let temp = window.localStorage.getItem(name);
  try {
    return JSON.parse(temp);
  } catch (error) {
    return temp;
  }
}

function delLocal(name) { /**删除某一个localStorage */
  window.localStorage.removeItem(name, val);
}

function clearLocal() { /**清除所有localStorage */
  window.localStorage.clear();
}





function setSession(name, val) { /**设置sessionStorage */
  if (typeof val === 'object' && val !== null) {
    window.sessionStorage.setItem(name, JSON.stringify(val));
  } else {
    window.sessionStorage.setItem(name, val);
  }
}

function getSession(name, val) { /**获取sessionStorage */
  let temp = window.sessionStorage.getItem(name);
  try {
    return JSON.parse(temp);
  } catch (error) {
    return temp;
  }
}

function delSession(name) { /**删除某一个sessionStorage */
  window.sessionStorage.removeItem(name, val);
}

function clearSession() { /**清除所有sessionStorage */
  window.sessionStorage.clear();
}

/*功能:根据key,获取value;
 * arr: 树状数据;
 * itemKey: 树状数据对应的key
 * itmeValue: 树状数据返回另一个key的值;
 * value: 树状数据对应的key与实际相等的值
 * */
function getValue(arr, itemKey1, itemKey2, value, setV) {
  arr
    .forEach(function (item) {
      if (item[itemKey1] === value) {
        setV = item[itemKey2];
        return
      } else {
        if (item.children) {
          getValue(item.children, itemKey1, itemKey2, value)
        }
      }
    })
}

/*功能:根据id,获取name;
 * arr: 对象;
 * itemKey: 对象的id
 * itmeValue: 对象的name;
 * value: 已知的id的值
 * */
function findValue(obj, itemKey1, itemKey2, value) {
  if (obj[itemKey1] === value) {
    return obj[itemKey2]
  }
}

//数组转成对象
function changeTree(arr, id, name, obj) {
  arr
    .forEach(function (item) {
      obj[item[id]] = item[name];
      if (item.children && item.children.length > 0) {
        changeTree(item.children, id, name, obj)
      }
    })
}

//类数组转成数组
function changeArr(obj) {
  return Array
    .prototype
    .slice
    .call(obj);
}

/**
 *
 * @desc 字符串去空（前后）
 * @param {String} str
 * @return {Boolean}
 */
function trim(str) {
  return str.replace(/[^\s*]|[\s$]/g, "");
};

/**
 *
 * @desc 字符串去空（所有）
 * @param {String} str
 * @return {Boolean}
 */
function trimAll(str) {
  return str.replace(/\s*/g, "");
};

/**
 *
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
function arrayEqual(arr1, arr2) {
  if (arr1 === arr2) {
    return true;
  }
  if (arr1.length != arr2.length)
    return false;

  for (var i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i])
      return false;
  }
  return true;
}

/**
 *
 * @desc 判断数组内元素是否重复
 * @param {Array} arr
 * @return {Boolean}
 */
// DOTO
function unique(arr) {
  var res = [];
  var json = {};
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
}

/**
 *
 * @desc 生成随机数
 * @param {Number} min
 * @param {Number} min
 * @return {Boolean}
 */
function randomNum(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

/**
 *
 * @desc 生成32位随机数UUID
 * @param {Array} arr
 * @return {Boolean}
 */
function randomUUID() {
  return UUID
    .prototype
    .createUUID();
}

/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }
  return !Object
    .keys(obj)
    .length;
}

/**
 * 列表生成树
 *
 * @param list 需要排序的列表
 * @param id id标示
 * @param pid 父id标示
 * @param root 根节点标示
 * @return
 */
function getTreeByList(list, id, pid, root) {
  if ((!list instanceof Array) || list.length === 0) {
    return [];
  }
  var head = {},
    treeList = new Array(list.length),
    indexMap = [],
    len = list.length;
  for (var i = 0; i < len; i++) {
    indexMap.push(list[i][id]);
    treeList[i] = list[i];
  }

  for (var j = 0; j < len; j++) {
    let node = list[j];
    if (indexMap.indexOf(node[pid]) === -1) {
      addChildren2Map(head, node);
      continue;
    }
    if (root === undefined ?
      node[pid] === undefined :
      node[pid] === root) {
      addChildren2Map(head, node);
    } else {
      addChildren2Map(treeList[indexMap.indexOf(node[pid])], node);
    }
  }

  return head.children;
}

function addChildren2Map(map, childMap) {
  if (map.children === undefined) {
    map.children = [];
  }
  map
    .children
    .push(childMap);
}

/**
 * 获取排序树
 *
 * @param list 需要排序的列表
 * @param root 根节点标示
 * @return
 */

function getListByTree(tree, id, cid, pid, pidV) {
  var list = [];
  for (var i = 0, len = tree.length; i < len; i++) {
    pidV
      ?
      tree[i][pid] = pidV :
      "";
    list.push(tree[i]);
    if (tree[i][cid] && tree[i][cid].length > 0) {
      list = list.concat(getListByTree(tree[i][cid], id, cid, pid, tree[i][id]));
      // delete tree[i][cid];
    }

  }
  return list;
}

//对象的深拷贝
function deepCopy(source) {
  var result = {};
  for (var key in source) {
    result[key] = typeof source[key] === "object" ?
      deepCopy(source[key]) :
      source[key];
  }
  return result;
}

//json对象或数组的深拷贝
function deepJSONCopy(data) {
  if (data instanceof Array) {
    return JSON
      .parse(JSON.stringify({
        data: data
      }))
      .data;
  }
  return JSON.parse(JSON.stringify(data));
}

/**
 * 对象合并,默认深度合并
 * 例子：
 * extend( target, [ object1 ,... objectN ] )深度合并
 * extend( [ deep ], target, [object1,... objectN ] )只合并第一层
 */
function extend() {
  var options,
    name,
    src,
    copy,
    copyIsArray,
    clone,
    target = arguments[0],
    i = 1,
    len = arguments.length,
    deep = true;
  // target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
  // deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
  if (varType(target) === "boolean") {
    deep = target;

    target = arguments[i] || {};
    i++;
  }
  if (typeof target !== "object" && varType(target) !== "function") {
    target = {};
  }
  // if(i = length) {     target = this; }
  for (; i < len; i++) {
    // 处理第i个被扩展的对象，即除去deep和target之外的对象
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        //当嵌套数组或者对象深拷贝完毕,跳出当前属性,开始拷贝下一属性 防止target和obj的某个属性指向的是同一对象进入死循环
        if (target === copy) {
          continue;
        }
        //如果传入的合并对象里面嵌套数组或者对象,那么递归扩展对象
        if (deep && copy && (varType(copy) === "object" || (copyIsArray = (varType(copy) === "array")))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && varType(src) === "array" ?
              src : [];
          } else {
            clone = src && varType(src) === "object" ?
              src : {};
          }

          target[name] = extend(deep, clone, copy);
        } else if (copy != undefined) {
          //覆盖添加
          target[name] = copy;
        }
      }
    }
  }
  // 原对象被改变，因此如果不想改变原对象，target可传入{}
  return target;
}

/**
 * 数组比较,获取saveList 和 deleteList
 *
 * @param arr1 保存之前的数组
 * @param arr2 保存后的数组
 * @param id 数组由对象组成时,辨别是否相同的对象的key
 * @return
 */
function difference(arr1, arr2, id) {
  //arr1之前保存的数组，arr2后保存的数组 id 为数组是对象时,判断已id为key做的参数
  arr1 = Array.from(arr1);
  arr2 = Array.from(arr2);
  let total = [],
    saveList = [],
    deleteList = []; //总的数组
  if (id !== undefined) {
    arr1
      .concat(arr2)
      .forEach((item, index) => {
        //对象时
        if (!(total.some(value => value[id] == item[id]))) {
          total.push(item)
        }
      })
    pushList(total, arr1, saveList, id);
    pushList(total, arr2, deleteList, id);
  } else {
    total = new Set(arr1.concat(arr2));
    pushList(total, arr1, saveList);
    pushList(total, arr2, deleteList);
  }

  // let total = new Set(arr1.concat(arr2)),
  function pushList(total, arr1, list, id) {
    if (id === undefined) {
      Array
        .from(total)
        .forEach(item => {
          //如果有子数组有该值就不加，没有就放入list数组
          if (arr1.some(value => item === value)) {
            return
          }
          list.push(item)
        });
    } else {
      Array
        .from(total)
        .forEach(item => {
          //如果有子数组有该值就不加，没有就放入list数组
          if (arr1.some(value => item[id] === value[id])) {
            return
          }
          list.push(item)
        });
    }

  }

  return {
    saveList,
    deleteList
  }
}

function varType(arg) {
  var class2type = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Object]': 'object',
    '[object Error]': 'error'
  };
  return class2type[
    Object
    .prototype
    .toString
    .call(arg)
  ];
}

/**
 * 获取子路由的moduleId
 *
 * @param arr vuex保存的菜单数组
 * @param path 子路由第一个路径,例如/orgManagement/role/11,第一个orgManagement
 * @return moduleId
 */
function getModuleId(arr, path) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i].uri.indexOf(path) > -1) {
      return arr[i].id
    }
  }
}

/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */
function getExplore(ua) {
  var sys = {},
    s;
  ua = (ua || navigator.userAgent).toLowerCase();
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ?
  sys.ie = s[1]: (s = ua.match(/msie ([\d\.]+)/)) ?
    sys.ie = s[1] :
    (s = ua.match(/edge\/([\d\.]+)/)) ?
    sys.edge = s[1] :
    (s = ua.match(/firefox\/([\d\.]+)/)) ?
    sys.firefox = s[1] :
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ?
    sys.opera = s[1] :
    (s = ua.match(/chrome\/([\d\.]+)/)) ?
    sys.chrome = s[1] :
    (s = ua.match(/version\/([\d\.]+).*safari/)) ?
    sys.safari = s[1] :
    0;
  // 根据关系进行判断
  if (sys.ie) {
    return ('IE: ' + sys.ie);
  }
  if (sys.edge) {
    return ('EDGE: ' + sys.edge);
  }
  if (sys.firefox) {
    return ('火狐: ' + sys.firefox);
  }
  if (sys.chrome) {
    return ('谷歌: ' + sys.chrome);
  }
  if (sys.opera) {
    return ('欧朋: ' + sys.opera);
  }
  if (sys.safari) {
    return ('Safari: ' + sys.safari);
  }
  return 'Unkonwn'
}

/*数组及数组对象的排序*/
function sortRule(list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[i].data[this.sortStr] >= list[j].data[this.sortStr]) {
        let tempLi = list[j];
        list[j] = list[i];
        list[i] = tempLi;
      }
    }
  }
  return list;
}

export {
  varType, //变量类型判断
  getExplore, //获取浏览器类型和版本
  getCookie, //获取cookie
  setCookie, //设置cookie
  delCookie, //删除cookie
  clearCookie, //清除cookie

  setLocal,
  /**设置localStorage */
  getLocal,
  /**获取  */
  delLocal,
  /**删除 */
  clearLocal,
  /**清除 */

  setSession,
  /**设置sessionStorage */
  getSession,
  /**获取  */
  delSession,
  /**删除 */
  clearSession,
  /**清除 */

  trim, //字符串去空（首尾）
  trimAll, //字符串去空（所有）

  deepCopy, //对象的深拷贝
  deepJSONCopy, //json对象或数组的深拷贝
  extend, //对象合并
  isEmptyObject, //判断`obj`是否为空
  getValue, //根据key,获取value;
  findValue, //根据id,获取name;

  arrayEqual, //判断两个数组是否相同
  unique, //去除数组内部的相同项
  getTreeByList, //列表转换为树结构
  getListByTree, //树结构转换为列表
  changeTree, //数组转成对象
  changeArr, //对象转成数组
  difference, //两个数组比较
  sortRule, //数组的排序

  randomNum, //生成随机数
  randomUUID, //生成32位UUID
  getModuleId, //获取子路由的moduleId
}
