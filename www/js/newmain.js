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

const changeGlobalScale = document.createElement('form')
changeGlobalScale.enter = document.createElement('button')
changeGlobalScale.appendChild(changeGlobalScale.enter)
document.body.appendChild(changeGlobalScale)
const heightNote = document.querySelector('#heightNoteCheckBox')

const enter = document.querySelector('#enter')
const userscaletxt = document.querySelector('#userscaletext')
const userscalename = document.querySelector('#userscalename')
let scale = scales["sad"]

var scaleSelect = document.getElementById("scaleSelect");
//scaleSelect.value = scale

const comp = new Tone.Compressor().toMaster()


// let sequencer = document.createElement("div")
// sequencer.className = "sequencerdiv"
// document.body.appendChild(sequencer)
//
// let sequencerInstrumentArr = []


// let matrix = document.createElement("div")
// matrix.className = "matrixdiv"
// document.body.appendChild(matrix)
//
// let buttonArr = []
// for(let i = 0; i < 80; i++){
//   let idx = i % scale.length
//   let b = new SineButton(scale[idx],inputnode,matrix,i)
//   buttonArr.push(b)
// }
//
// let noteTriggerList = document.querySelectorAll(".noteTrigger")

// let bubble = new BubbleMatrix({parent:'#main'})
let bubble = new Instrument({
  parent: '#main'
})
bubble.output.connect( comp )

let matrix2 = {}
function xtra(){
  matrix2 = document.createElement("matrixdiv2")
  document.body.appendChild(matrix2)

  let buttonArr2 = []
  for(let i = 0; i < 80; i++){
    scale = scales["sad2"]
    let idx = i % scale.length
    let parent = matrix2
    let b2 = new SineButton(scale[idx],comp,parent)
    buttonArr.push(b2)
  }
}
function rmv(){
  document.body.removeChild(matrix2)
}

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
    let b = new SineButton(scale[idx],inputnode,matrix)
    buttonArr.push(b)
  }
}


changeGlobalScale.enter.onclick = function(){matrixScaleChange()};

// document.addEventListener('keydown',function(e){
//         button = buttonArr[Math.round(Math.map(e.keyCode, 1, 230, 1, 30))]
//         console.log(button)
//         button.play()
//         button.noteOff()
// })
//

// for(let i = 0; i<buttonArr.length;i++){
//   noteTriggerList[i].addEventListener('mouseover',function(){
//       socket.emit('matrixOn', buttonArr[i].noteOn());
//   })
//   noteTriggerList[i].addEventListener('mouseout',function(){
//       socket.emit('matrixOff', buttonArr[i].noteOff());
//   })
// }


// socket.on('matrixOn',data){
//   buttonArr[data.number].noteOn()
// }
// socket.on('matrixOff',data){
//   buttonArr[data.number].noteOff()
// }

socket.on('matrixOnSignal',function(data){
    if(heightNote.checked !== false){
      if(buttonArr[data.number].note !== data.note){
        let tempsyn = new Tone.Synth()
        console.log(tempsyn)
        tempsyn.connect(inputnode)
        tempsyn.oscillator.frequency = window.innerHeight
        tempsyn.triggerAttack
        tempsyn.triggerRelease
      }
    } else {
        buttonArr[data.number].noteOn()
    }
    buttonArr[data.number].noteOn()
})
socket.on('matrixOffSignal',function(data){
    buttonArr[data.number].noteOff()
})
