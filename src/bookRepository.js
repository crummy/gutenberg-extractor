const { Book, Author, Subject, BookAuthors } = require('./models')

module.exports.save = async (book) => {
  const {id, title, publisher, authors, publicationDate, language, subjects, license } = book

  const entity = await Book.create({
    id,
    title,
    publisher,
    publicationDate,
    language,
    license
  })

  for (subject of subjects) {
    const [s] = await Subject.findOrCreate({
      where: { id: subject }
    })
    await entity.addSubject(s)
  }

  for (author of authors) {
    const [a] = await Author.findOrCreate({
      where: { name: author }
    })
    await entity.addAuthor(a)
  }
}

module.exports.findBook = async (id) => {
  const book = await Book.findOne({
    where: { id },
    include: [{
      model: Subject
    }, {
      model: Author
    }]
  })
  if (book != null) return book.toJSON()
  else return null
}

module.exports.findAll = () => {
  const books = Book.findAll({ include: [ Author, Subject ]})
  return books.map(book => book.toJSON())
}