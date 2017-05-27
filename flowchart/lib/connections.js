var ConnectionManager = function(){

	this._instance = null;
	this._connections = [];
}

ConnectionManager.prototype.getConnectionById = function(id){
	var len = this._connections.length;
	for(var i=0; i<len; i++){
		if(this._connections[i]._id == id){
			return this._connections[i];
		}
	}

	return null;
}

ConnectionManager.prototype.add = function(connection){
	if(!connection){
		return false;
	}

	this._connections.push(connection);

	return true;
}

ConnectionManager.prototype.makeID = function(from, to){
	if(from && to){
		return from.getID() + "-" + to.getID();
	}
	return null;
}

ConnectionManager.getInstance = function(){
	if(this._instance==null){
		this._instance = new ConnectionManager();
	}
	return this._instance;
}
