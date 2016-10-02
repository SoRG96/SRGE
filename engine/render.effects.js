function scale05( s, c ){ c.scale( 1/2, true ) }
function scale025( s, c ){ c.scale( 1/4, true ) }
function scale2( s, c ){ c.scale( 2, true ) }
function scale4( s, c ){ c.scale( 4, true ) }

function greyscale ( s, c ){
	var b = c.buffer;
	
	for(var i=0; i<b.data.length; i+=4){
		var avg = ( b.data[i] + b.data[i+1] + b.data[i+2] ) / 3;
		b.data[i] = avg;
		b.data[i+1] = avg;
		b.data[i+2] = avg;
	}
	
	c.buffer = b;
}

function invert ( s, c ){
	var b = c.buffer;
	
	for(var i=0; i<b.data.length; i+=4){
		b.data[i] = 255 - b.data[i];
		b.data[i+1] = 255 - b.data[i+1];
		b.data[i+2] = 255 - b.data[i+2];
	}
	
	c.buffer = b;
}

function drawAABB( s, c ){
	var o = s.objects.list;
	
	c.context.beginPath();
	c.context.save();
	
	c.style = {fill:"rgba(50,50,50,0.05)",stroke:"red"};
	
	var _lineDash = c.context.getLineDash();
	c.context.setLineDash([5, 5]);
	c.context.lineDashOffset = -SRGE.engine.metrics.ticks;
	for(var i in o){
		var AABB = o[i].polygon.AABB;
		var ofX = o[i].pos.x;
		var ofY = o[i].pos.y;
		
		c.context.beginPath();
		c.context.rect( AABB.x+ofX, AABB.y+ofY, AABB.w, AABB.h );
		c.context.fill();
		c.context.stroke();
	}
	
	c.context.restore();
}

function drawCenters( s, c ){
	var o = s.objects.list;
	c.style = {fill:"red"};
	
	for(var i in o){
		var ofX = o[i].pos.x;
		var ofY = o[i].pos.y;
		
		c.context.beginPath();
		c.context.rect( ofX-1, ofY-1, 2, 2 );
		c.context.fill();
	}
}

//https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
function dotPattern( s, c ){
	var imageData = c.buffer;
	
	var w = imageData.width;
	var h = imageData.height;
	
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	var data = new Uint32Array(buf);
	buf8.set(c.buffer.data);
	
	for(var y = 0; y<h; y++)
		for(var x = 0; x<w; x++){
			if(!((x+y)%2))
				data[y * w + x] =
					(255   << 24) |    // alpha
					(0 << 16) |    // blue
					(0 <<  8) |    // green
					 0;            // red
		}
		
		
	imageData.data.set(buf8);	
	
	c.buffer = imageData;
	
	// delete buf;
	// delete buf8;
	// delete data;
}

function greyscalefast( s, c ){
	var imageData = c.buffer;
	
	var w = imageData.width;
	var h = imageData.height;
	
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	var data = new Uint32Array(buf);
	buf8.set(c.buffer.data);
	
	for(var y = 0; y<h; y++)
		for(var x = 0; x<w; x++){
			var i = y*w+x;
			
			var r = data[i] & 255;
			var g = data[i]>>>8 & 255;
			var b = data[i]>>>16 & 255;
			var a = data[i]>>>24 & 255;
			
			var avg = (r+g+b)/3;
			
				data[y * w + x] =
					(a   << 24) |    // alpha
					(avg << 16) |    // blue
					(avg <<  8) |    // green
					 avg;            // red
					 
		}
		
		
	imageData.data.set(buf8);
		
	c.buffer = imageData;
}

function invertfast( s, c ){
	var imageData = c.buffer;
	
	var w = imageData.width;
	var h = imageData.height;
	
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	var data = new Uint32Array(buf);
	buf8.set(c.buffer.data);
	
	for(var y = 0; y<h; y++)
		for(var x = 0; x<w; x++){
			var i = y*w+x;
			
			var r = data[i] & 255;
			var g = data[i]>>>8 & 255;
			var b = data[i]>>>16 & 255;
			var a = data[i]>>>24 & 255;
			
				data[y * w + x] =
					(a   << 24) |    // alpha
					((255-b) << 16) |    // blue
					((255-g) <<  8) |    // green
					 (255-r);            // red
					 
		}
		
		
	imageData.data.set(buf8);
		
	c.buffer = imageData;
}

function hLines( s, c ){
	var imageData = c.buffer;
	
	var w = imageData.width;
	var h = imageData.height;
	
	var buf = new ArrayBuffer(imageData.data.length);
	var buf8 = new Uint8ClampedArray(buf);
	var data = new Uint32Array(buf);
	buf8.set(c.buffer.data);
	
	for(var y = 0; y<h; y++)
		for(var x = 0; x<w; x++){
			if(y%2)
				data[y * w + x] =
					(200   << 24) |    // alpha
					(0 << 16) |    // blue
					(0 <<  8) |    // green
					 0;            // red
		}
		
		
	imageData.data.set(buf8);
		
	c.buffer = imageData;
}

function drawFPS( s, c ){
	
	c.context.beginPath();
	c.style = {fill:"black",stroke:"red"};
	c.context.rect(0,0,60,32);
	c.context.fill();
	
	c.style = {fill:"white",stroke:"white"};
	c.context.font = "15px Arial";
	c.context.textBaseline = "hanging";
	c.context.fillText(SRGE.engine.metrics.framesD + " FPS",0,0);
	c.context.fillText(SRGE.engine.metrics.ticksD + " Ticks",0,15);
	
}

function clear( s, c ){
	c.clear();
}

function clear_trail111( s, c ){
	c.context.fillStyle = 'rgba(255, 255, 255, 0.9)';
	c.context.fillRect(0, 0, c.w, c.h);
}
function clear_trail142( s, c ){
	c.context.fillStyle = 'rgba(255, 255, 255, 0.7)';
	c.context.fillRect(0, 0, c.w, c.h);
}
function clear_trail2( s, c ){
	c.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
	c.context.fillRect(0, 0, c.w, c.h);
}
function clear_trail3( s, c ){
	c.context.fillStyle = 'rgba(255, 255, 255, 0.3)';
	c.context.fillRect(0, 0, c.w, c.h);
}
function clear_trail5( s, c ){
	c.context.fillStyle = 'rgba(255, 255, 255, 0.2)';
	c.context.fillRect(0, 0, c.w, c.h);
}
function clear_trail10( s, c ){
	c.context.fillStyle = 'rgba(255, 255, 255, 0.1)';
	c.context.fillRect(0, 0, c.w, c.h);
}
function clear_trail20( s, c ){
	c.context.fillStyle = 'rgba(255, 255, 255, 0.05)';
	c.context.fillRect(0, 0, c.w, c.h);
}

//

function addEffect(name, func){
	SRGRender.prototype["e_"+name] = func;
};


addEffect("drawAABB", drawAABB);
addEffect("greyscale", greyscale);
addEffect("greyscalefast", greyscalefast);
addEffect("invert", invert);
addEffect("invertfast", invertfast);
addEffect("drawCenters", drawCenters);
addEffect("scale4", scale4);
addEffect("scale2", scale2);
addEffect("scale05", scale05);
addEffect("scale025", scale025);
addEffect("dotPattern", dotPattern);
addEffect("hLines", hLines);
addEffect("clear", clear);
addEffect("clear_trail111", clear_trail111);
addEffect("clear_trail142", clear_trail142);
addEffect("clear_trail2", clear_trail2);
addEffect("clear_trail3", clear_trail3);
addEffect("clear_trail5", clear_trail5);
addEffect("clear_trail10", clear_trail10);
addEffect("clear_trail20", clear_trail20);
addEffect("drawFPS", drawFPS);