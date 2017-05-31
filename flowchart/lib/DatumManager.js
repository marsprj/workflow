var DatumManager = function(){

	this._nodes = [];
}

DatumManager.prototype.createDatumNode = function(r, xmin, ymin, xmax, ymax){
	var datum = new DataWidget(r, xmin, ymin, xmax, ymax);	
	//widget.enableHover();

	this._nodes.push(datum);
	return datum;
}

DatumManager.prototype.getNodes = function(){
	return this._nodes;
}

DatumManager.getInstance = function(){
	if(this._instance==null){
		this._instance = new DatumManager();
	}
	return this._instance;
}


DatumManager.prototype.getNodeById = function(id){
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