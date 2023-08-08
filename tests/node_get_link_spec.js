var should = require("should");
var helper = require("node-red-node-test-helper");
var getBGLink = require("../nodes/getBGLink.js");

helper.init(require.resolve('node-red'));

describe('Bible Nodes: Get Link', function () {

  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });
  
  it('should load', function (done) {
    var flow = [{ id: "n1", type: "get bg link", name: "get link" }];
    helper.load(getBGLink, flow, function () {
      var n1 = helper.getNode("n1");
      try {
        n1.should.have.property('name', 'get link');
        done();
      } catch(err) {
        done(err);
      }
    });
  });

  it(`should create link for Genesis 1, Version=null`, function (done) {
    var flow = [
      { id: "n1", type: "get bg link", name: "get bg link",wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(getBGLink, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        try {
          msg.should.have.property('payload', 'https://www.biblegateway.com/passage/?search=Gen+1&version=NIV');
          done();
        } catch(err) {
          done(err);
        }
      });
      n1.receive({ payload: {
        "book": "Gen",
        "chapter": 1
      }});
    });
  });
  
  it(`should create link for Genesis 1, Version=NASB1995`, function (done) {
    var flow = [
      { id: "n1", type: "get bg link", name: "get link",wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(getBGLink, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        try {
          msg.should.have.property('payload', 'https://www.biblegateway.com/passage/?search=Gen+1&version=NASB1995');
          done();
        } catch(err) {
          done(err);
        }
      });
      n1.receive({ payload: {
        "book": "Gen",
        "chapter": 1,
        "version": "NASB1995"
      }});
    });
  });

  it(`should create link for Matthew 1, Version=null`, function (done) {
    var flow = [
      { id: "n1", type: "get bg link", name: "get link",wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(getBGLink, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        try {
          msg.should.have.property('payload', 'https://www.biblegateway.com/passage/?search=Matt+1&version=NIV');
          done();
        } catch(err) {
          done(err);
        }
      });
      n1.receive({ payload: {
        "book": "Matt",
        "chapter": 1
      }});
    });
  });

});