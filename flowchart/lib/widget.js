var Widget = function(r){

	this._r = r;
	this._type = "data";
	this._widget = null;
	this._id = "";
}

Widget.prototype.remove = function(){
	if(this._line){
		this._line.remove();
	}
}

Widget.prototype.hover_in = function(){
	//console.log("widget hover in");
	this.showSnap();
}

Widget.prototype.hover_out = function(){
	//console.log("widget hover out");
	this.hideSnap();
}

Widget.prototype.showSnap = function(){

}

Widget.prototype.hideSnap = function(){
	
}

Widget.prototype.undrag = function(){
	if(this._widget){
		this._widget.undrag();
	}
}

Widget.prototype.getType = function(){
	return this._type;
}

Widget.prototype.echo = function(){
	alert("Widget");
}



function extend(c, p) {

	var F = function(){};
　　　　F.prototype = p.prototype;
　　　　c.prototype = new F();
　　　　c.prototype.constructor = c;
　　　　c.uber = p.prototype;
　
}