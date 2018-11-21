class VolumeMeter{
		this.meter = new Tone.Meter();
		}).connect(meter).toMaster();

		//drawing the FFT
		let meterContext = $("<canvas>",{
			"id" : "fft"
		}).appendTo("#volume").get(0).getContext("2d");
		var meterGraident;
		function drawMeter(){
			var level = meter.getLevel();
			level = Tone.dbToGain(level); //scale it between 0 - 1
			meterContext.clearRect(0, 0, canvasWidth, canvasHeight);
			meterContext.fillStyle = meterGraident;
			meterContext.fillRect(0, 0, canvasWidth, canvasHeight);
			meterContext.fillStyle = "white";
			meterContext.fillRect(canvasWidth * level, 0, canvasWidth, canvasHeight);
		}
		//size the canvase
		var canvasWidth, canvasHeight;
		function sizeCanvases(){
			canvasWidth = $("#fft").width();
			canvasHeight = $("#fft").height();
			meterContext.canvas.width = canvasWidth;
			meterContext.canvas.height = canvasHeight;
			//make the gradient
			meterGraident = meterContext.createLinearGradient(0, 0, canvasWidth, canvasHeight);
			meterGraident.addColorStop(0, "#BFFF02");
			meterGraident.addColorStop(0.8, "#02FF24");
			meterGraident.addColorStop(1, "#FF0202");
		}
		sizeCanvases();
		$(window).resize(sizeCanvases);
		function loop(){
			requestAnimationFrame(loop);
			//draw the meter level
			drawMeter();
		}
		loop();
  }
