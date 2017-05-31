/**
 * 连接线
 * @param startx {float}
 * @param starty {float}
 * @param endx {float}
 * @param endy {float}
 */
var Arrow = function(r, startx, starty, endx, endy){

	this._r = r;
	//Position of Arrow
	this._startx = startx;
	this._starty = starty;
	this._endx   = endx;
	this._endy   = endy;
	if( (Math.abs(startx-endx) + Math.abs(starty-endy))<4){
		endx += 2;
		endy += 2;
	}

	//style of arrow
	this._stroke = {
		color: "#0000FF",
		width : 2,
		linecap : "round"
	};
	this._arrow_end = "classic-wide-long";

	//path of arrow
	this._path = "M{sx} {sy}L{ex} {ey}"
					.replace("{sx}", this._startx)
					.replace("{sy}", this._starty)
					.replace("{ex}", this._endx)
					.replace("{ey}", this._endy);
	//console.log(this._path);
	//create arrow line object
	this._line = this._r.path(this._path)
						.attr({
							"stroke" : this._stroke.color,
							"stroke-width" : this._stroke.width,
							"stroke-linecapstring" : this._stroke.linecap,
							"arrow-end" : this._arrow_end
						});
}

Arrow.prototype.update = function(startx, starty, endx, endy){

	this._startx = startx;
	this._starty = starty;
	this._endx   = endx;
	this._endy   = endy;

	this._path = "M{sx} {sy}L{ex} {ey}"
					.replace("{sx}", this._startx)
					.replace("{sy}", this._starty)
					.replace("{ex}", this._endx)
					.replace("{ey}", this._endy);
	//console.log(this._path);
	this._line.attr({
				path: this._path
			});
}

Arrow.prototype.offsetStart = function(dx, dy){

	this._startx += dx;
	this._starty += dy;

	this._path = "M{sx} {sy}L{ex} {ey}"
					.replace("{sx}", this._startx)
					.replace("{sy}", this._starty)
					.replace("{ex}", this._endx)
					.replace("{ey}", this._endy);
	//console.log(this._path);
	this._line.attr({
				path: this._path
			});
}

Arrow.prototype.offsetEnd = function(dx, dy){

	this._endx   += dx;
	this._endy   += dy;

	this._path = "M{sx} {sy}L{ex} {ey}"
					.replace("{sx}", this._startx)
					.replace("{sy}", this._starty)
					.replace("{ex}", this._endx)
					.replace("{ey}", this._endy);
	//console.log(this._path);
	this._line.attr({
				path: this._path
			});
}


Arrow.prototype.remove = function(){
	if(this._line){
		this._line.remove();
	}
}
