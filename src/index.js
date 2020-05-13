const fs = require('fs')
const { read } = require('./xmlReader')
const { parse } = require('./parseRdf')
const { save, findBook, findByAuthor, findBySubject } = require('./bookRepository')
const { init } = require('./models')
const { distinct } = require('./filter')

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
    if (i++ == 1000) break
    console.log(`Parsing ${file}`)
    const xml = await read(file)
    const book = parse(xml)
    await save(book)
  }
  const firstBook = await findBook(1)
  console.log("First book recorded in Project Gutenberg:", firstBook)
  const scifi = (await findBySubject('Science fiction'))
    .flatMap(book => book.authors)
    .filter(distinct)
  console.log("Science fiction authors:", scifi)
  const julesVerne = (await findByAuthor('Verne, Jules'))
    .flatMap(book => book.subjects)
    .filter(distinct)
  console.log("Subjects Jules Verne has written in:", julesVerne)
}

main()