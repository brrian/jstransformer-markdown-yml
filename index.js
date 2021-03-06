// Generated by CoffeeScript 1.9.3
(function() {
  'use strict';
  var fs, markdown, markdownYml, yamljs;

  fs = require('fs');

  markdown = require('markdown-it')();

  yamljs = require('yamljs');

  markdownYml = {
    parsePathData: function(pathData) {
      var data, path, ref;
      ref = pathData.split(',').map(function(item) {
        return item.trim();
      }), path = ref[0], data = ref[1];
      if (path.indexOf('.yml') === -1) {
        path += '.yml';
      }
      if (!fs.existsSync(path)) {
        throw "File \"" + path + "\" does not exist.";
      }
      return {
        path: path,
        dataPath: data.split('.').map(function(item) {
          return item.trim();
        })
      };
    }
  };

  exports.name = 'markdown-yml';

  exports.outputFormat = 'html';

  exports.render = function(string, options) {
    var data, dataPath, i, index, item, len, parent, path, ref;
    parent = '';
    ref = markdownYml.parsePathData(string), path = ref.path, dataPath = ref.dataPath;
    data = yamljs.parse(fs.readFileSync(path, 'utf-8'));
    for (index = i = 0, len = dataPath.length; i < len; index = ++i) {
      item = dataPath[index];
      if (!data.hasOwnProperty(item)) {
        throw "Cannot read property \"" + item + "\"" + parent + " in \"" + path + "\"";
      } else {
        parent = " of \"" + item + "\"";
        data = data[item];
      }
    }
    return markdown.render(data);
  };

}).call(this);
