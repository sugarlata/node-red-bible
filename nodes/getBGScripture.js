const utils = require("../lib/utils");
const constants = require("../lib/constants")

module.exports = function(RED) {

    function GetBibleGatewayScriptureNode(config) {

        RED.nodes.createNode(this, config);
        let node = this;

        node.on("input", function(msg) {

            const book = msg.payload.book || msg.book;
            const chapter = msg.payload.chapter || msg.chapter;
            const version = constants.DOWNLOADABLE_BIBLE_VERSION;
            const format = msg.payload.format || msg.format || "text";

            const url = utils.bgURLGenerator(book, chapter, version=version);

            utils.getScripture(url, format).then(resp => {

                msg.payload = resp;
                msg.book = book;
                msg.chapter = chapter;
                msg.version = version;
                node.send(msg);

            }).catch(e => {
                node.error({payload: e});
                return;
            });

        });
    }

    RED.nodes.registerType("get bg scripture", GetBibleGatewayScriptureNode);

}