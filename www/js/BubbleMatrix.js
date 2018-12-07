class BubbleMatrix extends Instrument(){
  constructor(config){
    super(config)
    this.scale = scale
    this.matrix = document.createElement("div")
    matrix.className = "matrixdiv"
    document.body.appendChild(this.matrix)

    this.buttonArr = []
    for(let i = 0; i < 80; i++){
      let idx = i % scale.length
      let b = new SineButton(this.scale[idx],inputnode,this.matrix,i)
      this.buttonArr.push(b)
    }
    createADSR()
  }
  function createADSR(){
    this.bubbleEnvelope = document.createElement('div')
    if(config.parent) this.container.appendChild(this.bubbleEnvelope)

    this.attack = document.createElement('input')
    this.attack.addEventListener('change',()=>{
      for (let i=0; i<this.buttonArr.length; i++){
        let value = Math.map(this.attack.value, 1, 1000, 0.005, 2)
        this.buttonArr[i].synth.envelope.attack = value
      }
    })
    this.bubbleEnvelope.appendChild(this.attack)

    this.decay = document.createElement('input')
    this.decay.addEventListener('change',()=>{
      for (let i=0; i<this.buttonArr.length; i++){
        let value = Math.map(this.decay.value, 1, 1000, 0, 2)
        this.buttonArr[i].synth.envelope.decay = value
      }
    })
    this.bubbleEnvelope.appendChild(this.decay)

    this.sustain = document.createElement('input')
    sustain.addEventListener('change',()=>{
      for (let i=0; i<this.buttonArr.length; i++){
        let value = Math.map(sustain.value, 1, 1000, 0.0, 1)
        this.buttonArr[i].synth.envelope.sustain = value
      }
    })
    this.bubbleEnvelope.appendChild(this.sustain)

    this.release = document.createElement('input')
    release.addEventListener('change',()=>{
      for (let i=0; i<this.buttonArr.length; i++){
        let value = Math.map(release.value, 1, 1000, 0.0001, 2)
        this.buttonArr[i].synth.envelope.release = value
      }
    })
    this.bubbleEnvelope.appendChild(this.release)

  }
}
