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

	var that = this;
	this._widget.hover(
		function(evt){		//hover in
			var container = $("#canvas");

			var onmousemove = function(evt){	
				connection.update(start_x, start_y, evt.offsetX, evt.offsetY);
			}

			var onmouseup = function(evt){

				//重置连接状态为NONE
				g_connect_state = CONNECT_STATE.NONE;
				connection.remove();

				var target = R.getElementByPoint(evt.pageX, evt.pageY);
				if(target){
					connection = new Arrow(R, start_x, start_y, evt.offsetX, evt.offsetY);
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
				connection = new Arrow(R, start_x, start_y, start_x, start_y);

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

extend(Data, Widget);

Data.prototype.getType = function(){
	alert(this._type);
}


Data.prototype.echo = function(){
	alert("Data");
}

Data.prototype.showSnap = function(){

	console.log("[Data]:show snap");
}

Data.prototype.hideSnap = function(){
	console.log("[Data]:hide snap");	
}

