function SRGRender(){
	SRGE.render = this;
	this._pipeline = ["clear_trail5","draw","drawAABB","drawCenters","drawFPS"];
	this.availableEffects = ["draw"];
	this.parseEffects();
}

SRGRender.prototype = {
	constructor: SRGRender,
	isSRGRenderer: true,
	
	render: function( scene, canvas ){
		performance.mark("FrameDrawStart");
		
		this.frame = {};
		for(i=0; i<this._pipeline.length; i++)
			this["e_"+this._pipeline[i]]( scene, canvas );
		
		performance.mark("FrameDrawEnd");
		performance.measure("FrameDrawTime", "FrameDrawStart", "FrameDrawEnd");
	},
	
	parseEffects: function(){
		for(var n in this)
			if(n.indexOf("e_") !== -1)
				this.availableEffects.push(n.substr(2));
			
	},
	
	set pipeline( param ){
		//TODO: Check if given pipeline functions correspond to avail.Methods
		this._pipeline = param;
	},
	
	get pipeline(){
		return this._pipeline;
	},
	
	e_draw: function( scene, canvas ){		
		canvas.style = {fill:"orange",stroke:"black"};
		
		var ol = scene.objects.list;
		for(var o in ol){
			canvas.context.beginPath();
			this.drawPolygon( ol[o]._polygon, ol[o].pos.x, ol[o].pos.y, canvas );
			canvas.context.fill();		
			canvas.context.stroke();		
		}
		
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
			
			if( -1 == this.availableEffects.indexOf("name") )
				this.availableEffects.push(name);
			
			if( true === attach ) this._pipeline.push(name);
		}
		else
			console.error("SRGRender: bind wasn't succesfull, please check parameters");
	}
	
}