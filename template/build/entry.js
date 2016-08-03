/**
 * Created by su9er on 16/7/29.
 */

const fs = require('fs'); //
//const getEntries
module.exports = getEntries = (path) => {
  let test    = /(.*)\.js/i;
  let entries = {};
  fs.readdirSync(path).forEach((file) => {
    let t
    if ((t = test.exec(file)) !== null) {
      entries[t[1]] = `${path}/${file}`
    }
  });
  return entries;
}
