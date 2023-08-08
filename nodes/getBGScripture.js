module.exports = function(RED) {

    function GetBibleGatewayScriptureNode(config) {

        RED.nodes.createNode(this, config);
        let node = this;

        node.on("input", function(msg) {

            node.send(msg);
        });
    }

    RED.nodes.registerType("get bg scripture", GetBibleGatewayScriptureNode);

}