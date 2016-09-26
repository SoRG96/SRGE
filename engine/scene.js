/*
 * Keeps information like:
 * -Objects inside a scene
 */
function SRGScene(){
	//Will be used for other scene-themed properties
	this.objects = new SRGObjectWorker();
}

SRGScene.prototype = {
	constructor: SRGScene,
	isSRGScene: true
}