module.exports = function(RED) {

    function BibleNode(config) {

        RED.nodes.createNode(this, config);
        let node = this;

        node.on("input", function(msg) {

            node.send(msg);
        });
    }

    RED.nodes.registerType("bible",BibleNode);

}