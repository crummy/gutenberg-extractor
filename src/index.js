const fs = require('fs')
const { read } = require('./xmlReader')
const { parse } = require('./parseRdf')
const { save } = require('./bookRepository')
const { init } = require('./models')

const processBooks = async (path, limit) => {
  await init()
  let fileCount = 0
  const books = await Promise.all(fs.readdirSync(path)
    .filter(file => file != '.DS_Store')
    .filter(() => limit === undefined || fileCount++ < limit)
    .map(file => {
      const idExtractor = /\d+/
      const id = idExtractor.exec(file)
      return `${path}/${file}/pg${id}.rdf`
    })
    .map(file => read(file))
    .map(xml => parse(xml)))

  for (const book of books) {
    await save(book)
  }
}

module.exports = { processBooks }