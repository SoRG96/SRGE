function SRGControls( elId ){
	SRGE.controls = this;
	if(typeof elId === "string") this.controlInit( elId );
}

SRGControls.prototype = {
	constructor: SRGControls,
	isSRGControls: true,
	
	controlInit: function( elId ){
		SRGE.controls.pressedKeys = {};
		SRGE.controls.mouse = {x:0, y:0};
		var obj = document.getElementById(elId);
		window.addEventListener("keydown", this._keyDownListener, true);
		window.addEventListener("keyup", this._keyUpListener, true);
		obj.addEventListener("mousemove", this._mouseMoveListener, true);
		obj.addEventListener("click", this._mouseClickListener, true);
	},
	
	_keyDownListener: function(ev){
		ev.preventDefault();
		var code = ev.keyCode||ev.which;
		if(SRGE.controls.isPressed(code)) return;
		
		SRGE.controls.pressedKeys[code] = ev.timeStamp;
	},
	_keyUpListener: function(ev){
		ev.preventDefault();
		var code = ev.keyCode||ev.which;
		delete SRGE.controls.pressedKeys[code];
	},
	_mouseMoveListener: function(ev){
		var X = ev.pageX - this.offsetLeft;
		var Y = ev.pageY - this.offsetTop;
		SRGE.controls.mouse = {x:X, y:Y};
	},
	_mouseClickListener: function(ev){
		// console.log(ev.button, ev);
	},
	
	bind: function(f){
		return (SRGE.controls.binded.push(f) - 1);
	},
	//Bind events on keypress
	bindOnKey: function( keyCode, f ){
		return (SRGE.controls.keyBind[keyCode].push(f) - 1);
	},
	//TODO:Binded functions dispatcher
	
	isPressed: function( keyCode ){
		return SRGE.controls.pressedKeys[keyCode];
	}
	
}