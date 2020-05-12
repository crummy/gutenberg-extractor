const fs = require('fs')

module.exports.read = (file) => {
  return fs.readFileSync(file, "utf8");
}
