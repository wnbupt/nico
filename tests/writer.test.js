var require = require('./testutils').require;
var fs = require('fs');
var path = require('path');
var should = require('should');
var utils = require('../lib/utils');
utils.logging.config('error');
var reader = require('../lib/reader');
var writer = require('../lib/writer');

var storage = {
  swigConfig: {
    root: [path.join(__dirname, 'themes', 'theme1'), path.join(__dirname, 'themes', 'theme2')]
  },
  config: {
    permalink: '{{filename}}.html',
    output: path.join(__dirname, '_site')
  },
  resource: {}
};

describe('PostWriter', function() {
  it('should write post design', function() {
    storage.resource.publicPosts = [];
    storage.resource.publicPosts.push(new reader.Post(
      path.join(__dirname, 'data', 'design.md'), __dirname
    ));
    var p = new writer.PostWriter(storage);
    console.log();
    p.start();
    p.end();
    var text = fs.readFileSync(path.join(__dirname, '_site', 'design.html'), 'utf8');
    text.should.equal('Design Pattern');
  });

  it('can render unicode post', function() {
    storage.resource.publicPosts = [];
    storage.resource.publicPosts.push(new reader.Post(
      path.join(__dirname, 'data', 'china-dream.md'), __dirname
    ));
    var p = new writer.PostWriter(storage);
    console.log();
    p.start();
    p.end();
    var text = fs.readFileSync(path.join(__dirname, '_site', 'china-dream.html'), 'utf8');
    text.should.equal('龍應台：我們的「中國夢」（8月1日北京大學演講講辭）');
  });
});

