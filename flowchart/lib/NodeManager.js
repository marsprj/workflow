var NodeManager = function(){

	this._instance = null;
	this._nodes = [];
}

NodeManager.prototype.createDataNode = function(r, xmin, ymin, xmax, ymax){

	var node = new DataNode(r, xmin, ymin, xmax, ymax);	
	//node.enableHover();

	this._nodes.push(node);
	return node;
}

NodeManager.prototype.createFuncNode = function(r, xmin, ymin, width, height, round){

	var node = new FuncNode(r, xmin, ymin, width, height, round);
	//node.enableHover();

	this._nodes.push(node);
	return node;
}

NodeManager.prototype.getNodeById = function(id){
	var len = this._nodes.length;
	for(var i=0; i<len; i++){
		var wid = this._nodes[i].getID();
		console.log(wid);
		
		if(this._nodes[i].getID() == id){
			return this._nodes[i];
		}
	}

	return null;
}

NodeManager.prototype.getDataNodes = function(){
	var nodes = [];
	this._nodes.forEach(function(n){
		if(n.getType() == NODE_TYPE.DATA){
			nodes.push(n);
		}
	})

	return nodes;
}


NodeManager.prototype.getFuncNodes = function(){
	var nodes = [];
	this._nodes.forEach(function(n){
		if(n.getType() == NODE_TYPE.FUNC){
			nodes.push(n);
		}
	})

	return nodes;
}

NodeManager.prototype.getFuncNode = function(){
	var count = this._nodes.length;
	for(var i=0; i<count; i++){
		if(this._nodes[i].getType() == NODE_TYPE.FUNC){
			return this._nodes[i];
		}
	}
		
	return null;
}

NodeManager.prototype.getNodes = function(){
	return this._nodes;
}

NodeManager.getInstance = function(){
	if(this._instance==null){
		this._instance = new NodeManager();
	}
	return this._instance;
}
