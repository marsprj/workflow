input.hover(function(evt){

	var container = $("#canvas");

	var connection = null;
	var connection_path = null;
	var start_x=0, start_y=0;

	var onmousemove = function(evt){				
		connection_path = "M{sx} {sy}L{ex} {ey}"
					.replace("{sx}", start_x)
					.replace("{sy}", start_y)
					.replace("{ex}", evt.offsetX)
					.replace("{ey}", evt.offsetY);
		connection.attr({
				path: connection_path
			});

		console.log("mouse move");
	}

	var onmouseup = function(evt){

		//重置连接状态为NONE
		g_connect_state = CONNECT_STATE.NONE;
		connection.remove();

		var target = R.getElementByPoint(evt.pageX, evt.pageY);
		if(target){
			connection = R.path(connection_path)
						.attr({
							"stroke" : "#0000FF",
							"stroke-width" : 3,
							"stroke-linecapstring" : "round",
							"arrow-end" : "classic-wide-long"
						});
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
		connection_path = "M{sx} {sy}L{ex} {ey}"
					.replace("{sx}", start_x)
					.replace("{sy}", start_y)
					.replace("{ex}", evt.offsetX)
					.replace("{ey}", evt.offsetY);
		connection = R.path(connection_path)
						.attr({
							"stroke" : "#0000FF",
							"stroke-width" : 3,
							"stroke-linecapstring" : "round",
							"arrow-end" : "classic-wide-long"
						});

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
	
}, function(){
	switch(g_connect_state){
		case CONNECT_STATE.CONNECTING:{

		}break;
		default:{
			g_connect_state = CONNECT_STATE.NONE;
		}
	}
	
	console.log("[input]: connect clear");
});

input.click(function(evt){
	switch(g_connect_state){
		case CONNECT_STATE.READY:{
			//当前状态为Ready，再点鼠标时，开始绘制连接线
			// g_connect_state = CONNECT_STATE.CONNECTING;
			// start_x = evt.offsetX;
			// start_y = evt.offsetY;
			// connection_path = "M{sx} {sy}L{ex} {ey}"
			// 			.replace("{sx}", start_x)
			// 			.replace("{sy}", start_y)
			// 			.replace("{ex}", evt.offsetX)
			// 			.replace("{ey}", evt.offsetY);
			// connection = R.path(connection_path)
			// 				.attr({
			// 					"stroke" : "#0000FF",
			// 					"stroke-width" : 3,
			// 					"stroke-linecapstring" : "round"
			// 				});

		}
		break;
		case CONNECT_STATE.CONNECTING:{
		}
		break;
		case CONNECT_STATE.NONE:{
		}
		break;
	}
})