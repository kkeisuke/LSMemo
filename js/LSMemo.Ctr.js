(function(window, document, undefined){
	
	if(window.LSMemo === undefined){
		window.LSMemo = {};
	}
	
	/**
	 * クラス
	 * @param {Object} option オプション
	 */
	LSMemo.Ctr = function(option){
		this.model = null;
		this.view = null;
		this.option = {
			//初期値など
		};
		this._extends(option);
		this._init();
	};
	
	/**
	 * クラスメンバー
	 */
	LSMemo.Ctr.VISIBLE_CODE = 81;
	LSMemo.Ctr.RELOAD_TEXT = "Do you reload all memo's ?";
	
	/**
	 * インスタンスメソッド
	 */
	LSMemo.Ctr.prototype = {
		// オプションを継承
		_extends:function(option){
			if(option === undefined) { return; }
			for(var param in option){
				this.option[param] = option[param];
			}
		},
		_init:function(){
			if(!(LSMemo.Model && LSMemo.View)){ return; }
			
			var that = this;
			this.model = new LSMemo.Model();
			this.model.loadData(function(data){
				that.view = new LSMemo.View();
				that.setMemo.call(that, data[LSMemo.Model.NUM_MEMO] || 1);
				that.setRequest.call(that);
			});
		},
		setMemo:function(num){
			var obj;
			for (var i=0; i < num; i++) {
			  obj = this.model.getMemoObj(i);
			  if(obj){
			  	this.view.createMemo(i, obj.val, obj.w, obj.h);
			  }else{
			  	this.model.insertMemoObj(null, null, null);
			  	this.view.createMemo(i, null, null, null);
			  }
			}
			this.setView();
		},
		setView:function(){
			this.view.addView();
			var that = this;
			this.view.area.addEventListener(LSMemo.View.event.SAVE, function(e){
				that.saveAllMemo.call(that, e.detail);
			}, false);
			this.view.area.addEventListener(LSMemo.View.event.RELOAD, function(e){
				if(window.confirm(LSMemo.Ctr.RELOAD_TEXT)){
					that.reloadAllMemo.call(that);
				}
			}, false);
			// TODO 中身をメソッド化する。
			this.view.area.addEventListener(LSMemo.View.event.BACK_UP, function(e){
				var data = e.detail;
				var texts = [];
				var br;
				var num = data.length;
				for (var i=0; i < num; i++) {
					br = i !== (num-1) ? "\n\n\n" : "";
					texts[i] = data[i].value + br;
				}
				that.backUpFile(texts.join(""));
			}, false);
			this.setKeyEvent();
		},
		setKeyEvent:function(){
			var that = this;
			document.addEventListener("keydown", function(e){
				if(e.ctrlKey && (e.keyCode === LSMemo.Ctr.VISIBLE_CODE)){
					that.view.setDisplay();
				}
			}, false);
		},
		setRequest:function(){
			var that = this;
			chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
				that.view.setDisplay();
			});
		},
		saveAllMemo:function(textareas){
			var txt = null;
			for (var i=0, num = textareas.length; i < num; i++) {
				txt = textareas[i];
				this.model.updateMemoObj.call(this.model, txt.getAttribute(LSMemo.View.DATA_INDEX), txt.value, txt.style.width, txt.style.height);
			}
			this.model.setData();
		},
		reloadAllMemo:function(){
			var that = this;
			this.model.loadData(function(data){ that.view.setAllMemo(data[LSMemo.Model.KEY]); });
		},
		backUpFile:function(text){
			var blobBuilder = new WebKitBlobBuilder();
			blobBuilder.append(text);
			location.href = window.webkitURL.createObjectURL(blobBuilder.getBlob());
		}
	};
	
	// インスタンスを生成する。
	var instance = new LSMemo.Ctr();
	
})(this, this.document);