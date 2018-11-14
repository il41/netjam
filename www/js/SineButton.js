class SineButton {
  constructor(note,parent){
    this.note = note || "A4"
    this.button = document.createElement('button')
    this.button.innerHTML ='&nbsp;'
    this.button.addEventListener('mouseover',()=>{
      this.button.style.color = "#00ff00"
    })
    this.button.addEventListener('mouseout',()=>{
      this.button.style.color = "#313131"
    })
    parent.appendChild(this.button)
    
  }
  noteOn(){

  }
  noteOff(){

  }
  play(){

  }
}
