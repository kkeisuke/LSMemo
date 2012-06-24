(function(window, document, undefined){
	
	if(window.LSMemo === undefined){
		window.LSMemo = {};
	}
	
	/**
	 * クラス
	 * @param {Object} option オプション
	 */
	LSMemo.View = function(option){
		this.fragment = null;
		this.area = null;
		this.option = {
			display:"block"
		};
		this._extends(option);
		this._init();
	};
	
	/**
	 * クラスメンバー
	 */
	LSMemo.View.ID = "LSMemo";
	LSMemo.View.DATA_INDEX = "data-index";
	LSMemo.View.event = {
		CHANGE:"ChangeMemo",
		SAVE:"Save",
		RELOAD:"Reload",
		BACK_UP:"BackUP"
	};
	LSMemo.View.BTNS = [
		'<ul class="ctr">',
			'<li class="backupBtn">Back Up</li>',
			'<li class="saveBtn">Save</li>',
			'<li class="reloadBtn">Reload</li>',
		'</ul>'
	];
	
	/**
	 * インスタンスメソッド
	 */
	LSMemo.View.prototype = {
		// オプションを継承
		_extends:function(option){
			if(option === undefined) { return; }
			for(var param in option){
				this.option[param] = option[param];
			}
		},
		_init:function(){
			this.fragment = document.createDocumentFragment();
			this.createArea();
		},
		createArea:function(){
			this.area = document.createElement("div");
			this.area.id = LSMemo.View.ID;
			this.area.style.display = this.option.display;
			this.area.insertAdjacentHTML("afterbegin", LSMemo.View.BTNS.join(""));
			
			/* var reader = new FileReader();
			reader.onload = function(e){
				console.log(e.target.result);
			};
			reader.readAsText(new File(chrome.extension.getURL("template/area.html")), "utf-8"); */
			
			/* window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
				fs.root.getFile(chrome.extension.getURL("template/area.html"), {}, function(fileEntry){
					console.log(fileEntry)
					fileEntry.file(function(file){
						var reader = new FileReader();
						reader.onloadend = function(e){
							console.log(e);
						};
						reader.readAsText(file, "utf-8");
					});
				});
			}); */
			
			this.fragment.appendChild(this.area);
		},
		createMemo:function(index,val,w,h){
			var memo = document.createElement("textarea");
			memo.setAttribute(LSMemo.View.DATA_INDEX, index);
			memo.value = val !== null ? val : "";
			var style = memo.style;
			if(w){ style.width = w; }
			if(h){ style.height = h; }
			/*
			var that = this;
			memo.addEventListener("change", function(){
				that.area.dispatchEvent(that._createEvent.call(that, LSMemo.View.event.CHANGE, memo));
			}, false);
			memo.addEventListener("mouseup", function(){
				that.area.dispatchEvent(that._createEvent.call(that, LSMemo.View.event.CHANGE, memo));
			}, false);
			*/
			this.area.appendChild(memo);
		},
		setAllMemo:function(datas){
			var memos = this.area.getElementsByTagName("textarea");
			for (var i = 0, num = datas.length; i < num; i++) {
				memos[i].value = datas[i].val;
				memos[i].style.width = datas[i].w;
				memos[i].style.height = datas[i].h;
			}
		},
		addView:function(){
			document.getElementsByTagName("body")[0].appendChild(this.fragment);
			this.setBtnEvent();
		},
		setBtnEvent:function(){
			var that = this;
			this.area.querySelector(".backupBtn").addEventListener("click", function(e){
				that.area.dispatchEvent(that._createEvent.call(that, LSMemo.View.event.BACK_UP, that.area.getElementsByTagName("textarea")));
			}, false);
			this.area.querySelector(".saveBtn").addEventListener("click", function(e){
				that.area.dispatchEvent(that._createEvent.call(that, LSMemo.View.event.SAVE, that.area.getElementsByTagName("textarea")));
			}, false);
			this.area.querySelector(".reloadBtn").addEventListener("click", function(e){
				that.area.dispatchEvent(that._createEvent.call(that, LSMemo.View.event.RELOAD));
			}, false);
		},
		_createEvent:function(name, data){
			var evt = document.createEvent("CustomEvent");
			evt.initCustomEvent(name, false, true, data);
			return evt;
		},
		setDisplay:function(){
			var display = this.option.display === "block" ? "none" : "block";
			this.area.style.display = display;
			this.option.display = display;
			return display;
		}
	};
	
	// インスタンスを生成する。
	// var instance = new LSMemo.View(option);
	
})(this, this.document);