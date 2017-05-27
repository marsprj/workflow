var WidgetManager = function(){

	this._instance = null;
	this._widgets = [];
}

WidgetManager.prototype.newDataWidget = function(r, xmin, ymin, xmax, ymax){

	var widget = new Data(r, xmin, ymin, xmax, ymax);	
	widget.enableHover();

	this._widgets.push(widget);
	return widget;
}

WidgetManager.prototype.newFuncWidget = function(r, xmin, ymin, width, height, round){

	var widget = new Func(r, xmin, ymin, width, height, round);
	widget.enableHover();

	this._widgets.push(widget);
	return widget;
}

WidgetManager.prototype.getWidgetById = function(id){
	var len = this._widgets.length;
	for(var i=0; i<len; i++){
		if(this._widgets[i]._id == id){
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
