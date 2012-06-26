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
			display:"none"
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
			this.fragment.appendChild(this.area);
		},
		createMemo:function(index,val,w,h){
			var memo = document.createElement("textarea");
			memo.setAttribute(LSMemo.View.DATA_INDEX, index);
			memo.value = val !== null ? val : "";
			var style = memo.style;
			if(w){ style.width = w; }
			if(h){ style.height = h; }
			this.area.appendChild(memo);
		},
		setAllMemo:function(datas){
			var memos = this.area.getElementsByTagName("textarea");
			var num = memos.length > datas.length ? datas.length : memos.length;
			for (var i = 0; i < num; i++) {
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
			this.area.style.display = this.area.style.display === "block" ? "none" : "block";
		}
	};
	
	// インスタンスを生成する。
	// var instance = new LSMemo.View(option);
	
})(this, this.document);