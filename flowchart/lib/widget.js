function extend(c, p) {

	var F = function(){};
　　　　F.prototype = p.prototype;
　　　　c.prototype = new F();
　　　　c.prototype.constructor = c;
　　　　c.uber = p.prototype;
　
}

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
				//获取鼠标处的Element
				var target = that._r.getElementByPoint(evt.pageX, evt.pageY);
				if(target){
					var manager = WidgetManager.getInstance();
					//获取Element所对应的Widget
					var to = manager.getWidgetById(target.id);
					if(from.getType() != to.getType()){
						//相同类型的Widget不允许相连，例如两个Data连接起来没有意义
						//寻找snap
						var pos = to.findSnap(evt.offsetX, evt.offsetY);
						if(pos){
							//如果找到snap，则返回该snap的坐标，箭头自动连接到该snap
							connection.update(start_x, start_y, pos.x, pos.y);	
						}
						else{
							//否则，则用鼠标点出的坐标更新箭头。
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
				// start_x = evt.offsetX;
				// start_y = evt.offsetY;
				var pos = that.findSnap(evt.offsetX, evt.offsetY);
				start_x = pos.x;
				start_y = pos.y;
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

Widget.prototype.getSnapPos = function(){
	
}

Widget.prototype.showSnap = function(){
	this._snapxy = this.getSnapPos();
	
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

Widget.prototype.hideSnap = function(){
	if(this._snap_highlight){
		this._snap_highlight.remove();
	}
	this._snaps.forEach(function(s){
		s.remove();
	})
	this._snaps.length = 0;
}

Widget.prototype.findSnap = function(x, y){
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
