// here we create a socket variable (our connection to the server) using the
// socket.io library (included in the index.html page)
const socket = io()

let cMajorScale = ['C4','D4','Eb4','F4','G4','A4','Bb4','C5']
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




let delayDryWet = document.body.querySelector("#delaydrywet")
delayDryWet.addEventListener('change',()=>{
    let wetvalue = Math.map(delayDryWet.value, 1, 100, 0, 1)
    let dryvalue = Math.map(delayDryWet.value, 1, 100, 1, 0)
    delayWet.gain.value = wetvalue
    delayDry.gain.value = dryvalue
  }
)

let matrixDelayTime = document.body.querySelector("#delayTime")
matrixDelayTime.addEventListener('change',()=>{
    let value = Math.map(matrixDelayTime.value, 1, 100, 0, 10)
    delay.delayTime.value = value
})

let matrixFeedback = document.body.querySelector("#feedback")
matrixFeedback.addEventListener('change',()=>{
    let value = Math.map(matrixFeedback.value, 1, 100, 0, 10)
    delay.feedback.value = value
})
