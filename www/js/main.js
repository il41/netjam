const scales = {
  sad : ['Eb3','Bb4','D4','A4','F5'],
  sad2 : ['D3','F3','G3','A3','Bb3','C4','D4','Eb4','F4','G4','A4','Bb4','C5','D5','Eb5','F5','G5','A5','Bb5','D6'],
  cMaj : ['C3','D3','E3','F3','G3','A4','B4','C4','D4','E4','G4'],
  cMin : ['C3','D3','Eb3','F3','G3','Ab4','Bb4','C4','D4','Eb4','G4'],
  fivecircle : ['G3','C3','G4','D3','A4','E4','B5','F#5','C#6','G#6','D#6','A#7','F7','C7'],
  fourcircle : ['C3','F4','Bb5','Eb5','Ab6','Db6','Gb6','B7','E7','A7'],
}
// here we create a socket variable (our connection to the server) using the
// socket.io library (included in the index.html page)
const socket = io()

const enter = document.querySelector('#enter')
const userscaletxt = document.querySelector('#userscaletext')
const userscalename = document.querySelector('#userscalename')
let scale = scales["sad"]

var scaleSelect = document.getElementById("scaleSelect");
//scaleSelect.value = scale

const comp = new Tone.Compressor().toMaster()
const user = new Tone.Gain()
user.connect(comp)
const delay = new Tone.FeedbackDelay()
const delayDry = new Tone.Gain()
const delayWet = new Tone.Gain()
delay.connect(delayWet)
delayWet.connect(user)
delayDry.connect(user)
const inputnode = new Tone.Gain()
inputnode.connect(delay)
inputnode.connect(delayDry)


let matrix = document.createElement("div")
matrix.className = "matrixdiv"
document.body.appendChild(matrix)
// let matrix2 = document.createElement("matrixdiv2")
// document.body.appendChild(matrix2)

let buttonArr = []
for(let i = 0; i < 80; i++){
  let idx = i % scale.length
  let b = new SineButton(scale[idx],matrix,inputnode)
  buttonArr.push(b)
}
// let buttonArr2 = []
// for(let i = 0; i < 80; i++){
//   scale = scales["sad2"]
//   let idx = i % scale.length
//   let parent = matrix2
//   let b2 = new SineButton(scale[idx],parent,inputnode)
//   buttonArr.push(b2)
// }

function matrixScaleChange(){
  //Destroy matrix div and reset buttonArr
  document.body.removeChild(matrix)
  buttonArr = []

  //Make new div and repopulate buttonArr with new scale
  matrix = document.createElement("div")
  matrix.className = "matrixdiv"
  document.body.appendChild(matrix)
  for(let i = 0; i < 80; i++){
    scale = scales[scaleSelect.value]
    let idx = i % scale.length
    let b = new SineButton(scale[idx],matrix,inputnode)
    buttonArr.push(b)
  }
}

let userVolume = document.body.querySelector("#userVolume")
userVolume.addEventListener('change',()=>{
  let value = Math.map(userVolume.value, 1, 1000, 0, 1)
  user.gain.value = value
  console.log(value)
})

let matrixAttack = document.body.querySelector("#attack")
matrixAttack.addEventListener('change',()=>{
  for (let i=0; i<buttonArr.length; i++){
    let value = Math.map(matrixAttack.value, 1, 1000, 0.005, 2)
    buttonArr[i].synth.envelope.attack = value
  }
})

let matrixDecay = document.body.querySelector("#decay")
matrixDecay.addEventListener('change',()=>{
  for (let i=0; i<buttonArr.length; i++){
    let value = Math.map(matrixDecay.value, 1, 1000, 0, 2)
    buttonArr[i].synth.envelope.decay = value
  }
})

let matrixSustain = document.body.querySelector("#sustain")
matrixSustain.addEventListener('change',()=>{
  for (let i=0; i<buttonArr.length; i++){
    let value = Math.map(matrixSustain.value, 1, 1000, 0.0, 1)
    buttonArr[i].synth.envelope.sustain = value
  }
})

let matrixRelease = document.body.querySelector("#release")
matrixRelease.addEventListener('change',()=>{
  for (let i=0; i<buttonArr.length; i++){
    let value = Math.map(matrixRelease.value, 1, 1000, 0.0001, 2)
    buttonArr[i].synth.envelope.release = value
  }
})

let delayDryWet = document.body.querySelector("#delaydrywet")
delayDryWet.addEventListener('change',()=>{
    let wetvalue = Math.map(delayDryWet.value, 1, 1000, 0, 1)
    let dryvalue = Math.map(delayDryWet.value, 1, 1000, 1, 0)
    delayWet.gain.value = wetvalue
    delayDry.gain.value = dryvalue
    let slider = document.body.querySelector("#delaydrywet")
    console.log(slider.value)
    let outputScreen = document.body.querySelector("#outputScreen")
    outputScreen.innerHTML = wetvalue
    console.log(slider.value)
  }
)

let matrixDelayTime = document.body.querySelector("#delayTime")
matrixDelayTime.addEventListener('change',()=>{
    let value = Math.map(matrixDelayTime.value, 1, 1000, 0., 10)
    delay.delayTime.value = value
})

let matrixFeedback = document.body.querySelector("#feedback")
matrixFeedback.addEventListener('change',()=>{
    let value = Math.map(matrixFeedback.value, 1, 1000, 0, 1)
    delay.feedback.value = value
})


// document.addEventListener('keydown',function(e){
//         button = buttonArr[Math.round(Math.map(e.keyCode, 1, 230, 1, 30))]
//         console.log(button)
//         button.play()
//         button.noteOff()
// })
