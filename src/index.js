const fs = require('fs')
const { read } = require('./xmlReader')
const { parse } = require('./parseRdf')

const files = fs.readdirSync('/Users/crummy/Downloads/cache/epub')
  .filter(file => file != '.DS_Store')
  .map(file => {
    const idExtractor = /\d+/
    const id = idExtractor.exec(file)
    return `/Users/crummy/Downloads/cache/epub/${file}/pg${id}.rdf`
  })

const main = async () => {
  for (const file of files) {
    const xml = await read(file)
    const book = parse(xml)
  }
}


main()