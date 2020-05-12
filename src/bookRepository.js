const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { Book, Author } = require('./models')

sequelize.sync()

module.exports.save = async (book) => {
  const {id, title, publisher, authors, publicationDate, language, subjects, license } = book
  await Book.create({id, title, publisher, publicationDate, language, license})
  authors.forEach(author => await Author.create({ name: author }))
  subjects.forEach(subject => await Subject.create({ subject }))
}