function extend(c, p) {

	var F = function(){};
　　　　F.prototype = p.prototype;
　　　　c.prototype = new F();
　　　　c.prototype.constructor = c;
　　　　c.uber = p.prototype;
　
}

var WIDGET_TYPE = {
	DATA : "data",
	FUNC : "function"
}

var NODE_TYPE = {
	DATA : "data",
	FUNC : "function"
}


var Node = function(r){

	this._r = r;
	this._type = WIDGET_TYPE.DATA;
	this._shape = null;
}

Node.prototype.draggable = function(){

	var ex=0, ey=0;
	var that = this;
	var start = function(){
		ex=0, ey=0;
	};
	var move = function(dx, dy){
		if(that._shape){			
			//that._shape.offset(dx-ex, dy-ey);
			that.offset(dx-ex, dy-ey);
		}
		ex = dx;
		ey = dy;
	}
	var end = function(){

	}

	if(this._shape){
		var element = this._shape.getElement();
		if(element){
			element.drag(move, start, end);
		}
	}
}

Node.prototype.undrag = function(){
	if(this._shape){
		this._shape.undrag();
	}
}

Node.prototype.getType = function(){
	return this._type;
}

Node.prototype.getID = function(){
	return this._shape ? this._shape.getID() : "";
}


Node.prototype.findSnap = function(x, y){
	return this._shape ? this._shape.findSnap(x, y) : null;
}

Node.prototype.getSnapPos = function(){
	return this._shape ? this._shape.getSnapPos() : [];
}

Node.prototype.startSnapping = function(){
	if(this._shape){
		this._shape.startSnapping();
	}
}

Node.prototype.stopSnapping = function(){
	if(this._shape){
		this._shape.stopSnapping();
	}
}