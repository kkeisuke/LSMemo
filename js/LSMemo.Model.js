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
			LSMemo:[],
			numMemo:1,
			display:"block"
		};
		this.option = {
			ls:null
		};
		this._extends(option);
		this._init();
	};
	
	/**
	 * クラスメンバー
	 */
	LSMemo.Model.KEY = "LSMemo";
	LSMemo.Model.NUM_MEMO = "numMemo";
	LSMemo.Model.DISPLAY = "display";
	LSMemo.Model.event = {
		LOADED_DATA:"loaded_data"
	};
	
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
			if(this.option.ls){
				this._setUp(this.getData());
			}
		},
		loadData:function(callback){
			var that = this;
			chrome.extension.sendRequest(LSMemo.Model.KEY, function(response){
				that._setUp.call(that, response);
				callback.call(that, that.obj);
			});
		},
		_setUp:function(obj){
			if(obj){
				this.obj = obj;
			}else{
				this.setData();
			}
		},
		getData:function() {
			if(this.option.ls){
				return JSON.parse(this.option.ls.getItem(LSMemo.Model.KEY));
			}else{
				return this.obj;
			}
		},
		setData:function(isNotify){
			if(this.option.ls){
				this.option.ls.setItem(LSMemo.Model.KEY, JSON.stringify(this.obj));
			}else{
				if(isNotify){ this.obj.isNotify = isNotify; }
				chrome.extension.sendRequest(this.obj);
				delete this.obj.isNotify;
			}
		},
		getMemoObj:function(index){
			return this.obj[LSMemo.Model.KEY][index];
		},
		updateMemoObj:function(index,val,w,h,flg){
			var memo = this.getMemoObj(index);
			if(memo){
				memo.val = val;
				memo.w = w;
				memo.h = h;
				if(flg){
					this.setData();
				}
			}
		},
		insertMemoObj:function(value,width,height){
			var memos = this.obj[LSMemo.Model.KEY];
			memos[memos.length] = {
				val:value,
				w:width,
				h:height
			};
		},
		setConfig:function(key, value, flg){
			this.obj[key] = value;
			if(flg){
				this.setData();
			}
		},
		getConfig:function(key){
			return this.obj[key];
		}
	};
	
	// インスタンスを生成する。
	// var instance = new LSMemo.Model(option);
	
})(this, this.document);