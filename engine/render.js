function SRGRender(){
}

SRGRender.prototype = {
	constructor: SRGRender,
	isSRGRenderer: true,
	
	draw: function( scene, canvas ){
		if(!scene.isSRGScene || !canvas.isSRGCanvas){
			console.error("SRGRender: WRONG PARAMETERS GIVEN");
			return;
		}
		performance.mark("drawStart");
		
		canvas.style = {fill:"red",stroke:"black"};
		canvas.context.beginPath();
		
		var ol = scene.objects.list;
		for(var o in ol)
			this.drawPolygon( ol[o]._polygon, ol[o].pos.x, ol[o].pos.y, canvas );
		
		canvas.context.stroke();		
		
		performance.mark("drawEnd");
		performance.measure("DrawTime", "drawStart", "drawEnd");
	},
	
	drawPolygon:function( polygon, offsetX, offsetY, canvas ){
		var vertices = polygon.vertices;
		canvas.context.moveTo( vertices[0]+offsetX, vertices[1]+offsetY );
		for(var i=2; i<vertices.length; i+=2)
			canvas.context.lineTo( vertices[i]+offsetX, vertices[i+1]+offsetY );		
	}
	
}