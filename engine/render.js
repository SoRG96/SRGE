function SRGRender(){
	SRGE.render = this;
	this._pipeline = ["draw"];
	this.availableMethods = ["draw"];
}

SRGRender.prototype = {
	constructor: SRGRender,
	isSRGRenderer: true,
	
	render: function( scene, canvas ){
		performance.mark("FrameDrawStart");
		
		this.frame = {};
		canvas.clear();	
		for(i=0; i<this._pipeline.length; i++)
			this[this._pipeline[i]]( scene, canvas );
		
		performance.mark("FrameDrawEnd");
		performance.measure("FrameDrawTime", "FrameDrawStart", "FrameDrawEnd");
	},
	
	set pipeline( param ){
		//TODO: Check if given pipeline functions correspond to avail.Methods
		this._pipeline = param;
	},
	
	get pipeline(){
		return this._pipeline;
	},
	
	draw: function( scene, canvas ){
		if(!scene.isSRGScene || !canvas.isSRGCanvas){
			console.error("SRGRender: WRONG PARAMETERS GIVEN");
			return false;
		}
		
		canvas.style = {fill:"red",stroke:"black"};
		canvas.context.beginPath();
		
		var ol = scene.objects.list;
		for(var o in ol)
			this.drawPolygon( ol[o]._polygon, ol[o].pos.x, ol[o].pos.y, canvas );
		
		canvas.context.fill();		
		canvas.context.stroke();		
	},
	
	drawPolygon:function( polygon, offsetX, offsetY, canvas ){
		var vertices = polygon.vertices;
		canvas.context.moveTo( vertices[0]+offsetX, vertices[1]+offsetY );
		for(var i=2; i<vertices.length; i+=2)
			canvas.context.lineTo( vertices[i]+offsetX, vertices[i+1]+offsetY );		
	},
	
	bind: function( name, func, attach ){
		if(typeof func === "function" && name!="render"){
			this[name] = func;
			
			if( -1 == this.availableMethods.indexOf("name") )
				this.availableMethods.push(name);
			
			if( true === attach ) this._pipeline.push(name);
		}
		else
			console.error("SRGRender: bind wasn't succesfull, please check parameters");
	}
	
}