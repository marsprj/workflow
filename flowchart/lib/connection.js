/**
 * 连接线
 * @param startx {float}
 * @param starty {float}
 * @param endx {float}
 * @param endy {float}
 */
var Connection = function(r, startx, starty, endx, endy){

	this._id = "";
	this._r = r;
	this._arrow = new Arrow(r, startx, starty, endx, endy);

	this._from = null;
	this._to   = null;
}

Connection.prototype.getID = function(){
	return this._id;
}

Connection.prototype.setEnds = function(from, to){
	this._from = from;
	this._to   = to;
	this._id = this._from.getID() + "-" + this._to.getID();
}

Connection.prototype.setFrom = function(from){
	this._from = from;
}

Connection.prototype.getFrom = function(){
	return this._from;
}

Connection.prototype.setTo = function(to){
	this._to = to;
}

Connection.prototype.getTo = function(){
	return this._to;
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
