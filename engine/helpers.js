function SRGHelpers( startFps ){
	SRGE.helpers = this;
	
	if( startFps )
		this.fpsCounterStart();
}

SRGHelpers.prototype = {
	constructor: SRGHelpers,
	isSRGHelpers: true,
	
	fpsCounterStart: function(){
		this.fpsCounterInterval = setInterval(SRGE.helpers._fpsCounter,1000);
	},
	fpsCounterStop: function(){
		clearInterval(this.fpsCounterInterval);
	},
	_fpsCounter: function(){
		SRGE.engine.metrics.framesD = SRGE.engine.metrics.frames - SRGE.engine.metrics.framesS;
		SRGE.engine.metrics.ticksD = SRGE.engine.metrics.ticks - SRGE.engine.metrics.ticksS;
		SRGE.engine.metrics.framesS = SRGE.engine.metrics.frames;
		SRGE.engine.metrics.ticksS = SRGE.engine.metrics.ticks;
	},
}

window.SRGHelpersWindow = {
	RAD2DEG: 180/Math.PI,
	DEG2RAD: Math.PI/180,	
	normaliseAngle: function( angleDeg ){
		angleDeg*=angleDeg<0?-1:1;
		return (angleDeg % 360);
	}	
}

var H = window.SRGHelpersWindow;
