// func.hover(function(evt){
// 	switch(g_state)
// 	{
// 		case STATE.CONNECT:{
// 			if(g_connect_state!=CONNECT_STATE.CONNECTING){
// 				g_connect_state = CONNECT_STATE.READY;	
// 				console.log("[func]: connect ready");
// 			}
// 		}
// 		break;
// 	}
	
// }, function(){
// 	switch(g_connect_state){
// 		case CONNECT_STATE.CONNECTING:{

// 		}break;
// 		default:{
// 			g_connect_state = CONNECT_STATE.NONE;
// 		}
// 	}
	
// 	console.log("[func]: connect clear");
// });

func.click(function(evt){
	switch(g_connect_state){
		case CONNECT_STATE.READY:{
			//当前状态为Ready，再点鼠标时，开始绘制连接线
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
								"stroke-linecapstring" : "round"
							});

		}
		break;
		case CONNECT_STATE.CONNECTING:{
			g_connect_state = CONNECT_STATE.NONE;
		}
		break;
		case CONNECT_STATE.NONE:{
		}
		break;
	}
})