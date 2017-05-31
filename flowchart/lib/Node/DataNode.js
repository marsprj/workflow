var DataNode = function(r, xmin, ymin, width, height){

	Node.apply(this, arguments);

	this._r = r;
	this._type = "data";

	this._shape = new Ellipse(r, xmin, ymin, width, height);
	this._id = this._shape.getID();

	//this._shape.initListener();
	//this._shape.enableHover();
	this._shape.showText();

	this._from = null;
	this._to   = null;
}

extend(DataNode, Node);

DataNode.prototype.setFromEdge = function(from){
	this._from = from;
}

DataNode.prototype.getFromEdge = function(){
	return this._from;
}

DataNode.prototype.getFrom = function(){
	if(this._from){
		return this._from.getFrom();
	}
	return null;
}

DataNode.prototype.setToEdge = function(to){
	this._to = to;
}

DataNode.prototype.getToEdge = function(){
	return this._to;
}

DataNode.prototype.getTo = function(){
	if(this._to){
		return this._to.getTo();
	}
	return null;
}

DataNode.prototype.offset = function(dx, dy){
	if(this._shape){
		this._shape.offset(dx, dy);
	}
	if(this._from){
		this._from.offsetEnd(dx, dy);
	}
	if(this._to){
		this._to.offsetStart(dx, dy);
	}
}

// DataNode.prototype.draggable = function(){

// 	// var ox, oy;
// 	var nowX, nowY;
// 	var that = this;
// 	var start = function(){
// 		// ox = this.attr("cx");
// 		// oy = this.attr("cy");
// 	};
// 	var move = function(dx, dy){
// 		if(that._shape){			
// 			that._shape.offset(dx-ex, dy-ey);
// 		}
// 		ex = dx;
// 		ey = dy;
// 	}
// 	var end = function(){

// 	}

// 	if(this._shape){
// 		var element = this._shape.getElement();
// 		if(element){
// 			element.drag(move, start, end);
// 		}
// 	}
// }