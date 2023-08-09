const should = require("should");
const assert = require("chai").assert;
const helper = require("node-red-node-test-helper");
const getBGScripture = require("../nodes/getBGScripture.js");
const bibleExcerpts = require("./bible_excerpts.js"); 

helper.init(require.resolve('node-red'));

describe('Bible Nodes: Get Scripture', function () {

  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });

  it('should load', function (done) {
    var flow = [{ id: "n1", type: "get bg scripture", name: "get scripture" }];
    helper.load(getBGScripture, flow, function () {
      var n1 = helper.getNode("n1");
      try {
        n1.should.have.property('name', 'get scripture');
        done();
      } catch(err) {
        done(err);
      }
    });
  });

  it(`should get scripture for Genesis 1`, function (done) {
    var flow = [
      { id: "n1", type: "get bg scripture", name: "get bg scripture",wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(getBGScripture, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        try {
          versesArray = msg.payload.split("\n")
          versesArray.forEach(line => {
            for (let i = 0; i < versesArray.length; i++) {
              if (versesArray[i] != bibleExcerpts.gen1[i]) {
                assert.equal(versesArray[i], bibleExcerpts.gen1[i])
          
              }
            }
          })
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
  
  
  it(`should get scripture for Matthew 1`, function (done) {
    var flow = [
      { id: "n1", type: "get bg scripture", name: "get bg scripture",wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(getBGScripture, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        try {
          versesArray = msg.payload.split("\n")
          versesArray.forEach(line => {
            for (let i = 0; i < versesArray.length; i++) {
              if (versesArray[i] != bibleExcerpts.matt1[i]) {
                assert.equal(versesArray[i], bibleExcerpts.matt1[i])
          
              }
            }
          })
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