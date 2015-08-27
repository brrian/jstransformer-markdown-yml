'use strict'

fs       = require 'fs'
markdown = require('markdown-it')()
yamljs   = require 'yamljs'

markdownYml =
    parsePathData: (pathData) ->
        [path, data] = pathData.split(',').map (item) -> item.trim()
        
        if path.indexOf('.yml') is -1 then path += '.yml'

        unless fs.existsSync path
            throw "File \"#{path}\" does not exist."

        path: path
        dataPath: data.split('.').map (item) -> item.trim()

exports.name = 'markdown-yml'
exports.outputFormat = 'html'
exports.render = (string, options) ->
    parent = ''

    { path, dataPath } = markdownYml.parsePathData string

    data = yamljs.parse fs.readFileSync path, 'utf-8'

    for item, index in dataPath
        if !data.hasOwnProperty item
            throw "Cannot read property \"#{item}\"#{parent} in \"#{path}\""
        else
            parent = " of \"#{item}\""
            data = data[item]

    markdown.render data