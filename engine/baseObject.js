function SRGBaseObject( name, x, y, polygon, tickFunction ){
	
	this.name = name;
	this.pos = {
		x:x||0,
		y:y||0,
		z:0
	};
	
	this.polygon = polygon;
	if(typeof tickFunction === "function")
		this.tick = tickFunction;
}

SRGBaseObject.prototype = {	
	constructor: SRGBaseObject,	
	isSRGBaseObject: true,
	
	set position( pos ){
		this.pos.x = pos.x||this.x;
		this.pos.y = pos.y||this.y;		
		this.pos.z = pos.z||this.z;
	},
	get position(){		
		return { x:this.pos.x, y:this.pos.y, z:this.pos.z };		
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
		return this._polygon;
	},
	
	hit:function(by){
		console.log(by.name)
	},
	
	tick:function(){
	}
	
}