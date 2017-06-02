var Dialog = function(){

	this._win = this.create();
	this.initEvents();

	this._input = null;
	this._output = null;
}

Dialog.prototype.show = function(){
	$(this._win).css("display", "block");
}

Dialog.prototype.close = function(){
	$(this._win).css("display", "none");
}

Dialog.prototype.destory = function(){
	$(this._win).remove();
}

Dialog.prototype.initEvents = function(){
	
	//打开文件的点击事件
	this.initFolderEvent();
	this.initCloseEvent();
	this.initOkEvent();
}

Dialog.prototype.initFolderEvent = function(){

	this._win.find(".dialog_folder").each(function(){
		$(this).click(function(){
			$(this).prev().find('.dialog_input').each(function(){
				//设置输入影像数据路径的值
				$(this).attr("value", "/raster/001.tif");
			})

			$(this).prev().find('.dialog_output').each(function(){
				//设置输入影像数据路径的值
				$(this).attr("value", "/raster/002.tif");
			})
		});
	})	
}

Dialog.prototype.initCloseEvent = function(){
	var dlg = this;
	this._win.find(".dialog_exit:first").click(function(){
		dlg.destory();
	});

	this._win.find("#dlg_btn_exit:first").click(function(){
		dlg.destory();
	});
}

Dialog.prototype.initOkEvent = function(){
	var dlg = this;
	
	this._win.find("#dlg_btn_ok:first").click(function(){
		dlg._input  = dlg._win.find(".dialog_input:first").attr("value");
		dlg._output = dlg._win.find(".dialog_output:first").attr("value");
		dlg.destory();
	});
}


Dialog.prototype.getInput = function(){
	return this._input;
}

Dialog.prototype.create = function(){
	var html =   "<div id='func_dialog' class='func_dialog'>"
			+"<div class='titlebar'>"
			+"	<div class='dialog_title'>拉伸</div>"
			+"	<div class='dialog_exit'></div>"
			+"</div>"
			+"<div class='dialog_main'>"
			+"	<div class='dialog_item'>"
			+"		<div>"
			+"			<div class='dialog_item_icon'></div>"
			+"			<div class='dialog_item_title'>输入影像:</div>"
			+"		</div>"
			+"		<div>"
			+"			<div style='float:left;'><input type='text' class='dialog_input'></div>"
			+"			<div class='dialog_folder'></div>"
			+"		</div>"
			+"	</div>"
			+"	<div class='dialog_item'>"
			+"		<div>"
			+"			<div class='dialog_item_icon'></div>"
			+"			<div class='dialog_item_title'>输出影像:</div>"
			+"		</div>"
			+"		<div>"
			+"			<div style='float:left;'><input type='text' class='dialog_output'></div>"
			+"			<div class='dialog_folder'></div>"
			+"		</div>"
			+"	</div>"
			+"	<div class='dialog_bottom'>"
			+"		<ul>"
			+"			<li>"
			+"				<a href='javascript:void(0)' id='dlg_btn_ok'>确定</a>"
			+"			</li>"
			+"			<li>"
			+"				<a href='javascript:void(0)' id='dlg_btn_exit'>取消</a>"
			+"			</li>"
			+"		</ul>"
			+"	</div>"
			+"</div>";
	var dlg = $(html);
	$('body').append(dlg);
	return dlg;
}