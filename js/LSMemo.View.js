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
		BACK_UP:"BackUP"
	};
	LSMemo.View.BTNS = '<ul class="ctr"><li class="backupBtn">Back Up</li></ul>';
	
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
			this.area.insertAdjacentHTML("afterbegin", LSMemo.View.BTNS);
			
			this.fragment.appendChild(this.area);
		},
		createMemo:function(index,val,w,h){
			var memo = document.createElement("textarea");
			memo.setAttribute(LSMemo.View.DATA_INDEX, index);
			memo.value = val !== null ? val : "";
			var style = memo.style;
			if(w){ style.width = w; }
			if(h){ style.height = h; }
			var that = this;
			memo.addEventListener("change", function(){
				that.area.dispatchEvent(that.createEvent.call(that, LSMemo.View.event.CHANGE, memo));
			}, false);
			memo.addEventListener("mouseup", function(){
				that.area.dispatchEvent(that.createEvent.call(that, LSMemo.View.event.CHANGE, memo));
			}, false);
			this.area.appendChild(memo);
		},
		addView:function(){
			document.getElementsByTagName("body")[0].appendChild(this.fragment);
			this.setBtnEvent();
		},
		setBtnEvent:function(){
			var that = this;
			this.area.querySelector(".backupBtn").addEventListener("click", function(e){
				that.area.dispatchEvent(that.createEvent.call(that, LSMemo.View.event.BACK_UP, that.area.getElementsByTagName("textarea")));
			}, false);
		},
		createEvent:function(name, data){
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