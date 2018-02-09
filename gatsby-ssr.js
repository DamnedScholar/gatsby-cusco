import React from "react"
import fs from 'fs'

exports.onRenderBody = ({ setPostBodyComponents, setHeadComponents }, pluginOptions) => {
  // This could be broken out into a plugin and, if I make any other additions to this file, probably should be.
  var dir = "src/scripts/"
  var files = fs.readdirSync(dir)
  var scripts = []
  var scriptLog = []

  files.forEach((file) => {
    var text = fs.readFileSync(dir + file, {encoding: 'utf8'})
    scripts.push(
      <script
        key={file}
        dangerouslySetInnerHTML={{__html: text}}
      />)
    scriptLog.push(file)
  })

  if (scriptLog)
    console.log("Adding scripts: " + JSON.stringify(scriptLog))

  return setHeadComponents(scripts)
}
