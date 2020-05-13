# Gutenberg Book Repository

Parses .rdf files from Project Gutenberg, and imports them into
a SQLite database.

# Notes

The database is stored in memory. Authors and subjects are stored 
in separate tables.

# Usage

* `npm run test` to run tests with Mocha
* `npm run coverage` to check test coverage with nyc
* `npm start` to process files

Some environment variables are available:

* `BOOK_FOLDER`: Directory that contains RDF files in named subfolders like `#/pg#.rdf`. **Required**.
* `BOOK_LIMIT`: If set to an integer, will only parse books up to this number
* `SQL_LOGGING`: If 'true', Sequelize will print SQL logging data.

