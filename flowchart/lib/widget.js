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

Widget.prototype.getID = function(){
	return this._id;
}

Widget.prototype.echo = function(){
	alert("Widget");
}

Widget.prototype.enableHover = function(){
	var that = this;
	this._widget.hover(
		function(evt){		//hover in
			var container = $("#canvas");

			var onmousemove = function(evt){

				var from = that;
				var target = that._r.getElementByPoint(evt.pageX, evt.pageY);
				if(target){
					var manager = WidgetManager.getInstance();
					var to = manager.getWidgetById(target.id);
					if(from.getType() != to.getType()){
						var pos = to.findSnap(evt.offsetX, evt.offsetY);
						if(pos){
							connection.update(start_x, start_y, pos.x, pos.y);	
						}
						else{
							connection.update(start_x, start_y, evt.offsetX, evt.offsetY);	
						}
					}
					else{
						connection.update(start_x, start_y, evt.offsetX, evt.offsetY);		
					}
				}
				else{
					connection.update(start_x, start_y, evt.offsetX, evt.offsetY);	
				}				
			}

			var onmouseup = function(evt){
				//重置连接状态为NONE
				g_connect_state = CONNECT_STATE.NONE;
				connection.remove();

				var from = that;
				var target = that._r.getElementByPoint(evt.pageX, evt.pageY);
				if(target){
					var manager = WidgetManager.getInstance();
					var to = manager.getWidgetById(target.id);
					if(from.getType() != to.getType()){
						var conManager = ConnectionManager.getInstance()
						var id = conManager.makeID(from,to);
						var f  = conManager.getConnectionById(id);
						if(f){
							alert("连接已经存在，不能重复添加");
						}
						else{
							var end_x = evt.offsetX;
							var end_y = evt.offsetY;
							var pos = to.findSnap(evt.offsetX, evt.offsetY);
							if(pos){
								end_x = pos.x;
								end_y = pos.y;
							}
							connection = new Connection(that._r, start_x, start_y, end_x, end_y);
							connection.setEnds(from,to);	
							conManager.add(connection);

						}
					}
				}
				else{
					connection.remove();
				}

				console.log("mouse up");
				container.unbind("mousemove", onmousemove);
			}

			var onmousedown = function(evt){

				g_connect_state = CONNECT_STATE.CONNECTING;
				start_x = evt.offsetX;
				start_y = evt.offsetY;
				connection = new Connection(that._r, start_x, start_y, start_x, start_y);

				//注册鼠标移动事件
				container.on("mousemove", onmousemove);
				console.log("mouse down");
			}

			switch(g_state)
			{
				case STATE.CONNECT:{
					if(g_connect_state!=CONNECT_STATE.CONNECTING){
						g_connect_state = CONNECT_STATE.READY;
						console.log("[input]: connect ready");

						//注册鼠标事件，之调用一次。
						container.one("mousedown", onmousedown);
						container.one("mouseup", onmouseup);
					}
				}
				break;
			}
		},
		function(evt){		//hover out
			that.hideSnap();
		}
	);
}


function extend(c, p) {

	var F = function(){};
　　　　F.prototype = p.prototype;
　　　　c.prototype = new F();
　　　　c.prototype.constructor = c;
　　　　c.uber = p.prototype;
　
}