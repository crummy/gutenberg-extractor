const fs = require('fs')
const { read } = require('./xmlReader')
const { parse } = require('./parseRdf')
const { save, findBook, findAll } = require('./bookRepository')
const { init } = require('./models')

const files = fs.readdirSync('/Users/crummy/Downloads/cache/epub')
  .filter(file => file != '.DS_Store')
  .map(file => {
    const idExtractor = /\d+/
    const id = idExtractor.exec(file)
    return `/Users/crummy/Downloads/cache/epub/${file}/pg${id}.rdf`
  })

const main = async () => {
  await init()
  var i = 0
  for (const file of files) {
    if (i++ == 100) break
    console.log(`Parsing ${file}`)
    const xml = await read(file)
    const book = parse(xml)
    await save(book)
  }
  const books = await findAll()
  console.log(books)
}

main()