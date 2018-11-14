class SineButton {
  constructor(note,parent,output){
    this.note = note || "A4"
    // visual
    this.button = document.createElement('button')
    this.button.innerHTML ='&nbsp;'
    this.button.style.borderRadius = "25px"
    this.button.style.width = "50px"
    this.button.style.height = "50px"
    this.button.addEventListener('mouseover',()=>{
      this.noteOn()
    })
    this.button.addEventListener('mouseout',()=>{
      this.noteOff()
    })
    parent.appendChild(this.button)
    //Tone
    this.synth = new Tone.Synth()
    this.synth.oscillator.volume.value = .1
    this.synth.oscillator.type = 'sine'
    this.synth.connect(output)

  }
  noteOn(){
    this.synth.triggerAttack(this.note)
  }
  noteOff(){
    this.synth.triggerRelease()
  }
  play(){

  }
}
