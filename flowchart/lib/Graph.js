var Graph = function(r){

	this._r = r;
	this._edges = [];	//连接Datum和Func的边
	this._datum = [];	//数据节点
	this._funcs = [];	//函数节点

	this._workflow = [];
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

Graph.prototype.createDatumNode = function(xmin, ymin, xmax, ymax){
	var nodeManager = NodeManager.getInstance();
	var datum = nodeManager.createDataNode(this._r, xmin, ymin, xmax, ymax)
	return datum;
}

Graph.prototype.getData = function(){
	// var datumManager = NodeManager.getInstance();
	// return datumManager.getNodes();
	var nodeManager = NodeManager.getInstance();
	return nodeManager.getDataNodes();
}

Graph.prototype.createFuncNode = function(xmin, ymin, xmax, ymax){
	var nodeManager = NodeManager.getInstance();
	var func = nodeManager.createFuncNode(this._r, xmin, ymin, xmax, ymax)
	return func;
}

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