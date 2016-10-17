function SRGBaseObject( type, params ){
	
	this.type = type;
	this.pos = { 
		x: 0, 
		y: 0, 
		z: 0
	}
	this._style= {
		fill: "orange",
		stroke: "black"
	}
	this.collision = "*";
	this.polygon = [];
	
	for(var p in params)
		this[p] = params[p];
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
	
	set style( params ){
		this._style.fill = params.fill || this._style.fill;
		this._style.stroke = params.stroke || this._style.stroke;
	},
	get style(){
		return {
			fill: this._style.fill,
			stroke: this._style.stroke
		};
	},
	
	rotate: function( angle ){
		this._polygon.rotate( angle );
	},
	
	hit: function(by){
		// console.log(this.type,this.id,"hit by",by.type,by.id);
		this._style.fill = "red";
		// setTimeout(function(e){e.destroy()},100,this);
		this.destroy();
	},
	
	tick: function(){
	},
	
	destroy: function(){
		SRGE.engine.scene.objects.remove(this.id);
	}
}