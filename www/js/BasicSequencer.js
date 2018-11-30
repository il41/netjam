class BasicSequencer {
  constructor(instruments,columns,output,parent){
    let synths = [
        new Tone.Synth(),
        new Tone.Synth(),
        new Tone.Synth()
      ]

    let rows = [];
    for(let i = 0; i<instruments;i++){
      row = document.createElement('div')
      row.className = "sequencerRow"
    }


    for(let i = 0; i<instruments;i++){
      synths[i].oscillator.type = 'sine';
      synths[i].connect(output)
      row = document.createElement('div')
      row.className = "sequencerRow" + i
    }
    for(let i = 0; i<rows;i++){
      for (let j = 0; j<columns;j++){
        row = getElementByClassName("sequencerRow" + i)
        checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.id = "row" + i + "step" + j
        row.appendChild(checkbox)
        parent.appendChild(row)
      }
    }
    // forEach(column){
    //   parent.appendChild(this.div)
    // }

    
    // synths.forEach(function (synth) {
    //   return synth.connect(output);
    // });
    //
    // for(let i = 1; i<rows;i++){
    //   new Tone.Synth()
    // }
    //
    // var $rows = document.body.querySelectorAll('div > div'),
    // notes = ['G5', 'E4', 'C5', 'F5'];
    // var index = 0;
    //
    // Tone.Transport.scheduleRepeat(repeat, '8n');
    // Tone.Transport.start();
    //
    // function repeat(time) {
    //   var step = index % 8;
    //   for (var i = 0; i < $rows.length; i++)
    //   {
    //     var synth = synths[i],
    //     note = notes[i],
    //     $row = $rows[i],
    //     $input = $row.querySelector('input:nth-child(' + (step + 1) + ')');
    //     if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
    //   }
    //   index++;
    // }
  }
}
