const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:', {
  logging: false
});

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publicationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  license: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
});

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
})

const BookAuthors = sequelize.define('BookAuthors', {}, { timestamps: false });
Book.belongsToMany(Author, { through: BookAuthors })
Author.belongsToMany(Book, { through : BookAuthors })

const BookSubjects = sequelize.define('BookSubjects', {}, { timestamps: false });
Book.belongsToMany(Subject, { through: BookSubjects })
Subject.belongsToMany(Book, { through: BookSubjects })

const init = async () => {
  await sequelize.sync()
}

module.exports = { Book, Author, Subject, init, BookAuthors, BookSubjects }