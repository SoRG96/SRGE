function SRGObjectWorker(){
	this.objectList = [];
}

SRGObjectWorker.prototype = {
	constructor: SRGObjectWorker,
	isSRGObjectWorker: true,
	
	get list(){
		return this.objectList;
	},
	get: function( param ){
		if("number" == typeof param)
			return this.objectList[param];
		else if("*" == param || undefined == param)
			return this.objectList;
		else{
			var objects = this.objectList.filter(
				function( e, i, a ){
					regExp = new RegExp("^"+param.replace(/\*/g,".*")+"$","gim");
					return regExp.test(e.type);
				}, 
			param);
			
			return objects;			
		}
	},
	//TODO: So much...
	/*
		TODO:
			sort by z-bufer
			+get objects by mask ("enemy*", "*bullet*")
			get distance between objects
			.each() function
			stacking: .get("enemy*").each(destroy)
			quad tree sorting
	*/
	add: function( obj ){
		if(obj.isSRGBaseObject){
			var id = this.objectList.push(obj) - 1;
			obj.id = id;
			return obj;
		}
		else
			console.warn("SRGObjectWorker: wrong object type, expected SRGBaseObject");
	},
	remove: function( id ){
		this.markedToRemove.push(id);		
	},
	flush: function(){//Deffered object removal
		for(var i in this.markedToRemove)
			delete this.objectList[i];
		this.markedToRemove = [];
	},
	
	getClosestTo: function( obj, mask ){
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