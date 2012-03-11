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
				that.view = new LSMemo.View({
					display:data[LSMemo.Model.DISPLAY] || "block"
				});
				that.setRequest.call(that);
				that.setMemo.call(that, data[LSMemo.Model.NUM_MEMO] || 1);
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
			};
			this.setView();
		},
		setView:function(){
			this.view.addView();
			var that = this;
			this.view.area.addEventListener(LSMemo.View.event.CHANGE, function(e){
				var data = e.detail;
				that.model.updateMemoObj.call(that.model, data.getAttribute(LSMemo.View.DATA_INDEX), data.value, data.style.width, data.style.height);
			}, false);
			this.view.area.addEventListener(LSMemo.View.event.BACK_UP, function(e){
				var data = e.detail;
				var texts = [];
				var br;
				var num = data.length;
				for (var i=0; i < num; i++) {
					br = i !== (num-1) ? "\n\n\n" : "";
					texts[i] = data[i].value + br;
				};
				that.backUpFile(texts.join(""));
			}, false);
			this.setKeyEvent();
		},
		setKeyEvent:function(){
			var that = this;
			document.addEventListener("keydown", function(e){
				if(e.ctrlKey && (e.keyCode === LSMemo.Ctr.VISIBLE_CODE)){
					that.model.setConfig(LSMemo.Model.DISPLAY, that.view.setDisplay(), true);
				}
			}, false);
		},
		setRequest:function(){
			var that = this;
			chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
				that.model.setConfig(LSMemo.Model.DISPLAY, that.view.setDisplay(), true);
			});
		},
		backUpFile:function(/*name,*/text){
			var blobBuilder = new WebKitBlobBuilder();
			blobBuilder.append(text);
			location.href = window.webkitURL.createObjectURL(blobBuilder.getBlob());
			/* var hoge = 0;
			var errorCallback = function(e){
				console.log(hoge);
				hoge++;
				console.log(e);
			};
			
			window.webkitRequestFileSystem(window.PERSISTENT, 1024*1024, function(fs){
				console.log(fs)
				fs.root.getFile(name + '.txt', {create:true}, function(fileEntry) {
					fileEntry.createWriter(function(fileWriter) {
						fileWriter.onwriteend = function(e){
							console.log(fileWriter);
							//window.alert("end");
						};
						fileWriter.onerror = function(e){
							//window.alert("error");
						};
						fileWriter.write(blobBuilder.getBlob('text/plain'));
					},errorCallback);
				},errorCallback);
			},errorCallback); */
		}
	};
	
	// インスタンスを生成する。
	// var instance = new LSMemo.Ctr(option);
	
})(this, this.document);