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
			//初期値など
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
			
			this.model = new LSMemo.Model({ls:window.localStorage});
			this.toConfig(LSMemo.Model.NUM_MEMO);
			this.optId = document.getElementById("options");
			this.addEvent();
		},
		toConfig:function(id){
			document.getElementById(id).value = this.model.getConfig(id);
		},
		setConfig:function(id){
			this.model.setConfig(id, document.getElementById(id).value, false);
		},
		addEvent:function(){
			var that = this;
			this.optId.querySelector(".saveBtn").addEventListener("click", function(e){
				that.model.loadData(function(){
					that.setConfig.call(that, LSMemo.Model.NUM_MEMO);
					that.model.setData();
				});
			}, false);
		}
	};
	
	// インスタンスを生成する。
	var instance = new LSMemo.optCtr();
	
})(this, this.document);