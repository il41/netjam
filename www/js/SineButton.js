class SineButton {
  constructor(note,output,parent,number){

    this.note = note || "A4"
    this.number = number //why is this undefined?
    // visual
    this.button = document.createElement('button')
    this.button.innerHTML ='&nbsp;'
    this.button.style.borderRadius = "25px"
    this.button.style.width = "50px"
    this.button.style.height = "50px"
    this.button.id=number
    this.button.className="noteTrigger"

    this.button.addEventListener('mouseover',()=>{
      this.noteOn()
      let data = {number : number, note : note}
      socket.emit('matrixOn', data);
    })

    this.button.addEventListener('mouseout',()=>{
      this.noteOff()
      let data = {number : number, note : note}
      socket.emit('matrixOff', data);
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
