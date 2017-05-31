var FuncNode = function(r, xmin, ymin, width, height){

	Node.apply(this, arguments);

	this._r = r;
	this._type = "function";

	this._inputs = [];
	this._output = null;

	this._shape = new Rect(r, xmin, ymin, width, height);
	//this._shape.initListener();
	//this._shape.enableHover();
	this._shape.showText();
}

extend(FuncNode, Node);

FuncNode.prototype.addInputEdge = function(input){
	if(input){
		this._inputs.push(input);
	}
}

FuncNode.prototype.getInputs = function(){
	var inputs = [];
	this._inputs.forEach(function(e){
		var from = e.getFrom();
		if(from){
			inputs.push(from);
		}
	})

	return inputs;
}

FuncNode.prototype.getOutputEdge = function(i){
	if( (i>0) || (i<this._inputs.length)){
		return this._inputs[i];
	}
	return null;
}

FuncNode.prototype.setOutputEdge = function(output){
	this._output = output;
}

FuncNode.prototype.getOutputEdge = function(){
	return this._output;
}

FuncNode.prototype.getOutput = function(){
	if(this._output){
		return this._output.getTo();
	}
	return null;
}


FuncNode.prototype.offset = function(dx, dy){
	if(this._shape){
		this._shape.offset(dx, dy);
	}

	this._inputs.forEach(function(c){
		c.offsetEnd(dx, dy);
	})
	if(this._output){
		this._output.offsetStart(dx, dy);
	}
}