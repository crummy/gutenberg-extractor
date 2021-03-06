# Gutenberg Book Repository

Parses .rdf files from Project Gutenberg, and imports them into
a SQLite database.

# Notes

The database is stored in memory by default. Authors and Subjects are stored 
in separate tables, connected to Books by BookAuthors and BookSubjects tables.

The project is small enough that there are no true "unit" tests - instead
I aimed for more "subcutaneous" tests that test nearly the entirety of the
app, as there's not much in the way of complex or branching logic that would
be best tested with unit tests.

# Usage

* `npm run test` to run tests with Mocha
* `npm run coverage` to check test coverage with nyc
* `npm start` to process files

Some environment variables are available:

* `BOOK_FOLDER`: Directory that contains RDF files in named subfolders like `#/pg#.rdf`. **Required**.
* `BOOK_LIMIT`: If set to an integer, will only parse books up to this number
* `SQLITE_LOGGING`: If 'true', Sequelize will print SQL logging data.
* `SQLITE_FILE`: If set, SQLite will persist data to this file instead of in-memory.

