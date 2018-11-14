// here we create a socket variable (our connection to the server) using the
// socket.io library (included in the index.html page)
const socket = io()

let cMajorScale = ['C4','D4','E4','F4','G4','A4','B4','C5']

let buttonArr = []
for(let i = 0; i < 50; i++){
  let idx = i % cMajorScale.length
  let parent = document.body
  let b = new SineButton(cMajorScale[idx],parent)
  buttonArr.push(b)
}
