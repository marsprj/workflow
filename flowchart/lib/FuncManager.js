var FuncManager = function(){

	this._nodes = [];
}

FuncManager.prototype.createFuncNode = function(r, xmin, ymin, xmax, ymax){
	var func = new FuncWidget(r, xmin, ymin, xmax, ymax);	
	//widget.enableHover();

	this._nodes.push(func);
	return func;
}

FuncManager.prototype.getNodes = function(){
	return this._nodes;
}

FuncManager.getInstance = function(){
	if(this._instance==null){
		this._instance = new FuncManager();
	}
	return this._instance;
}

FuncManager.prototype.getNodeById = function(id){
	var count = this._nodes.length;
	for(var i=0; i<count; i++){
		var n = this._nodes[i];
		var nid = n.getID();
		if(nid == id){
			return n;
		}
	}
	return null;
}