function SRGBaseObject( x, y, polygon ){
	
	this.pos = {
		x:x||0,
		y:y||0
	};
	
	this.polygon = polygon;
	// this.preTick = () => {};
	// this.postTick = () => {};

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
	set polygon( poly ){
		if(Array.isArray(poly))
			this._polygon = new SRGPolygon(poly);
		else if(poly.isSRGPolygon)
			this._polygon = poly;
		else
			console.warn("SRGBaseObject: wrong object type, expected SRGPolygon or Array, ",typeof poly,"given");
	},
	get polygon(){
		return this.polygon;
	},
	
	tick:function(){
		// for(var i=0; i<10000; i++)
			// Math.sqrt(9999999999);
		
		// console.log("Object",this.id,"tick");
		// this.preTick();
		/*to be filled...*/
		// this.postTick();
	},
	
	//setpreTick(func){this.preTick=func;}setpostTick(func){this.postTick=func;}
	
}