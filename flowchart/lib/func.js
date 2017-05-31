var Func = function(){

	this._inputs = [];
	this._input_count = 0;
	this._output = null;
	this._operator = "";

	this._input_connections = [];
}

Func.prototype.getInputCount = function(){
	return this._input_count;
}

Func.prototype.getOperator = function(){
	return this._operator;
}

Func.prototype.getInput = function(i){
	return this._inputs[i];
}

Func.prototype.getOutput = function(){
	return this._output;
}

Func.prototype.getInputConnection = function(i){
	return this._input_connections[i];
}

Function.prototype.addInput = function(connection){
	if(connection){
		this._input_connections.push(connection);	
	}
}

Function.prototype.removeInput = function(connection){
	if(!connection){
		return;
	}

	var count = this._input_connections.length;
	for(var i=0; i<count; i++){
		var c = this._input_connections[i];
		if(c.getID() == connection.getID){
			this._input_connections.splice(i, 1);
			return;
		}
	}
}