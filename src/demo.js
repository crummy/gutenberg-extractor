const { processBooks } = require('./index')

const demo = async () => {
  await processBooks(process.env.BOOK_FOLDER)
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

demo()