const xpath = require('xpath')
const { DOMParser } = require('xmldom')

const select = xpath.useNamespaces({
  pgterms: "http://www.gutenberg.org/2009/pgterms/",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  dcterms: "http://purl.org/dc/terms/"
});

module.exports.parse = (xml) => {
  const doc = new DOMParser().parseFromString(xml)
  const bookId = select("string(//pgterms:ebook[1]/@rdf:about)", doc)
  const id = parseInt(bookId.replace("ebooks/", ""))
  const author = select("//dcterms:creator/pgterms:agent[1]/pgterms:name[1]", doc)
    .map(node => node.firstChild.nodeValue)
  const title = select("string(//dcterms:title[1])", doc)
  const publicationDate = select("string(//dcterms:issued[1])", doc)
  const language = select("string(//dcterms:language[1]/rdf:Description[1]/rdf:value[1])", doc)
  const subjects = select("//dcterms:subject/rdf:Description[1]/rdf:value[1]", doc)
    .map(node => node.firstChild.nodeValue)
  const license = select("string(//dcterms:rights[1])", doc)
  const publisher = select("string(//dcterms:publisher[1])", doc)

  return { id, title, author, publicationDate, language, subjects, license, publisher }
}