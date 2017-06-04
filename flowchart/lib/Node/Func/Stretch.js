var Stretch = function(){

	FuncNode.apply(this, arguments);

	this._name = "Stretch";

	var that = this;
	this._shape.dblclick(function(){
		var dlg = new StretchDialog(function(){	//onOK
			alert(dlg.getInput());
			alert(dlg.getOutput());
		});
		dlg.show();
	});
}

extend(Stretch, FuncNode);