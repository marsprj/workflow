/**
 * 连接线
 * @param startx {float}
 * @param starty {float}
 * @param endx {float}
 * @param endy {float}
 */
var Connection = function(r, startx, starty, endx, endy){

	this._r = r;
	this._arrow = new Arrow(r, startx, starty, endx, endy);

	this._from = null;
	this._to   = null;
}

Connection.prototype.setFrom = function(from){
	this._from = from;
}

Connection.prototype.setTo = function(to){
	this._to = to;
}

Connection.prototype.update = function(startx, starty, endx, endy){

	if(this._arrow){
		this._arrow.update(startx, starty, endx, endy);
	}
}

Connection.prototype.remove = function(){
	if(this._arrow){
		this._arrow.remove();
	}
}
