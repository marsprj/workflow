var Func = function(r, xmin, ymin, width, height, round){

	Widget.apply(this, arguments);

	this._r = r;
	this._type = "function";
	this._xmin = xmin;
	this._ymin = ymin;

	this._width = width;
	this._height = height;
	this._round = round ? round : 0;

	this._snaps = [];
	this._snapxy= [];
	this._snap_highlight = null;
	this._snap_r= 3;

	this._widget = this._r.rect(this._xmin, this._ymin, this._width, this._height, this._round);
	this._widget.attr(
		"fill", "#f00",
		"stroke", "#fff"
	);
	this._id = this._widget.id;

	var that = this;
	var onmousemove = function(evt){
		var index = that.findSnap(evt.offsetX, evt.offsetY);
		if(index){
			console.log("[snap]:" + index);
		}
	}
	this._widget.hover(
		function(evt){		//hover in
			that.showSnap();

			var container = $("#canvas");
			container.on("mousemove", onmousemove);

		},
		function(evt){		//hover out
			that.hideSnap();
			var container = $("#canvas");
			container.unbind("mousemove", onmousemove);
		}
	);
}

extend(Func, Widget);

Func.prototype.showSnap = function(){
	var sx = this._width  / 4;
	var sy = this._height / 4;
	var xmax = this._xmin + this._width;
	var ymax = this._ymin + this._height;

	this._snapxy = [
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

	var that = this;
	this._snaps.length = 0;
	this._snapxy.forEach(function(s){
		var c = that._r.circle(s.x, s.y, that._snap_r).attr({
				"fill" : "#FFF",
				"stroke" : "#0F0"
			});		
		that._snaps.push(c);
	});
}

Func.prototype.hideSnap = function(){
	if(this._snap_highlight){
		this._snap_highlight.remove();
	}
	this._snaps.forEach(function(s){
		s.remove();
	})
	this._snaps.length = 0;
}

Func.prototype.findSnap = function(x, y){
	var threhold = 20;

	var length = this._snapxy.length;
	var dist = 0;
	var mind = 10000000;
	var index = -1;
	for(var i=0; i<length; i++){
		var xy = this._snapxy[i];
		dist = Math.abs(xy.x-x) + Math.abs(xy.y-y);
		if(dist<mind){
			index = i;
			mind = dist;
		}
	}

	//if((index<0) ||(mind>threhold)){
	// if((index<0) ||(mind>threhold)){
	// 	if(this._snap_highlight){
	// 		this._snap_highlight.remove();
	// 	}
	// 	return undefined;
	// }

	if(this._snap_highlight){
		this._snap_highlight.remove();
	}
	var s = this._snapxy[index];
	this._snap_highlight = this._r.circle(s.x, s.y, this._snap_r).attr({
				"fill" : "#00F",
				"stroke" : "#0F0"
			});	

	return {
		x : s.x,
		y : s.y
	};
}
