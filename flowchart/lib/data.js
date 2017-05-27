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

	this._snaps = [];
	this._snapxy= [];
	this._snap_highlight = null;
	this._snap_r= 3;

	this._widget = this._r.ellipse(this._centerx, this._centery, this._a, this._b);
	this._widget.attr(
		"fill", "#0f0",
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

extend(Data, Widget);

Data.prototype.echo = function(){
	alert("Data");
}


Data.prototype.showSnap = function(){
	var sx = Math.abs(this._xmax - this._xmin) / 4;
	var sy = Math.abs(this._ymax - this._ymin) / 4;
	var xmax = this._xmax;
	var ymax = this._ymax;

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

Data.prototype.hideSnap = function(){
	if(this._snap_highlight){
		this._snap_highlight.remove();
	}
	this._snaps.forEach(function(s){
		s.remove();
	})
	this._snaps.length = 0;
}

Data.prototype.findSnap = function(x, y){
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
