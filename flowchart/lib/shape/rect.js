var Rect = function(r, xmin, ymin, width, height){

	Widget.apply(this, arguments);

	this._r = r;
	this._type = "function";
	this._xmin = xmin;
	this._ymin = ymin;
	this._xmax = xmin + width;
	this._ymax = ymin + height;

	this._width = width;
	this._height = height;
	this._round = 5;

	this._snaps = [];
	this._snapxy= [];
	this._snap_highlight = null;
	this._snap_r= 3;

	this._shape = this._r.rect(this._xmin, this._ymin, this._width, this._height, this._round);
	this._shape.attr(
		"fill", "#f00",
		"stroke", "#fff"
	);
	this._id = this._shape.id;
}

extend(Rect, Shape);

Rect.prototype.echo = function(){
	alert("Rect");
}

Rect.prototype.getSnapPos = function(){
	var sx = this._width  / 4;
	var sy = this._height / 4;
	var xmax = this._xmin + this._width;
	var ymax = this._ymin + this._height;

	return [
		//{ x: 	this._xmin		 ,	y: 	this._ymin},
		{ x: 	this._xmin + sx*1,	y: 	this._ymin},
		{ x: 	this._xmin + sx*2,	y: 	this._ymin},
		{ x: 	this._xmin + sx*3,	y: 	this._ymin},
		//{ x: 	xmax		 	 ,	y: 	this._ymin},

		//{ x: 	this._xmin		 ,	y: 	ymax},
		{ x: 	this._xmin + sx*1,	y: 	ymax},
		{ x: 	this._xmin + sx*2,	y: 	ymax},
		{ x: 	this._xmin + sx*3,	y: 	ymax},
		//{ x: 	xmax		 	 ,	y: 	ymax},

		{ x: 	this._xmin		 ,	y: 	this._ymin + sy},
		{ x: 	this._xmin		 ,	y: 	this._ymin + sy*2},
		{ x: 	this._xmin		 ,	y: 	this._ymin + sy*3},

		{ x: 	xmax		 	 ,	y: 	this._ymin + sy},
		{ x: 	xmax		 	 ,	y: 	this._ymin + sy*2},
		{ x: 	xmax		 	 ,	y: 	this._ymin + sy*3}
	];
}
