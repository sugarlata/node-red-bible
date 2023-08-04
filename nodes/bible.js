module.exports = function(RED) {

    function BibleNode(config) {
        RED.nodes.createNode(this,config);

        
    }

    RED.nodes.registerType("bible",BibleNode);

}