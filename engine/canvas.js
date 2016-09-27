function SRGCanvas( w, h, name ){
	this.w = w||0;
	this.h = h||0;
	this.name = name||"SRGCanvas";
	this.scaleWidth = 1;
	this.scaleHeight = 1;
	
	this.canvas = document.createElement("canvas");
	this.canvas.id = this.name;
	this.canvas.width = this.w;
	this.canvas.height = this.h;
	
	this.context = this.canvas.getContext("2d");
	this.context.strokeStyle = "red";
	this.context.fillStyle = "black";
	
	this.smoothing = false;
	
	this.saveState();
}

SRGCanvas.prototype = {
	constructor: SRGCanvas,	
	isSRGCanvas: true,
	
	get buffer(){
		return this.context.getImageData( 0, 0, this.w, this.h );
	},		
	set buffer( buffer ){
		this.context.putImageData( buffer, 0, 0 );
	},
	
	get smoothing(){
		return this.context.mozImageSmoothingEnabled||this.context.webkitImageSmoothingEnabled||this.context.msImageSmoothingEnabled||this.context.imageSmoothingEnabled;
	},	
	set smoothing( param ){
		param = !!param;
		this.context.mozImageSmoothingEnabled = param;
		this.context.webkitImageSmoothingEnabled = param;
		this.context.msImageSmoothingEnabled = param;
		this.context.imageSmoothingEnabled = param;
	},
	
	set style( params ){
		this.context.strokeStyle = params.stroke||this.context.strokeStyle;
		this.context.fillStyle = params.fill||this.context.fillStyle;
	},
	get style(){
		return {fill:this.context.fillStyle, stroke:this.context.strokeStyle};
	},
	
	attachToDOM: function( id ){	
		if(id === undefined) 
			document.body.appendChild(this.canvas);
		else 
			document.getElementById(id).appendChild(this.canvas);			
	},
	
	resize:function ( newW, newH, transfer ){
		newW = parseInt(newW);
		newH = parseInt(newH);
		
		if(transfer === true){
			var tempCanvas = document.createElement("canvas");
			tempCanvas.width = this.w;
			tempCanvas.height = this.h;
			//tempCanvas.getContext("2d").putImageData(this.buffer,0,0);
			var ctx = tempCanvas.getContext("2d");
			ctx.putImageData(this.buffer,0,0);
			ctx.msImageSmoothingEnabled = false;
		}
		
		this.w = newW;
		this.h = newH;
		this.canvas.width = this.w;
		this.canvas.height = this.h;
		
		if(transfer === true)
			this.context.drawImage(tempCanvas, 0,0, tempCanvas.width,tempCanvas.height, 0,0, newW,newH);
	},
	
	scale: function( factor, transfer ){
		this.scaleWidth *= (this.w*factor)/this.w;
		this.scaleHeight *= (this.w*factor)/this.w;
		
		this.resize(this.w*factor, this.h*factor, transfer||false);
		this.context.scale(this.scaleWidth, this.scaleHeight);
	},
	
	saveState:function(){
		delete this.savedState;
		this.savedState = {
			w:this.w,
			h:this.h,
			smoothing:this.smoothing,
			scaleWidth:this.scaleWidth,
			scaleHeight:this.scaleHeight
		};
	},
	
	returnState:function(){
		this.resize(this.savedState.w, this.savedState.h);
		this.smoothing = this.savedState.smoothing;
		this.scaleWidth = this.savedState.scaleWidth;
		this.scaleHeight = this.savedState.scaleHeight;
	}, 
	
	clear: function(){
		this.context.clearRect(0, 0, this.w, this.h);
	}
}