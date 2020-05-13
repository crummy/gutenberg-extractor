const assert = require('assert')
const tmp = require('tmp')
const { processBooks } = require('./index')
const { truncate, init } = require('./models')
const { findAll } = require('./bookRepository')

describe('integration test', () => {
  let tmpFolder

  beforeEach(async () => {
    await init()
    await truncate()
    tmpFolder = tmp.dirSync()
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
      publicationDate: new Date("1971-12-01"),
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
});