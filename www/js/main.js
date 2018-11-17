// here we create a socket variable (our connection to the server) using the
// socket.io library (included in the index.html page)
const socket = io()

let cMajorScale = ['D3','F3','G3','A3','Bb3','C4','D4','Eb4','F4','G4','A4','Bb4','C5','D5','Eb5','F5','G5','A5','Bb5','D6']
const comp = new Tone.Compressor().toMaster()
const delay = new Tone.FeedbackDelay()
const delayDry = new Tone.Gain()
const delayWet = new Tone.Gain()
delay.connect(delayWet)
delayWet.connect(comp)
delayDry.connect(comp)
const inputnode = new Tone.Gain()
inputnode.connect(delay)
inputnode.connect(delayDry)

let buttonArr = []
for(let i = 0; i < 50; i++){
  let idx = i % cMajorScale.length
  let parent = document.body
  let b = new SineButton(cMajorScale[idx],parent,inputnode)
  buttonArr.push(b)
}

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
    let value = Math.map(matrixDecay.value, 1, 1000, 0, 1)
    buttonArr[i].synth.envelope.decay = value
  }
})

let matrixSustain = document.body.querySelector("#sustain")
matrixSustain.addEventListener('change',()=>{
  for (let i=0; i<buttonArr.length; i++){
    let value = Math.map(matrixSustain.value, 1, 1000, 0.005, 1)
    buttonArr[i].synth.envelope.sustain = value
  }
})

let matrixRelease = document.body.querySelector("#release")
matrixRelease.addEventListener('change',()=>{
  for (let i=0; i<buttonArr.length; i++){
    let value = Math.map(matrixRelease.value, 1, 1000, 0.005, 2)
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
    outputScreen.innerHTML = slider.value
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

document.addEventListener('keydown',function(e){
        button = buttonArr[Math.round(Math.map(e.keyCode, 1, 230, 1, 30))]
        console.log(button)
        button.play()
        button.noteOff()
      })
