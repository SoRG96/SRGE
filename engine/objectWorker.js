function SRGObjectWorker(){
	this.objectList = [];
}

SRGObjectWorker.prototype = {
	constructor: SRGObjectWorker,
	isSRGObjectWorker: true,
	
	get list(){
		return this.objectList;
	},
	get: function( objid ){
		return this.objectList[objid]||false;
	},
	
	add: function( obj ){
		if(obj.isSRGBaseObject){
			var id = this.objectList.push(obj) - 1;
			obj.id = id;
			return id;
		}
		else
			console.warn("SRGObjectWorker: wrong object type, expected SRGBaseObject");
	},
	
	getClosestTo: function( obj ){
		var p = obj.position;
		var closestId = false;
		var closestDist = Infinity;
		
		for(var o in this.objectList){
			if(this.objectList.id === obj.id) continue;
			var pp = this.objectList[o].position;
			var dist = Math.sqrt((p.x-pp.x)*(p.x-pp.x) + (p.y-pp.y)*(p.y-pp.y));
			if(dist < closestDist){
				closestDist = dist;
				closestId = o;
			}
		}
		
		return {id:closestId, dist:closestDist};
	},
	
}