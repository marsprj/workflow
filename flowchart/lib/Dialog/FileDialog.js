var FileDialog = function(){

	Dialog.apply(this, arguments);

	this._input = null;
	this._output = null;
}

extend(FileDialog, Dialog)

FileDialog.prototype.initEvents = function(){
	
	//打开文件的点击事件
	this.initFolderEvent();
	this.initCloseEvent();
	this.initOkEvent();
}


FileDialog.prototype.initFolderEvent = function(){

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

FileDialog.prototype.initCloseEvent = function(){
	var dlg = this;
	this._win.find(".dialog_exit:first").click(function(){
		dlg.destory();
	});

	this._win.find("#dlg_btn_exit:first").click(function(){
		dlg.destory();
	});
}

FileDialog.prototype.initOkEvent = function(){
	var dlg = this;
	
	this._win.find("#dlg_btn_ok:first").click(function(){
		dlg._input  = dlg._win.find(".dialog_input:first").attr("value");
		dlg._output = dlg._win.find(".dialog_output:first").attr("value");
		dlg.destory();
	});
}


FileDialog.prototype.getInput = function(){
	return this._input;
}


FileDialog.prototype.create = function(){
	var html = "<div class='func_dialog file_dialog'>"
			+"	<div class='titlebar'>"
			+"		<div class='dialog_title'>文件</div>"
			+"		<div class='dialog_exit'></div>"
			+"	</div>"
			+"	<div class='dialog_main'>"
			+"		<div class='dialog_file_path_wrapper'>"
			+"			<span>路径:</span>"
			+"			<input type='text' class='dialog_folder_path' readonly='readonly'>"
			+"			<div class='dialog_folder_up'></div>"
			+"		</div>"
			+"		<div class='dialog_file_ctrl'>"
			+"			<ul>"
			+"				<li>"
			+"					<div class='item_container'>"
			+"						<div class='folder_item_icon'></div>"
			+"						<div class='folder_item_text'>raster</div>"
			+"					</div>"
			+"					<div class='item_container'>"
			+"						<div class='folder_item_icon'></div>"
			+"						<div class='folder_item_text'>dem</div>"
			+"					</div>"
			+"					<div class='item_container'>"
			+"						<div class='folder_item_icon'></div>"
			+"						<div class='folder_item_text'>world-2.tif</div>"
			+"					</div>"
			+"					<div class='item_container'>"
			+"						<div class='folder_item_icon'></div>"
			+"						<div class='folder_item_text'>world-2.tif</div>"
			+"					</div>"
			+"					<div class='item_container'>"
			+"						<div class='folder_item_icon'></div>"
			+"						<div class='folder_item_text'>world-2.tif</div>"
			+"					</div>"
			+"				</li>"
			+"				<li>"
			+"					<div class='item_container'>"
			+"						<div class='file_item_icon'></div>"
			+"						<div class='folder_item_text'>raster</div>"
			+"					</div>"
			+"					<div class='item_container'>"
			+"						<div class='file_item_icon'></div>"
			+"						<div class='folder_item_text'>dem</div>"
			+"					</div>"
			+"					<div class='item_container'>"
			+"						<div class='file_item_icon'></div>"
			+"						<div class='folder_item_text'>world-2.tif</div>"
			+"					</div>"
			+"					<div class='item_container'>"
			+"						<div class='file_item_icon'></div>"
			+"						<div class='folder_item_text'>world-2.tif</div>"
			+"					</div>"
			+"					<div class='item_container'>"
			+"						<div class='file_item_icon'></div>"
			+"						<div class='folder_item_text'>world-2.tif</div>"
			+"					</div>"
			+"				</li>"
			+"			</ul>"
			+"		</div>"
			+"	</div>"
			+"	<div class='dialog_bottom'>"
			+"		<ul>"
			+"			<li>"
			+"				<a href='javascript:void(0)'>确定</a>"
			+"			</li>"
			+"			<li>"
			+"				<a href='javascript:void(0)'>取消</a>"
			+"			</li>"
			+"		</ul>"
			+"	</div>"
			+"</div>";					
	var dlg = $(html);
	$('body').append(dlg);
	return dlg;
}