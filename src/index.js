const fs = require('fs')
const { read } = require('./xmlReader')
const { parse } = require('./parseRdf')
const { save, findAll, findBook, findByAuthor, findBySubject } = require('./bookRepository')
const { init } = require('./models')
const { distinct } = require('./filter')

const processBooks = async (path) => {
  await init()
  const files = fs.readdirSync(path)
    .filter(file => file != '.DS_Store')
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