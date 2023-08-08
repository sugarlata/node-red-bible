const utils = require("../lib/utils");

module.exports = function(RED) {

    function GetBibleGatewayLinkNode(config) {

        RED.nodes.createNode(this, config);
        let node = this;

        node.on("input", function(msg) {

            const book = msg.payload.book || msg.book;
            const chapter = msg.payload.chapter || msg.chapter;
            const version = msg.payload.version || msg.version;

            msg.payload = utils.bgURLGenerator(book, chapter, version)
            node.send(msg);
        });
    }

    RED.nodes.registerType("get bg link", GetBibleGatewayLinkNode);

}