import path from 'path'
import { app } from '@electron/remote'

import {PythonShell} from 'python-shell'



var folder = document.getElementById("myInput");
folder.onchange=function(){
  var files = folder.files;
  var split_path = files[0].path.split('/');
  var pop_path = split_path.pop()
  var file_path = split_path.join('/')

  let pythonPath = app.isPackaged ? path.join(process.resourcesPath, "python", "bin", "python3.10") : path.join(process.cwd(), "python", "bin", "python3.10")
  let scriptPath = app.isPackaged ? process.resourcesPath : process.cwd()
  let options = {
    mode: 'text',
    pythonPath:  pythonPath,
    pythonOptions: ['-u'],
    scriptPath: scriptPath,
    args: [file_path]
  };

  PythonShell.run('hello.py', options, function (err, result){
    if (err) throw err;
    console.log('result: ', result.toString());
  });
}
