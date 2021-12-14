const { desktopCapturer, remote } = require('electron');

const {PythonShell} = require('python-shell');



var folder = document.getElementById("myInput");
folder.onchange=function(){
  var files = folder.files;
  var split_path = files[0].path.split('/');
  var pop_path = split_path.pop()
  var file_path = split_path.join('/')



    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
          scriptPath: './',
        args: [file_path]
    };
      
  
    PythonShell.run('hello.py', options, function (err, result){
          if (err) throw err;
          console.log('result: ', result.toString());
    });

}

