function SRGEngine( w, h ){
	this.scene = new SRGScene();
	this.render = new SRGRender();
	this.view = new SRGView( w, h ); //??? Renderer view
	this.ticker = {};
	this.tickMultiplier = 1;
	window.SRGEngine.MAIN = this;
	this.metrics = {
		frames:0,
		ticks:0,
		framesS:0,
		ticksS:0
	};
}

SRGEngine.prototype = {
	constructor: SRGEngine,
	isSRGEngine: true,
	
	set canvas( SRGCanvas ){
		if(SRGCanvas.isSRGCanvas)
			this._canvas = SRGCanvas;
		else
			console.warn("SRGEngine: wrong object type, expected SRGCanvas");
	},
	
	setTickRate( rate ){
		rate = parseInt(rate);
		if(rate >= 0 && rate <= 5000){
			clearInterval(this.ticker);
			this.tickRate = rate;
			if(rate !== 0)
				this.ticker = setInterval(function(o){o.tick()}, rate, this);
			
			console.info("SRGEngine: tick rate set to", rate);	
			return true;
		}else{
			console.warn("SRGEngine: wrong tick rate, must be 0..5000");	
			return false;
		}
	},
	
	tick:function(){
		performance.mark("TickStart");
		
		var ol = this.scene.objects.list
		for(var o in ol)
			ol[o].tick();
			
		performance.mark("TickEnd");
		performance.measure("TickTime", "TickStart", "TickEnd");
		this.metrics.ticks++;
	},
	
	startRender: function(){
		console.info("SRGEngine: render started");
		this._startRender();
	},
	_startRender: function(){
		//renderId = Math.random().toString(36).substring(2,25);
		//window["renderer-"+renderId] = function(){};
		var engine = window.SRGEngine.MAIN;
		engine.render.draw(engine.scene, engine._canvas);
		engine.animationFrameId = window.requestAnimationFrame(engine._startRender);	
		engine.metrics.frames++;	
	},
	stopRender: function(){
		console.info("SRGEngine: render stopped");	
		window.cancelAnimationFrame(this.animationFrameId); 
	}
}