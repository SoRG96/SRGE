function SRGPolygon( vertices ){
	this.vertices = new Float64Array(vertices);
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
		
		return { x:minX, y:minY, w:maxX-minX, h:maxY-minY };		
	}
	
}