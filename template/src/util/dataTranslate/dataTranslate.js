
import Vue from 'vue';

function DataTransfer(data) {
  if (!(this instanceof DataTransfer)) {
    return new DataTransfer(data, null, null);
  }
};

DataTransfer.treeToArray = function (data, parent, level, expandedAll) {
  let tmp = [];
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll);
    }
    if (parent) {
      Vue.set(record, '_parent', parent);
    }
    let _level = 0;
    if (level !== undefined && level !== null) {
      _level = level + 1;
    }
    Vue.set(record, '_level', _level);
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      let children = DataTransfer.treeToArray(record.children, record, _level, expandedAll);
      tmp = tmp.concat(children);
    }
  });
  return tmp;
};

export default { DataTransfer };
