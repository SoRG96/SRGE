function SRGEngine( w, h, canvas ){
	if(window.SRGE !== undefined) {
		throw "SRGEngine: Second instance of SRGEngine are not allowed";
	}
	window.SRGE = {};
	window.SRGE.engine = this;
	
	this.scene = new SRGScene();
	this.render = new SRGRender();
	this.view = new SRGView( w, h ); //??? Renderer view
	
	
	//Canvas handler
	if(canvas === true)
		this.canvas = new SRGCanvas( w, h );
	else if(canvas.isSRGCanvas) 
		this.canvas = canvas;
	
	this.ticker = {};
	this.tickRate = 0;
	this.tickMultiplier = 1;
	
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
		if(SRGCanvas.isSRGCanvas){
			this._canvas = SRGCanvas;
			window.SRGE.canvas = this._canvas;
		}else
			console.warn("SRGEngine: wrong object type, expected SRGCanvas");
	},
	get canvas(){
		return this._canvas;
	},
	
	setTickRate: function( rate ){
		rate = parseInt(rate);
		if(rate >= 0 && rate <= 5000){
			clearInterval(this.ticker);
			this.tickRate = rate;
			if(rate !== 0)
				this.ticker = setInterval(function(o){o.tick()}, rate, this);
			
			console.info("SRGEngine: tick rate set to", rate,"ms. (",parseInt(1000/rate),"fps )");	
			return true;
		}else{
			console.warn("SRGEngine: wrong tick rate, must be 0..5000 ms.");	
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
		var engine = SRGE.engine;
		engine.render.render(engine.scene, engine._canvas);
		engine.animationFrameId = window.requestAnimationFrame(engine._startRender);	
		engine.metrics.frames++;	
	},
	stopRender: function(){
		console.info("SRGEngine: render stopped");	
		window.cancelAnimationFrame(this.animationFrameId); 
	}
}