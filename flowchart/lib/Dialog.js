var Dialog = function(){

	this._win = this.create();
	this.initEvents();
}

Dialog.prototype.show = function(){
	$(this._win).css("display", "block");
}

Dialog.prototype.close = function(){
	$(this._win).css("display", "none");
}

Dialog.prototype.destory = function(){
	$(this._win).remove();
}

Dialog.prototype.initEvents = function(){
	// this.initFolderEvent();
	// this.initCloseEvent();
	// this.initOkEvent();
}