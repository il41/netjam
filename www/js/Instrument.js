class Instrument {
  constructor(config){
    if(config.parent) this.createGUI(config.parent)
    this.makeSource()
    this.makeFx()
  }

  createGUI(selector){
    this.container = document.createElement('div')
    let parent = document.querySelector(selector)
    parent.appendChild(this.container)
    //rest of gui code. create sliders, event
    this.createVolume()
    this.createDelay()
  }
  createVolume(){
    this.volume = document.createElement('input')

    this.volume.addEventListener('change',()=>{
      let value = Math.map(this.volume.value, 1,1000,0,1)
      this.output.gain.value = value
      console.log(value)
    })
    this.container.appendChild(this.volume)
  }
  createDelay(){
    this.delayPedal = document.createElement('div')

    this.delayTime = document.createElement('input')
    this.delayTime.addEventListener('change',()=>{
      let value = Math.map(this.delayTime.value, 1,1000,0,1)
      delay.delayTime.value = value
    })
    this.delayPedal.appendChild(this.delayTime)

    this.feedback = document.createElement('input')
    this.feedback.addEventListener('change',()=>{
      let value = Math.map(this.feedback.value, 1,1000,0,1)
      delay.feedback.value = value
    })
    this.delayPedal.appendChild(this.feedback)


    this.delayDryWet = document.createElement('input')
    this.delayDryWet.addEventListener('change',()=>{
        let wetvalue = Math.map(delayDryWet.value, 1, 1000, 0, 1)
        let dryvalue = Math.map(delayDryWet.value, 1, 1000, 1, 0)
        delayWet.gain.value = wetvalue
        delayDry.gain.value = dryvalue
    })
    this.delayPedal.appendChild(this.delayDryWet)

    this.container.appendChild(this.delayPedal)
  }

  makeSource(){
    this.output = new Tone.Gain()
    this.fxIn = new Tone.Gain()

  }

  makeFx(){
    this.delay = new Tone.FeedbackDelay()
    this.delayDry = new Tone.Gain()
    this.delayWet = new Tone.Gain()
    this.fxIn.connect(this.delay)
    this.fxIn.connect(this.delayDry)
    this.delay.connect(this.delayWet)
    this.delayWet.connect(this.output)
    this.delayDry.connect(this.output)

  }
}


//
// class Scale{
//   constructor(){
//
//   }
//
//   add(){
//
//   }
// }
// let scale = new Scale()
// scale.add{'c','d','e','f'}



// class BubbleMatrix extends Instrument(){
//   constructor(config){
//     super(config)
//     this.scale = scale
//     this.matrix = document.createElement("div")
//     matrix.className = "matrixdiv"
//     document.body.appendChild(this.matrix)
//
//     this.buttonArr = []
//     for(let i = 0; i < 80; i++){
//       let idx = i % scale.length
//       let b = new SineButton(this.scale[idx],inputnode,this.matrix,i)
//       this.buttonArr.push(b)
//     }
//     createADSR()
//   }
//   function createADSR(){
//     this.bubbleEnvelope = document.createElement('div')
//     if(config.parent) this.container.appendChild(this.bubbleEnvelope)
//
//     this.attack = document.createElement('input')
//     this.attack.addEventListener('change',()=>{
//       for (let i=0; i<this.buttonArr.length; i++){
//         let value = Math.map(this.attack.value, 1, 1000, 0.005, 2)
//         this.buttonArr[i].synth.envelope.attack = value
//       }
//     })
//     this.bubbleEnvelope.appendChild(this.attack)
//
//     this.decay = document.createElement('input')
//     this.decay.addEventListener('change',()=>{
//       for (let i=0; i<this.buttonArr.length; i++){
//         let value = Math.map(this.decay.value, 1, 1000, 0, 2)
//         this.buttonArr[i].synth.envelope.decay = value
//       }
//     })
//     this.bubbleEnvelope.appendChild(this.decay)
//
//     this.sustain = document.createElement('input')
//     sustain.addEventListener('change',()=>{
//       for (let i=0; i<this.buttonArr.length; i++){
//         let value = Math.map(sustain.value, 1, 1000, 0.0, 1)
//         this.buttonArr[i].synth.envelope.sustain = value
//       }
//     })
//     this.bubbleEnvelope.appendChild(this.sustain)
//
//     this.release = document.createElement('input')
//     release.addEventListener('change',()=>{
//       for (let i=0; i<this.buttonArr.length; i++){
//         let value = Math.map(release.value, 1, 1000, 0.0001, 2)
//         this.buttonArr[i].synth.envelope.release = value
//       }
//     })
//     this.bubbleEnvelope.appendChild(this.release)
//
//   }
// }

//main js below here
//tone js
//sockets
//
//
// let synth = new Instrument({
//   parent: '#main'
// })
// synth.output.connect( comp )
