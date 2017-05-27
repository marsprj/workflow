var Data = function(r, xmin, ymin, xmax, ymax){

	Widget.apply(this, arguments);

	this._r = r;
	this._type = "data";
	this._xmin = xmin;
	this._xmax = xmax;
	this._ymin = ymin;
	this._ymax = ymax;

	this._centerx = (xmin + xmax) / 2;
	this._centery = (ymin + ymax) / 2;
	this._a = Math.abs(xmax - xmin) / 2;
	this._b = Math.abs(ymax - ymin) / 2;

	this._set = null;

	this._widget = this._r.ellipse(this._centerx, this._centery, this._a, this._b);
	this._widget.attr(
		"fill", "#0f0",
		"stroke", "#fff"
	);
	this._id = this._widget.id;
}

extend(Data, Widget);

Data.prototype.echo = function(){
	alert("Data");
}

Data.prototype.showSnap = function(){

	console.log("[Data]:show snap");
}

Data.prototype.hideSnap = function(){
	console.log("[Data]:hide snap");	
}

