//Simple canvas operations

function scale05( s, c ){ c.scale( 1/2, true ) }
function scale025( s, c ){ c.scale( 1/4, true ) }
function scale2( s, c ){ c.scale( 2, true ) }
function scale4( s, c ){ c.scale( 4, true ) }

//TODO: fix this
function drawAABB( s, c ){
	var o = s.objects.list;
	
	c.style = {fill:"rgba(50,50,50,0.05)",stroke:"red"};
	
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
	c.context.setLineDash([]);
}
//Save|Restore method
//Should be slow by default
function drawPolygonsSR( s, c ){
	var o = s.objects.list;	
	
	for(var i in o){
		c.context.beginPath();
		c.context.save();
		var vertices = o[i]._polygon.vertices;
		
		c.context.translate( o[i].pos.x, o[i].pos.y );
		c.style = o[i].style;
		
		c.context.moveTo( vertices[0], vertices[1] );
		for(var i=2; i<vertices.length; i+=2)
			c.context.lineTo( vertices[i], vertices[i+1] );	
		c.context.fill();
		c.context.stroke();
		
		c.context.restore();
	}	
}
//One stroke method
//Same as SR but uses single fill,stroke function
//for all objects
function drawPolygonsSROS( s, c ){
	var o = s.objects.list;
	c.context.beginPath();
	
	c.style = {fill:"orange",stroke:"black"};
	
	for(var i in o){
		c.context.save();
		var vertices = o[i]._polygon.vertices;
		
		c.context.translate( o[i].pos.x, o[i].pos.y );
		
		c.context.moveTo( vertices[0], vertices[1] );
		for(var i=2; i<vertices.length; i+=2)
			c.context.lineTo( vertices[i], vertices[i+1] );	
		
		c.context.restore();
	}
	c.context.fill();
	c.context.stroke();
}
//Offset method
//Must be faster then save|restore
function drawPolygonsOFF( s, c ){
	var o = s.objects.list;
	
	for(var i in o){
		c.context.beginPath();
		var vertices = o[i]._polygon.vertices;
		var oX = o[i].pos.x;
		var oY = o[i].pos.y;
		
		c.style = o[i].style;
		
		c.context.moveTo( vertices[0] + oX, vertices[1] + oY );
		for(var i=2; i<vertices.length; i+=2)
			c.context.lineTo( vertices[i] + oX, vertices[i+1] + oY );
		
		c.context.fill();
		c.context.stroke();
	}
}
//Offset One Stroke method
function drawPolygonsOFFOS( s, c ){
	var o = s.objects.list;
	c.context.beginPath();
	c.style = {fill:"orange",stroke:"black"};
	
	for(var i in o){
		var vertices = o[i]._polygon.vertices;
		var oX = o[i].pos.x;
		var oY = o[i].pos.y;
		
		c.context.moveTo( vertices[0] + oX, vertices[1] + oY );
		for(var i=2; i<vertices.length; i+=2)
			c.context.lineTo( vertices[i] + oX, vertices[i+1] + oY );
		
	}
	c.context.fill();
	c.context.stroke();
}

function drawNumbers( s, c ){
	var o = s.objects.list;
	
	c.context.beginPath();
	c.context.save();

	
	for(var i in o){
		var ofX = o[i].pos.x;
		var ofY = o[i].pos.y;
		
		c.context.beginPath();
		c.style = {fill:"rgba(0,0,0,0.7)"};
		c.context.fillRect( ofX, ofY, 10, 15 );
		
		c.context.beginPath();
		c.style = {fill:"white"};
		c.context.fillText( o[i].id, ofX, ofY );
		c.context.fill();
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

function drawNormals( s, c ){
	var o = s.objects.list;
	c.style = {stroke:"red"};
	//TODO: finish this
	for(var i in o){
		var ofX = o[i].pos.x;
		var ofY = o[i].pos.y;
		
		c.context.beginPath();
		c.context.rect( ofX-1, ofY-1, 2, 2 );
		c.context.fill();
	}	
}

function drawFPS( s, c ){
	
	c.context.beginPath();
	c.style = {fill:"rgba(0,0,0,0.7)",stroke:"red"};
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

function clear_trail5( s, c ){
	c.context.fillStyle = 'rgba(255, 255, 255, 0.2)';
	c.context.fillRect(0, 0, c.w, c.h);
}

function alpha05( s, c ){
	c.context.globalAlpha = 0.5;
}
function alpha07( s, c ){
	c.context.globalAlpha = 0.7;
}
function alpha1( s, c ){
	c.context.globalAlpha = 1;
}

function voronoi( s, c ){
	var sources = s.objects.get("*");//voronoiSource
	
	var width = c.w;
	var height = c.h;
	var w = 0, h = 0;
	var prevStyle = "";
	
	for( var x = 0; x<width; x++ )
		for( var y = 0; y<height; y++ ){
			//get closest object
			var closestId = s.objects.getClosestByCoord( x, y, "*").id;
			
			if(prevStyle != s.objects.objectList[closestId].color ){
				c.context.fill();
				c.context.fillStyle = s.objects.objectList[closestId].color;
				// console.log(s.objects.objectList[closestId].color); return;
				c.context.beginPath();
			}
			c.context.rect( x, y, 1, 1);
			prevStyle = s.objects.objectList[closestId].color;
		}
	c.context.fill();
		
	
	//Draw sources
	c.style = { fill: "black" };
	c.context.beginPath();
	for(var i in sources){
		var o = sources[i];
		var ofX = o.pos.x;
		var ofY = o.pos.y;
		
		c.context.rect( ofX-2, ofY-2, 4, 4 );
	}
	c.context.fill();
}

function voronoiStep10( s, c ){
	var sources = s.objects.get("*");//voronoiSource
	
	var width = c.w;
	var height = c.h;
	var w = 0, h = 0;
	var prevStyle = "";
	var step = 10;
	
	for( var x = parseInt(step/2); x<width; x+=step )
		for( var y = parseInt(step/2); y<height; y+=step ){
			//get closest object
			var closestId = s.objects.getClosestByCoord( x, y, "*").id;
			
			if(prevStyle != s.objects.objectList[closestId].color ){
				c.context.fill();
				c.context.fillStyle = s.objects.objectList[closestId].color;
				c.context.beginPath();
			}
			c.context.rect( x-parseInt(step/2), y-parseInt(step/2), step, step);
			prevStyle = s.objects.objectList[closestId].color;
		}
	c.context.fill();
		
	
	//Draw sources
	c.style = { fill: "black" };
	c.context.beginPath();
	for(var i in sources){
		var o = sources[i];
		var ofX = o.pos.x;
		var ofY = o.pos.y;
		
		c.context.rect( ofX-2, ofY-2, 4, 4 );
	}
	c.context.fill();
}

function voronoiManhattan( s, c ){
	var sources = s.objects.get("*");
	
	var width = c.w;
	var height = c.h;
	var w = 0, h = 0;
	var prevStyle = "";
	
	for( var x = 0; x<width; x++ )
		for( var y = 0; y<height; y++ ){
			//get closest object
			var closestId = s.objects.getClosestByCoordManhattan( x, y, "*").id;
			
			if(prevStyle != s.objects.objectList[closestId].color ){
				c.context.fill();
				c.context.fillStyle = s.objects.objectList[closestId].color;
				c.context.beginPath();
			}
			c.context.rect( x, y, 1, 1);
			prevStyle = s.objects.objectList[closestId].color;
		}
	c.context.fill();
		
	
	//Draw sources
	c.style = { fill: "black" };
	c.context.beginPath();
	for(var i in sources){
		var o = sources[i];
		var ofX = o.pos.x;
		var ofY = o.pos.y;
		
		c.context.rect( ofX-2, ofY-2, 4, 4 );
	}
	c.context.fill();
}

//Per pixel manipulation
//https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/

function dotPattern( s, c ){
	var buf = c.buffer;
	var w = buf.width;
	var h = buf.height;
	
	var data = new Uint32Array(buf.data.buffer);
	
	for(var y = 0; y<h; y++)
		for(var x = 0; x<w; x++){
			if((x+y) % 2)
				data[y * w + x] =
					(255 << 24) |    // alpha
					(0 << 16) |    // blue
					(0 <<  8) |    // green
					 0;            // red
	}
	
	c.buffer = buf;
}

function invert( s, c ){
	var buf = c.buffer;
	var w = buf.width;
	var h = buf.height;
	
	var data = new Uint32Array(buf.data.buffer);
	
	for(var y = 0; y<h; y++)
		for(var x = 0; x<w; x++){
			var i = y*w+x;
			
			var r = data[i] & 255;
			var g = data[i]>>>8 & 255;
			var b = data[i]>>>16 & 255;
			var a = data[i]>>>24 & 255;
			
				data[i] =
					(a << 24) |    // alpha
					((255-b) << 16) |    // blue
					((255-g) <<  8) |    // green
					 (255-r);            // red
	}
	
	c.buffer = buf;
}

function greyscale( s, c ){
	var buf = c.buffer;
	var w = buf.width;
	var h = buf.height;
	
	var data = new Uint32Array(buf.data.buffer);
	
	for(var y = 0; y<h; y++)
		for(var x = 0; x<w; x++){
			var i = y*w+x;
			
			var r = data[i] & 255;
			var g = data[i]>>>8 & 255;
			var b = data[i]>>>16 & 255;
			var a = data[i]>>>24 & 255;
			
			var avg = (r+g+b) / 3;
			
				data[i] =
					(a << 24) |    // alpha
					(avg << 16) |    // blue
					(avg <<  8) |    // green
					 avg;            // red
	}
	
	c.buffer = buf;
}

//

function addEffect(name, func){
	SRGRender.prototype["e_"+name] = func;
};


addEffect("drawAABB", drawAABB);
addEffect("drawCenters", drawCenters);
addEffect("drawNumbers", drawNumbers);
addEffect("scale4", scale4);
addEffect("scale2", scale2);
addEffect("scale05", scale05);
addEffect("scale025", scale025);
addEffect("clear", clear);
addEffect("clear_trail5", clear_trail5);
addEffect("drawFPS", drawFPS);
addEffect("alpha05", alpha05);
addEffect("alpha07", alpha07);
addEffect("alpha1", alpha1);

addEffect("drawPolygonsSR",drawPolygonsSR);
addEffect("drawPolygonsSROS",drawPolygonsSROS);
addEffect("drawPolygonsOFF",drawPolygonsOFF);
addEffect("drawPolygonsOFFOS",drawPolygonsOFFOS);

addEffect("dotPattern", dotPattern);
addEffect("invert", invert);
addEffect("greyscale", greyscale);


addEffect("voronoi", voronoi);
addEffect("voronoiStep10", voronoiStep10);
addEffect("voronoiManhattan", voronoiManhattan);