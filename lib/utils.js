const bgURLGenerator = function(book, chapter, version="NIV") {
    return `https://www.biblegateway.com/passage/?search=${book}+${chapter}&version=${version}`;
}


module.exports = {
    bgURLGenerator
}