var GRAPH_STATE = {
	ADDDATA : "addData",
	ADDFUNC : "addfunc",
	NONE : "none"
}

var FUNCTION_TYPE = {
	Stretch : "Stretch",
	Fusion  : "Fusion"
}

var Graph = function(container_id){

	this._container_id = container_id;
	this._width = $("#" + this._container_id).width();
	this._height = $("#" + this._container_id).height();
	this._r = Raphael(this._container_id, this._width, this._height);

	this._state = GRAPH_STATE.NONE;
	this._dragging = false;

	this._workflow = [];

	this._selected_node = null;
	this._start_node = null;
	this._end_node = null;
	this._connection = null;
	this._conn_start = {
		x : 0,
		y : 0
	};
	this._conn_end = {
		x : 0,
		y : 0
	};

	this._onmousedown = null;
	this._onmousemove = null;
	this._onmouseup   = null;

	var that = this;
	this._onNodeSelectChanged = function(node){
		that._selected_node = node;
		
		console.log("[nde]:" + (node ? node.getID() : "nothing"));
	};
}

Graph.prototype.getState = function(){
	return this._state;
}

Graph.prototype.setState = function(state){
	this._state = state;
}

/*
 * 序列化workflow，形成可以执行的
 */
Graph.prototype.serialize = function(){
	var tail = this.findLastFunction();
	//由最后一个FuncNode向上回溯

	this._workflow = [tail];	
	this.populateParentFunc(tail, this._workflow);
}

Graph.prototype.load = function(model){

	//

}

Graph.prototype.export = function(){
	
	var tail = this.findLastFunction();

	/**
	 * 1. model由一系列的function构成
	 * 2. 每个function由三个参数构成
	 * 	  1) inputs: 输入
	 * 	  	         输入是一个集合，一个function可能有多个input
	 * 	  	         input有两个来源
	 * 	  	         <1> function的输出
	 * 	  	         <2> data本身
	 * 	  2) output: 输出
	 * 	  			 一个Data节点
	 * 	  3) params: 参数
	 * 	  			 一些参数，例如buffer需要设置半径
	 * @type {Object}
	 */
	var model = {
		name : "this model",
		functions:[{
			input : []
		}
		],
		data:[
		],
		model:{

		}
	};

	return JSON.stringify(model);
}

// Graph.prototype.export = function(){
	
// 	this.serialize();

// 	var wf = [];

// 	for(var i=this._workflow.length-1; i>=0; i--){
// 		var node = this._workflow[i];		
// 		var func = {
// 			id : node.getID(),
// 			type : node.getType(),
// 			name : node.getName(),
// 			inputs : [],
// 			output : null
// 		}
// 		var inputs = node.getInputs();
// 		inputs.forEach(function(n){
// 			var inp = {
// 				id : n.getID(),
// 				type : n.getType(),
// 				name : node.getName(),
// 			}
// 			func.inputs.push(inp);
// 		})
// 		var output = node.getOutput();
// 		if(output){
// 			var oup = {
// 				id : output.getID(),
// 				type : output.getType(),	
// 				name : node.getName(),
// 			}
// 			func.output = oup;	
// 		}
// 		wf.push(func);
// 	}

// 	return JSON.stringify(wf);
// }

Graph.prototype.populateParentFunc = function(func, stack){
	var that = this;
	var inputs = func.getInputs();
	inputs.forEach(function(datum){
		var from_func = datum.getFrom();
		if(from_func){
			stack.push(from_func);
			that.populateParentFunc(from_func, stack);
		}
	})
}

Graph.prototype.getWorkflowText = function(){
	var text = "";
	for(var i=this._workflow.length-1; i>=0; i--){
		text += this._workflow[i].getID();
		if(i>0){
			text += " --> ";
		}
	}
	return text;
}

Graph.prototype.draggable = function(){

	this._dragging = true;

	// var edges = this.getEdges();
	// edges.forEach(function(e){
	// 	e.draggable();
	// })

	var data = this.getData();
	data.forEach(function(d){
		d.draggable();
	})

	var funcs = this.getFunctions();
	funcs.forEach(function(f){
		f.draggable();
	})
}

Graph.prototype.undrag = function(){
	this._dragging = false;

	// var edges = this.getEdges();
	// edges.forEach(function(e){
	// 	e.undrag();
	// })

	var data = this.getData();
	data.forEach(function(d){
		d.undrag();
	})

	var funcs = this.getFunctions();
	funcs.forEach(function(f){
		f.undrag();
	})
}

Graph.prototype.getEdges = function(){
	var edgeManager = ConnectionManager.getInstance();
	return edgeManager.getConnections();
}

Graph.prototype.createDatumNode = function(centerx, centery, width, height){

	var w = width  ?  width : 100;
	var h = height ? height :  50;
	var xmin = centerx - w / 2;
	var ymin = centery - h / 2;

	var nodeManager = NodeManager.getInstance();
	var datum = nodeManager.createDataNode(this._r, xmin, ymin, w, h);

	if(this._dragging){
		datum.draggable();
	}

	return datum;
}

Graph.prototype.getData = function(){
	// var datumManager = NodeManager.getInstance();
	// return datumManager.getNodes();
	var nodeManager = NodeManager.getInstance();
	return nodeManager.getDataNodes();
}

Graph.prototype.createFuncNode = function(type, centerx, centery, width, height){

	var w = width  ?  width : 100;
	var h = height ? height :  50;
	var xmin = centerx - w / 2;
	var ymin = centery - h / 2;

	var nodeManager = NodeManager.getInstance();
	var func = nodeManager.createFuncNode(type, this._r, xmin, ymin, w, h);

	if(this._dragging){
		func.draggable();
	}
	return func;
}

// Graph.prototype.createFuncNode = function(type, centerx, centery, width, height){

// 	var w = width  ?  width : 100;
// 	var h = height ? height :  50;
// 	var xmin = centerx - w / 2;
// 	var ymin = centery - h / 2;

// 	var nodeManager = NodeManager.getInstance();
// 	var func = nodeManager.createFuncNode(type, this._r, xmin, ymin, w, h);
// 	return func;
// }

// Graph.prototype.createStretchNode = function(centerx, centery, width, height){

// 	var w = width  ?  width : 100;
// 	var h = height ? height :  50;
// 	var xmin = centerx - w / 2;
// 	var ymin = centery - h / 2;

// 	var nodeManager = NodeManager.getInstance();
// 	var func = nodeManager.createStretchNode(this._r, xmin, ymin, w, h);
// 	return func;
// }

Graph.prototype.getFunctions = function(){
	// var funcManager = FuncManager.getInstance();
	// return funcManager.getNodes();
	var nodeManager = NodeManager.getInstance();
	return nodeManager.getFuncNodes();
}

Graph.prototype.createEdge = function(from, to){
	var edgeManager = ConnectionManager.getInstance();
	var edge = edgeManager.createConnection(this._r, from, to);

	switch(from.getType()){
		case NODE_TYPE.DATA:{
			from.setToEdge(edge);
		}
		break;
		case NODE_TYPE.FUNC:{
			from.setOutputEdge(edge);
		}
		break;
	}

	switch(to.getType()){
		case NODE_TYPE.DATA:{
			to.setFromEdge(edge);
		}
		break;
		case NODE_TYPE.FUNC:{
			to.addInputEdge(edge);
		}
		break;	
	}
	return edge;
}

Graph.prototype.startSnapping = function(){
	var nodeManger = NodeManager.getInstance();
	var nodes = nodeManger.getNodes();
	nodes.forEach(function(n){
		n.startSnapping();
		n.startConnecting();
	})
}

Graph.prototype.stopSnapping = function(){
	var nodeManger = NodeManager.getInstance();
	var nodes = nodeManger.getNodes();
	nodes.forEach(function(n){
		n.stopSnapping();
		n.stopConnecting();
	})	
}

// Graph.prototype.startConnecting = function(){

// 	var that = this;
// 	var nodeManger = NodeManager.getInstance();
// 	var nodes = nodeManger.getNodes();
// 	nodes.forEach(function(n){
// 		n.startSnapping();
// 		n.startConnecting(that._onNodeSelectChanged);
// 	})
// }

// Graph.prototype.stopConnecting = function(){
// 	var nodeManger = NodeManager.getInstance();
// 	var nodes = nodeManger.getNodes();
// 	nodes.forEach(function(n){
// 		n.stopConnecting();
// 		n.stopSnapping();
// 	})	
// }

Graph.prototype.startConnecting = function(){
	this.startSnapping();
	// start node connecting
	var that = this;
	var nodeManger = NodeManager.getInstance();
	var nodes = nodeManger.getNodes();
	nodes.forEach(function(n){
		n.startSnapping();
		n.startConnecting(that._onNodeSelectChanged);
	})

	this._onmousedown = function(evt){
		console.log("[graph]:down");
		if(!that._start_node){
			var node = that.getSelectedNode();
			if(node){
				that._start_node = node;			
				that._conn_start = node.findSnap(evt.offsetX, evt.offsetY);
				that._conn_end   = that._conn_start;
				that._connection = new Connection(that._r, that._conn_start.x, that._conn_start.y
														 , that._conn_end.x,   that._conn_end.y);
			}
		}
			
	};

	this._onmousemove = function(evt){
		console.log("[graph]:move");

		if(that._start_node){
			var node = that.getSelectedNode();
			if(node){
				//捕捉到终点
				if(node.getID() == that._start_node.getID()){
					that._connection.update(that._conn_start.x, that._conn_start.y, 
											evt.offsetX, 		evt.offsetY);
				}
				else{
					that._conn_end = node.findSnap(evt.offsetX, evt.offsetY);
					that._end_node = node;
					that._connection.update(that._conn_start.x, that._conn_start.y,
										    that._conn_end.x,   that._conn_end.y);
				}
			}
			else{
				//未捕捉到终点
				if(that._connection){
					that._connection.update(that._conn_start.x, that._conn_start.y, 
											evt.offsetX, 		evt.offsetY);	
				}
			}
		}
	};

	this._onmouseup = function(evt){
		if(that._start_node){
			var node = that.getSelectedNode();
			if(node){
				if(node.getID() == that._start_node.getID()){
					that._connection.remove();
					that._connection = null;
				}
				else if(node.getType() == that._start_node.getType()){
					that._connection.update(that._conn_start.x, that._conn_start.y, 
											evt.offsetX, 		evt.offsetY);

				}
				else{
					that._connection.remove();
					that._end_node = node;				
					
					var conManager = ConnectionManager.getInstance();
					var id = conManager.makeID(that._start_node, that._end_node);
					var c = conManager.getConnectionById(id);
					if(c){
						alert("连接已经存在，不能重复添加");
					}
					else{
						that._conn_end = node.findSnap(evt.offsetX, evt.offsetY);
						that._connection = new Connection(that._r, that._conn_start.x, that._conn_start.y
														 	 	 , that._conn_end.x,   that._conn_end.y);
						that._connection.setEnds(that._start_node, that._end_node);
						conManager.add(that._connection);
					}
				}
			}else{
				that._connection.remove();
				that._connection = null;
			}
		}
		that._connection = null;
		that._start_node = null;
		that._end_node   = null;
	};

	// add event listener
	$("#"+this._container_id).on("mousedown", this._onmousedown);
	$("#"+this._container_id).on("mousemove", this._onmousemove);
	$("#"+this._container_id).on("mouseup",   this._onmouseup);
}

Graph.prototype.stopConnecting = function(){
	this.stopSnapping();
	// stop node connecting
	var nodeManger = NodeManager.getInstance();
	var nodes = nodeManger.getNodes();
	nodes.forEach(function(n){
		n.stopConnecting();
		n.stopSnapping();
	})

	//unbind listener
	$("#"+this._container_id).unbind("mousedown", this.onMouseDown);
	$("#"+this._container_id).unbind("mousemove", this.onMouseMove);
	$("#"+this._container_id).unbind("mouseup",   this.onMouseUp);	
}

Graph.prototype.onMouseDown = function(evt){
	console.log("[graph]:down");

	var node = this.getSelectedNode();
	if(node){
		this._start_node = node;
		this._conn_start = node.findSnap(evt.offsetX, evt.offsetY);
		this._connection = new Connection(this._r, this._conn_start.x, this._conn_start.y
												 , this._conn_end.x,   this._conn_end.y);
	}
}

Graph.prototype.onMouseMove = function(evt){
	console.log("[graph]:move");

	var node = this.getSelectedNode();
	if(node){
		//捕捉到终点
	}
	else{
		//未捕捉到终点
		if(this._connection){
			this._connection.update(this._conn_start.x, this._conn_start.y, 
									evt.offsetX, evt.offsetY);	
		}
	}
}

Graph.prototype.onMouseUp = function(evt){
	console.log("[graph]:up");
}

// Graph.prototype.onNodeSelectChanged = function(node){
// 	this._selected_node = node;
	
// 	console.log("[nde]:" + (node ? node.getID() : "nothing"));
// }

Graph.prototype.getSelectedNode = function(){
	return this._selected_node;
}

Graph.prototype.findLastFunction = function(){
	var last = null;
	var funcs = this.getFunctions();

	if(funcs.length==0){
		// Graph上没有function节点
		return null;
	}

	var last = funcs[0];
	while(true){
		var output = last.getOutput();
		console.log(last.getID());
		if(!output){
			break;
		}
		else{
			var to = output.getTo();	// get to node
			if(!to){				
				break;
			}
			else{
				last = to;
			}
		}
	}

	return last;
}

