const path = require('path')
const { remote } = require('electron')

const {PythonShell} = require('python-shell')



var folder = document.getElementById("myInput");
folder.onchange=function(){
  var files = folder.files;
  var split_path = files[0].path.split('/');
  var pop_path = split_path.pop()
  var file_path = split_path.join('/')

  let pythonPath = remote.app.isPackaged ? path.join(process.resourcesPath, "python", "bin", "python3.9") : path.join(process.cwd(), "python", "bin", "python3.9")
  let scriptPath = remote.app.isPackaged ? process.resourcesPath : process.cwd()
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
