var FuncWidget = function(r, xmin, ymin, width, height){

	Widget.apply(this, arguments);

	this._r = r;
	this._type = "function";

	this._inputs = [];
	this._output = null;

	this._shape = new Rect(r, xmin, ymin, width, height);
	this._shape.initListener();
	this._shape.enableHover();
	this._shape.showText();
}

extend(FuncWidget, Widget);

FuncWidget.prototype.addInputEdge = function(input){
	if(input){
		this._inputs.push(input);
	}
}

FuncWidget.prototype.getInputs = function(){
	var inputs = [];
	this._inputs.forEach(function(e){
		var from = e.getFrom();
		if(from){
			inputs.push(from);
		}
	})

	return inputs;
}

FuncWidget.prototype.getOutputEdge = function(i){
	if( (i>0) || (i<this._inputs.length)){
		return this._inputs[i];
	}
	return null;
}

FuncWidget.prototype.setOutputEdge = function(output){
	this._output = output;
}

FuncWidget.prototype.getOutputEdge = function(){
	return this._output;
}

FuncWidget.prototype.getOutput = function(){
	if(this._output){
		return this._output.getTo();
	}
	return null;
}