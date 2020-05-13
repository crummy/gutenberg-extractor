const fs = require('fs')

module.exports.read = (file) => {
  console.log(`Reading ${file}`)
  return fs.readFileSync(file, "utf8");
}
