const { Book, Author, Subject } = require('./models')

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
  if (book != null) return toBook(book)
  else return null
}

module.exports.findAll = () => {
  const results = Book.findAll({ include: [ Author, Subject ]})
  return results.map(toBook)
}

module.exports.findBySubject = async (subject) => {
  const results = await Book.findAll({
    include: [ { model: Subject, where: { id: subject } }, Author ]
  })
  return results.map(toBook)
}

module.exports.findByAuthor = async (name) => {
  const results = await Book.findAll({
    include: [ { model: Author, where: { name } }, Subject ]
  })
  return results.map(toBook)
}

const toBook = (bookEntity) => {
  const book = bookEntity.toJSON()
  const { id, title, publisher, publicationDate, language, license, Subjects, Authors } = book
  const subjects = Subjects.map(subject => subject.id)
  const authors = Authors.map(author => author.name)
  return { id, title, publisher, publicationDate, language, license, subjects, authors }
}