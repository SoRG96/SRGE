function SRGPolygon( vertices ){
	this.vertices = new Float32Array(vertices);
	this.changed = {AABB:true, normals:true};
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
		if(!this.changed.AABB) return this._AABB;
		
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
		
		this._AABB = { x:minX, y:minY, w:maxX-minX, h:maxY-minY };
		this.changed.AABB = false;
		return this._AABB;		
	},
	
	//get unique normals
	get normals(){
		if(!this.changed.normals) return this._normals;
		
		this._normals = [];
		var normalsT = []; //temp
		for( var i=0; i<this.vertices.length; i+=2 ){
			var n = [ this.vertices[i+1], -this.vertices[i] ];
			//normalising
			var len = Math.sqrt( n[0]*n[0] + n[1]*n[1] );
			n = [ n[i]/len, n[i+1]/len ];
			
			if(normalsT.indexOf(n[i]+"|"+n[i+1]) == -1){
				this._normals.concat(n);
				normalsT.push(n[i]+"|"+n[i+1]);
			}
				
		}
		this.changed.normals = false;
		return this._normals;
	},
	
	getAABBoff: function( offX, offY ){
		offX = offX||0;
		offY = offY||0;
		return { 
			x: this.AABB.x+offX, 
			y: this.AABB.y+offY, 
			w: this.AABB.w,
			h: this.AABB.h
		};
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
		
		this.changed = {AABB:true, normals:true};
	}
}