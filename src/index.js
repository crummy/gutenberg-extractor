const fs = require('fs')
const { read } = require('./xmlReader')
const { parse } = require('./parseRdf')
const { save } = require('./bookRepository')
const { init } = require('./models')

const processBooks = async (path, limit) => {
  await init()
  let fileCount = 0
  const files = fs.readdirSync(path)
    .filter(file => file != '.DS_Store')
    .filter(() => fileCount++ <= limit)
    .map(file => {
      const idExtractor = /\d+/
      const id = idExtractor.exec(file)
      return `${path}/${file}/pg${id}.rdf`
    })

  for (const file of files) {
    console.log(`Parsing ${file}`)
    const xml = await read(file)
    const book = parse(xml)
    await save(book)
  }
}

module.exports = { processBooks }