const assert = require('assert')
const { processBooks } = require('./index')
const { truncate, init } = require('./models')
const { findAll, findBySubject, findByAuthor, findBook, findByDate } = require('./bookRepository')

describe('processBooks', () => {
  beforeEach(async () => {
    await init()
    await truncate()
  })

  it('should handle empty folder', async () => {
    await processBooks("src/test/empty")
    const books = await findAll()
    assert.deepEqual(books, [])
  });

  it('should handle single file', async () => {
    await processBooks("src/test/single")
    const books = await findAll()
    const expected = {
      authors: [
        "Jefferson, Thomas"
      ],
      id: 1,
      language: "en",
      license: "Public domain in the USA.",
      publicationDate: "1971-12-01",
      publisher: "Project Gutenberg",
      subjects: [
        "E201",
        "JK",
        "United States -- History -- Revolution, 1775-1783 -- Sources",
        "United States. Declaration of Independence",
      ],
      title: "The Declaration of Independence of the United States of America"
    }
    assert.deepEqual(books, [expected])
  })

  it('should handle multiple files', async () => {
    await processBooks("src/test/three")
    const books = await findAll()
    assert.deepEqual(books.length, 3)
  })
});

describe('queries', () => {
  before(async () => {
    await init()
    await truncate()
    await processBooks("src/test/three")
  })

  it('should return empty array for missing author', async () => {
    const books = await findByAuthor('Fake Person McJones')
    assert.deepEqual(books, [])
  })

  it('should return correct book for author', async () => {
    const books = await findByAuthor('Jefferson, Thomas')
    assert.equal(books.length, 1)
    assert.equal(books[0].authors[0], 'Jefferson, Thomas')
  })

  it('should return correct book by id', async () => {
    const book = await findBook(1)
    assert.equal(book.id, 1)
  })

  it('should return books by subject', async () => {
    const books = await findBySubject('JK')
    assert.equal(books.length, 2)
    books.forEach(book => assert(book.subjects.includes('JK')))
  })

  it('should return null for missing book', async () => {
    const book = await findBook(99999)
    assert.equal(book, null)
  })

  it('should return all books published in 1971', async () => {
    const books = await findByDate(new Date("1971-01-01"), new Date("1971-12-31"))
    assert.equal(books.length, 1)
    assert(books[0].publicationDate.startsWith('1971'))
  })
})

describe('limit number of books to process', () => {
  it('should limit books returned when limit is provided', async () => {
    await init()
    await truncate()
    await processBooks("src/test/three", 1)
    const books = await findAll()
    assert.equal(books.length, 1)
  })
})