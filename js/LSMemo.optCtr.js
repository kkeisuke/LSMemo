(function(window, document, undefined){
	
	if(window.LSMemo === undefined){
		window.LSMemo = {};
	}
	
	/**
	 * クラス
	 * @param {Object} option オプション
	 */
	LSMemo.optCtr = function(option){
		this.model = null;
		this.optId = null;
		this.option = {
			numMemo:1,
			domains:""
		};
		this._extends(option);
		this._init();
	};
	
	/**
	 * クラスメンバー
	 */
	//LSMemo.optCtr.member = ;
	//LSMemo.optCtr.MEMBER = ;
	
	/**
	 * インスタンスメソッド
	 */
	LSMemo.optCtr.prototype = {
		// オプションを継承
		_extends:function(option){
			if(option === undefined) { return; }
			for(var param in option){
				this.option[param] = option[param];
			}
		},
		_init:function(){
			if(LSMemo.Model === undefined){ return; }
			
			this.model = new LSMemo.Model();
			for(var key in this.option){
				this.toConfig(key, this.option[key]);
			}
			this.optId = document.getElementById("options");
			this.addEvent();
		},
		toConfig:function(id, def){
			var val = this.model.getConfig(id);
			document.getElementById(id).value = (val !== undefined) ? val : def;
		},
		setConfig:function(id){
			this.model.setConfig(id, document.getElementById(id).value, false);
		},
		addEvent:function(){
			var that = this;
			this.optId.querySelector(".saveBtn").addEventListener("click", function(e){
				for(var key in that.option){
					that.setConfig.call(that, key);
				}
				that.model.setData();
			}, false);
		}
	};
	
	// インスタンスを生成する。
	var instance = new LSMemo.optCtr();
	
})(this, this.document);