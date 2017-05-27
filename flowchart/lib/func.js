var Func = function(r, xmin, ymin, width, height, round){

	Widget.apply(this, arguments);

	this._r = r;
	this._type = "function";
	this._xmin = xmin;
	this._ymin = ymin;

	this._width = width;
	this._height = height;
	this._round = round ? round : 0;

	this._set = null;

	this._widget = this._r.rect(this._xmin, this._ymin, this._width, this._height, this._round);
	this._widget.attr(
		"fill", "#f00",
		"stroke", "#fff"
	);
	this._id = this._widget.id;

	var that = this;
	this._widget.hover(
		function(evt){		//hover in
			that.showSnap();
		},
		function(evt){		//hover out
			that.hideSnap();
		}
	);
}

extend(Func, Widget);

Func.prototype.showSnap = function(){
	
	console.log("[Data]:show snap");
}

Func.prototype.hideSnap = function(){
	console.log("[Data]:hide snap");	
}

