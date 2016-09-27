function SRGHelpers( startFps){
	SRGE.helpers = this;
	
	if( startFps )
		this.fpsConterStart();
}

SRGHelpers.prototype = {
	constructor: SRGHelpers,
	isSRGHelpers: true,
	
	fpsConterStart: function(){
		this.fpsCounterInterval = setInterval(SRGE.helpers._fpsCounter,1000);
	},
	fpsConterStop: function(){
		clearInterval(this.fpsCounterInterval);
	},
	_fpsCounter: function(){
		SRGE.engine.metrics.framesS = SRGE.engine.metrics.frames;
		SRGE.engine.metrics.ticksS = SRGE.engine.metrics.ticks;
	},
	
	normaliseAngle: function( angleDeg ){
		angleDeg*=angleDeg<0?-1:1;
		return (angleDeg % 360);
	}
}