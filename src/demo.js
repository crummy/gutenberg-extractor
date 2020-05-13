const { processBooks } = require('./index')
const { findBook, findByAuthor, findBySubject } = require('./bookRepository')
const { distinct } = require('./filter')

const demo = async () => {
  await processBooks(process.env.BOOK_FOLDER, 100)
  const firstBook = await findBook(1)
  console.log("First book recorded in Project Gutenberg:", firstBook)
  const scifi = (await findBySubject('Science fiction'))
    .flatMap(book => book.authors)
    .filter(distinct)
  console.log("Science fiction authors:", scifi)
  const stewartWhite = (await findByAuthor('White, Stewart Edward'))
    .flatMap(book => book.subjects)
    .filter(distinct)
  console.log("Subjects Stewart Edward White has written in:", stewartWhite)
}

demo()