function SRGBaseObject( x, y, params ){
	
	this.x = 0;
	this.y = 0;
	this.preTick = () => {};
	this.postTick = () => {};

}

SRGBaseObject.prototype = {
	
	constructor: SRGBaseObject,
	
	isSRGBaseObject: true,
	
	set position( pos ){
		
		this.pos.x = pos.x||this.x;
		this.pos.y = pos.y||this.y;
		
	},
	
	get position(){
		
		return { x:this.pos.x, y:this.pos.y };
		
	},
	
	tick:function(){
		this.preTick();
		/*to be filled...*/
		this.postTick();
	},
	
	set preTick( func ){
		
		this.preTick = func;
		
	}
	
	set postTick( func ){
		
		this.postTick = func;
		
	}
	
}