function nodeEach(list) { // 将NodeList转换为Array
  var arr = [];
  for (var i = 0; list.length > i; i++) {
    var node = list[i];
    arr.push(node);
  }
  return arr;
}

function inArray(search, array) {
  for (var i in array) {
    if (array[i] === search) {
      return true;
    }
  }
  return false;
}

function getJsonObjLength(jsonObj) {
  var Length = 0;
  for (var item in jsonObj) {
    Length++;
  }
  return Length;
}

export function serialize(formDom) {
  // var formDom = document.getElementById(id);
  var valueList = [];// 保存待处理的值，结构为： name , value
  var data = {};// 返回结果的json数组

  var type1List = [];
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='color']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='date']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='datetime']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='datetime-local']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='email']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='hidden']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='month']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='number']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='password']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='range']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='search']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='tel']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='text']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='time']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='url']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='week']")));
  type1List = type1List.concat(nodeEach(formDom.querySelectorAll("input[type='radio']:checked")));
  for (var i = 0; type1List.length > i; i++) {
    var dom = type1List[i];
    var name = dom.getAttribute('name');// 键名
    var value = dom.value;// 值
    valueList.push({ name: name, value: value });
  }

  var type3List = formDom.querySelectorAll("input[type='checkbox']:checked");
  var existCheckbox = [];
  for (var i = 0; type3List.length > i; i++) {
    // 判断是否已处理
    if (inArray(type3List[i].getAttribute('name'), existCheckbox)) {
      continue;
    }

    var dom = type3List[i];

    var name = dom.getAttribute('name');// 键名
    var value = dom.value;// 值

    var cache = { name: name, value: [] };

    var l = formDom.querySelectorAll("input[type='checkbox'][name='" + name + "']:checked");
    for (var j = 0; l.length > j; j++) {
      cache.value.push(l[j].value);
    }
    valueList.push(cache);
  }

  var type4List = formDom.querySelectorAll('select');
  for (var i = 0; type4List.length > i; i++) {
    var name = type4List[i].getAttribute('name');// 键名
    var value = type4List[i].options[type4List[i].options.selectedIndex].getAttribute('value'); // 值
    valueList.push({ name: name, value: value });
  }

  for (var i = 0; valueList.length > i; i++) {
    var row = valueList[i];
    var name = row.name;
    if (!name) {
      continue;
    }
    var value = row.value ? row.value : null;
    var kArr = name.split('[');// 是否是数组
    var cDatas = 'data';
    for (var j = 0; j < kArr.length; j++) {
      var cn = kArr[j].replace(/\]/g, '').trim();// 去除右方括号
      if (cn) {
        if (!isNaN(cn)) {
          cDatas += '[' + cn + ']';
        } else {
          cDatas += '.' + cn;
        }
        if (eval(cDatas + ' == null')) {
          eval(cDatas + '= {};');
        }
      } else { // 追加
        cDatas += '[' + eval('getJsonObjLength(' + cDatas + ')') + ']';
        eval(cDatas + ' = {};');
      }
    }
    eval(cDatas + ' = value;');
  }
  return data;
}
