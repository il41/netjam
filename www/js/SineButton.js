class SineButton {
  constructor(note,output,parent){
    this.note = note || "A4"
    // visual
    this.button = document.createElement('button')
    this.button.innerHTML ='&nbsp;'
    this.button.style.borderRadius = "25px"
    this.button.style.width = "50px"
    this.button.style.height = "50px"
    this.button.id="noteTrigger"
    this.button.addEventListener('mouseover',()=>{
      this.noteOn()
      socket.emit('message1', note);
    })
    this.button.addEventListener('mouseout',()=>{
      this.noteOff()
      socket.emit('message2', note);
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
    this.button.style.width = "48px"
    this.button.style.height = "48px"
    this.button.style.margin = "1px"
    this.button.style.backgroundColor = "#ECECEC"
  }
  noteOff(){
    this.synth.triggerRelease()
    this.button.style.width = "50px"
    this.button.style.height = "50px"
    this.button.style.margin = "0px"
    this.button.style.backgroundColor = "#707070"
  }
  play(){
    this.synth.triggerAttack(this.note)
    this.button.style.width = "48px"
    this.button.style.height = "48px"
    this.button.style.margin = "1px"
    this.button.style.backgroundColor = "#ECECEC"
    this.synth.triggerRelease()
    this.button.style.width = "50px"
    this.button.style.height = "50px"
    this.button.style.margin = "0px"
    this.button.style.backgroundColor = "#707070"
  }
}
