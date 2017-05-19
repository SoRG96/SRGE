//http://www.fundza.com/index.html

function SRGEngine( w, h, canvas ){
	if(window.SRGE !== undefined) {
		throw "SRGEngine: Second instance of SRGEngine are not allowed";
	}
	window.SRGE = {};
	window.SRGE.engine = this;
	
	this.scene = new SRGScene();
	this.render = new SRGRender();
	this.view = new SRGView( w, h ); //??? Renderer view
	
	
	this.gameLogic = function(){};
	
	//Canvas handler
	if(canvas === true)
		this.canvas = new SRGCanvas( w, h );
	else if(canvas.isSRGCanvas) 
		this.canvas = canvas;
	
	this.ticker = {};
	this.tickRate = 0;
	this.tickMultiplier = 1;
	this.disableCollisionCheck = false;
	
	this.metrics = {
		frames:0,
		ticks:0,
		framesS:0,
		ticksS:0,
		framesD:0,
		ticksD:0
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
	
	tick: function(){
		performance.mark("TickStart");
		
		this.logic();
		
		performance.mark("TickEnd");
		performance.measure("TickTime", "TickStart", "TickEnd");
		this.metrics.ticks++;
	},
	logic: function(){		
		
		var ol = this.scene.objects.list;
		for(var o in ol)
			ol[o].tick();
		
		if(!this.disableCollisionCheck)
			this.checkCollisions_1();
		
		this.scene.objects.flush();
	},
	
	startRender: function(){
		this.stopRender();
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
	},
	
	checkCollisions: function(){
		//Iterate through all objects and check
		var objects = this.scene.objects.list;
		for( var i in objects )
			for( var j in objects ){
				if( j <= i ) continue;
				if( this.checkCollisionAABB( objects[i], objects[j] ) && this.checkCollisionSAT( objects[i], objects[j] ) ){
					objects[i].hit(objects[j]);
					objects[j].hit(objects[i]);
				}
			}
	},
	checkCollisions_1: function(){
		//Different approach		
		var objects = this.scene.objects.get();
		
		for( var i in objects ){
			var collision = this.scene.objects.get(objects[i].collision)
			
			for( var j in collision ){
				var id = collision[j].id;
				if( objects[i].id !== id && this.checkCollisionAABB( objects[i], objects[id] ) && this.checkCollisionSAT( objects[i], objects[id] ) ){
					objects[i].hit(objects[id]);
				}
			}
		}
	},
	checkCollisionAABB: function( obj1, obj2 ){
		o1 = obj1.polygon.getAABBoff( obj1.pos.x, obj1.pos.y );
		o2 = obj2.polygon.getAABBoff( obj2.pos.x, obj2.pos.y );
		
		return (o1.x < o2.x + o2.w 
		&& o1.x + o1.w > o2.x
		&& o1.y < o2.y + o2.h
		&& o1.h+o1.y > o2.y);
	},
	checkCollisionSAT: function( obj1, obj2 ){
		return true;
		//TODO: SAT check
	},
}