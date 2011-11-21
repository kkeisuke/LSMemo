(function(window, document, undefined){
	
	if(window.LSMemo === undefined){
		window.LSMemo = {};
	}
	
	/**
	 * クラス
	 * @param {Object} option オプション
	 */
	LSMemo.Model = function(option){
		this.obj = {
			LSMemo:[]
		};
		this.ls = window.localStorage;
		this.option = {
			//初期値など
		};
		this._extends(option);
		this._init();
	};
	
	/**
	 * クラスメンバー
	 */
	LSMemo.Model.KEY = "LSMemo";
	LSMemo.Model.DISPLAY = "display";
	
	/**
	 * インスタンスメソッド
	 */
	LSMemo.Model.prototype = {
		// オプションを継承
		_extends:function(option){
			if(option === undefined) { return; }
			for(var param in option){
				this.option[param] = option[param];
			}
		},
		_init:function(){
			var obj = this.getData();
			if(obj){
				this.obj = obj;
			}else{
				this.setData();
			}
		},
		getData:function() {
		  return JSON.parse(this.ls.getItem(LSMemo.Model.KEY));
		},
		setData:function(){
			this.ls.setItem(LSMemo.Model.KEY, JSON.stringify(this.obj));
		},
		getObj:function(index){
			return this.obj[LSMemo.Model.KEY][index];
		},
		updateMemoObj:function(index,val,w,h){
			var memo = this.getObj(index);
			if(memo){
				memo.val = val;
				memo.w = w;
				memo.h = h;
				this.setData();
			}
		},
		insertMemoObj:function(value,width,height){
			var memos = this.obj[LSMemo.Model.KEY];
			memos[memos.length] = {
				val:value,
				w:width,
				h:height
			}
		},
		setConfig:function(key, value, flg){
			this.obj[key] = value;
			if(flg){
				this.setData();
			}
		},
		getConfig:function(key){
			return this.obj[key];
		},
	};
	
	// インスタンスを生成する。
	// var instance = new LSMemo.Model(option);
	
})(this, this.document);