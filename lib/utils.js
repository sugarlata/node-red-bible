const axios = require("axios");
const nodeHTMLParser = require("node-html-parser");

const bgURLGenerator = function(book, chapter, version="NIV") {
    return `https://www.biblegateway.com/passage/?search=${book}+${chapter}&version=${version}`;
}

const getScripture = async function(url, format) {

    let resp;
    resp = await axios.get(url);

    const root = nodeHTMLParser.parse(resp.data);
    const scriptureContent = root.querySelector(".passage-content");
    const textContent = nodeHTMLParser.parse(scriptureContent);
    textContent.querySelectorAll(".footnote").forEach(footnote => footnote.remove())

    if (format == "html") {
        return scriptureContent.innerHTML;
    } else {
        return textContent.querySelectorAll(".text").map(verse => {return verse.innerText}).join("\n");
    }

}

module.exports = {
    bgURLGenerator,
    getScripture
}