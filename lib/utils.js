const axios = require("axios");
const nodeHTMLParser = require("node-html-parser");

const bgURLGenerator = function(book, chapter, version="NIV") {
    return `https://www.biblegateway.com/passage/?search=${book}+${chapter}&version=${version}`;
}

const getScripture = async function(url, format) {

    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Request Error: ${err.stack}`)
        throw `Request Error: HTTP request to Bible Gateway failed. See logs for more details.`
    }

    let root;
    let scriptureContent;
    let textContent;
    let htmlResponse;
    let textResponse;

    try {
        root = nodeHTMLParser.parse(resp.data);
        scriptureContent = root.querySelector(".passage-content");
        textContent = nodeHTMLParser.parse(scriptureContent);
        textContent.querySelectorAll(".footnote").forEach(footnote => footnote.remove())

        htmlResponse = scriptureContent.innerHTML;
        textResponse = textContent.querySelectorAll(".text").map(verse => {return verse.innerText}).join("\n");
    } catch (err) {
        console.error(`Parsing Error: ${err.stack}`)
        throw `Parsing Error: Parsing request from Bible Gateway failed. See logs for more details.`
    }

    if (format == "html") {
        return htmlResponse;
    } else if (format == "text") {
        return textResponse;
    } else {
        throw `Format Error: Unknown Format - should be "html" or "text"`;
    }
    

}

module.exports = {
    bgURLGenerator,
    getScripture
}