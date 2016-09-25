function SRGRenderer(){
}

SRGRenderer.prototype = {
	constructor: SRGRenderer,
	isSRGRenderer: true,
	
	draw: function( scene, canvas ){},
	
	drawPolygon:function( polygon, srgcanvas ){},
	
	//
	
	_drawPolygon:function( polygon, srgcanvas ){
		
		var offsetX = 0;
		var offsetY = 0;
		
		var vertices = polygon.vertices;
		srgcanvas.style = {fill:"grey",stroke:"black"};
		
		srgcanvas.context.moveTo( vertices[0]+offsetX, vertices[1]+offsetY );
		
		for(var i=2; i<vertices.length; i+=2)
			srgcanvas.context.lineTo( vertices[i]+offsetX, vertices[i+1]+offsetY );
		
		srgcanvas.context.stroke();		
	}
	
}