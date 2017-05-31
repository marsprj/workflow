var WidgetManager = function(){

	this._instance = null;
	this._widgets = [];
}

WidgetManager.prototype.createDataNode = function(r, xmin, ymin, xmax, ymax){

	var widget = new DataWidget(r, xmin, ymin, xmax, ymax);	
	//widget.enableHover();

	this._widgets.push(widget);
	return widget;
}

WidgetManager.prototype.createFuncNode = function(r, xmin, ymin, width, height, round){

	var widget = new FuncWidget(r, xmin, ymin, width, height, round);
	//widget.enableHover();

	this._widgets.push(widget);
	return widget;
}

WidgetManager.prototype.getWidgetById = function(id){
	var len = this._widgets.length;
	for(var i=0; i<len; i++){
		var wid = this._widgets[i].getID();
		console.log(wid);
		
		if(this._widgets[i].getID() == id){
			return this._widgets[i];
		}
	}

	return null;
}

WidgetManager.prototype.getDataNodes = function(){
	var nodes = [];
	this._widgets.forEach(function(n){
		if(n.getType() == NODE_TYPE.DATA){
			nodes.push(n);
		}
	})

	return nodes;
}


WidgetManager.prototype.getFuncNodes = function(){
	var nodes = [];
	this._widgets.forEach(function(n){
		if(n.getType() == NODE_TYPE.FUNC){
			nodes.push(n);
		}
	})

	return nodes;
}

WidgetManager.prototype.getFuncNode = function(){
	var count = this._widgets.length;
	for(var i=0; i<count; i++){
		if(this._widgets[i].getType() == NODE_TYPE.FUNC){
			return this._widgets[i];
		}
	}
		
	return null;
}

WidgetManager.getInstance = function(){
	if(this._instance==null){
		this._instance = new WidgetManager();
	}
	return this._instance;
}
