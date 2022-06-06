const path = require('path')
const { remote, shell } = require('electron')
const {PythonShell} = require('python-shell')

const dropZone = document.getElementById("dropZone");
const frameTwo = document.getElementById("frameTwo");
const frameThree = document.getElementById("frameThree");
const fileLabel = document.getElementById("fileLabel");
const textInput = document.getElementById("textInput");
const hiddenInput = document.getElementById("hiddenInput");
const button = document.querySelector("button");
const bar = document.getElementById("bar");
const progress = document.getElementById("progress");

const file_paths = []
let savedDirectory = ""
let interval

hiddenInput.onchange = function() {
  let files = hiddenInput.files;
  for(let i=0; i < files.length; i++) {
    file_paths.push(files[i].path)
  }
  if (file_paths.length > 0) {
    initiateFrameTwo()
  }
}

dropZone.onclick = function() {
  hiddenInput.click()
}

dropZone.ondrop = function(e) {
  e.preventDefault()
  if (e.dataTransfer.items) {
    for (let i=0; i < e.dataTransfer.items.length; i++) {
      if (e.dataTransfer.items[i].kind === 'file') {
        let file = e.dataTransfer.items[i].getAsFile()
        console.log(file.path)
        file_paths.push(file.path)
      }
    }
    initiateFrameTwo()
  }
}

dropZone.ondragover = function (e) {
  e.preventDefault();
}

textInput.onchange = function(e) {
  progress.style.visibility = "visible"
  initiateProgressBar()
  processFile(file_paths, e.target.value)
}

button.onclick = function() {
  progress.style.visibility = "visible"
  initiateProgressBar()
  processFile(file_paths, textInput.value)
}

frameThree.onclick = function() {
  shell.openPath(savedDirectory)
}

function initiateProgressBar() {
  let marginLeft = 1;
  interval = setInterval(function() {
    if (marginLeft >= 80) {
      marginLeft = 1
      bar.style.marginLeft = marginLeft + "%";
    } else {
      marginLeft++;
      bar.style.marginLeft = marginLeft + "%";
    }
  }, 10);
}

function initiateFrameTwo () {
  if (file_paths.length > 0) {
    dropZone.style.display = "none"
    frameTwo.style.display = "block"
    fileLabel.textContent = `${file_paths.length} FILES WILL BE PROCESSED`
  }
}

function processFile(files, folderName) {
  let pythonPath = remote.app.isPackaged ? path.join(process.resourcesPath, "python", "bin", "python3.9") : path.join(process.cwd(), "python", "bin", "python3.9")
  let scriptPath = remote.app.isPackaged ? process.resourcesPath : process.cwd()
  let options = {
    mode: 'text',
    pythonPath:  pythonPath,
    pythonOptions: ['-u'],
    scriptPath: scriptPath,
    args: [...files, folderName]
  };

  PythonShell.run('hello.py', options, function (err, result){
    if (err) throw err;
    console.log('Result: ', result.toString());
    home_path = files[0].split('/').slice(0, 3).join("/")
    savedDirectory = path.join(home_path, 'Desktop', 'Imager', folderName)
    frameTwo.style.display = "none"
    frameThree.style.display = "block"
    clearInterval(interval)
  });
}