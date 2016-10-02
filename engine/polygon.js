function SRGPolygon( vertices ){
	this.vertices = new Float32Array(vertices);
	this.changed = true;
	this.angle = 0;
}

SRGPolygon.prototype = {
	constructor:SRGPolygon,
	isPolygon:true,
	
	get vectors(){
		var vectors = [];
		for(var i=0; i<this.vertices.length-2; i+=2){
			vectors.push(this.vertices[i+2] - this.vertices[i]);
			vectors.push(this.vertices[i+3] - this.vertices[i+1]);
		}
		return vectors;
	},
	
	get AABB(){
		if(!this.changed) return this._AABB;
		var minX = this.vertices[0];
		var maxX = this.vertices[0];
		var minY = this.vertices[1];
		var maxY = this.vertices[1];
		
		for(var i=2; i<this.vertices.length; i+=2){
			if(this.vertices[i] < minX) minX = this.vertices[i];
			if(this.vertices[i] > maxX) maxX = this.vertices[i];
			
			if(this.vertices[i+1] < minY) minY = this.vertices[i+1];
			if(this.vertices[i+1] > maxY) maxY = this.vertices[i+1];			
		}
		
		this._AABB = { x:minX, y:minY, w:maxX-minX, h:maxY-minY }
		return this._AABB;		
	},
	
	getAABBoff: function( offX, offY ){
		offX = offX||0;
		offY = offY||0;
		var AABB = this.AABB;
		AABB.x += offX;
		AABB.y += offY;
		return AABB;
	},
	
	rotate: function( angle ){
		angle = H.normaliseAngle( angle );
		if( 0 == angle ) return;
		this.angle += angle;
		
		for( var i = 0; i<this.vertices.length; i+=2){
			var x = this.vertices[i];
			var y = this.vertices[i+1];
			this.vertices[i] = x * Math.cos( angle*H.DEG2RAD ) + y * Math.sin( angle*H.DEG2RAD );
			this.vertices[i+1] = -x * Math.sin( angle*H.DEG2RAD ) + y * Math.cos( angle*H.DEG2RAD );
		}
		
		this.changed = true;
	}
}