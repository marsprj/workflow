var Fusion = function(){

	FuncNode.apply(this, arguments);

	this._name = "Fusion";

	var that = this;
	this._shape.dblclick(function(){
		var dlg = new FusionDialog(function(){	//onOK
			alert(dlg.getInput());
			alert(dlg.getOutput());
		});
		dlg.show();
	});
}

Fusion.prototype.updateInputNode = function(path){

	var text = "";
	var sep = path.lastIndexOf("/");
	if(sep>0){
		text = path.substring(sep);
	}
	
}

extend(Fusion, FuncNode);