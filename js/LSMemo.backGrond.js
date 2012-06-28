(function(window, document, undefined){
	
	if(window.LSMemo === undefined){
		window.LSMemo = {};
	}
	
	/**
	 * クラス
	 * @param {Object} option オプション
	 */
	LSMemo.BackGround = function (option){
		this.option = {
			//初期値など
		};
		this._extends(option);
		this._init();
	};
	
	/**
	 * クラスメンバー
	 */
	LSMemo.BackGround.KEY = "LSMemo";
	LSMemo.BackGround.ICON = "../img/icon32.png";
	LSMemo.BackGround.MSG = " memo's are saved.";
	LSMemo.BackGround.TIMEOUT = 2000;
	
	/**
	 * インスタンスメソッド
	 */
	LSMemo.BackGround.prototype = {
		// オプションを継承
		_extends:function(option){
			if(option === undefined) { return; }
			for(var param in option){
				this.option[param] = option[param];
			}
		},
		_init:function(){
			this._setOnRequest();
			this._setBrowserAction();
		},
		_setOnRequest:function(){
			var that = this;
			chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
				var len = 0;
				if(request === LSMemo.BackGround.KEY){
					sendResponse(JSON.parse(window.localStorage.getItem(LSMemo.BackGround.KEY)));
				}else{
					window.localStorage.setItem(LSMemo.BackGround.KEY, JSON.stringify(request));
					len = request[LSMemo.BackGround.KEY].length;
					if(len > 0){
						that._showNotify.call(that, len);
					}
				}
			});
		},
		_setBrowserAction:function(){
			chrome.browserAction.onClicked.addListener(function(tab){
				chrome.tabs.sendRequest(tab.id, {});
			});
		},
		_showNotify:function(num){
			var notify = window.webkitNotifications.createNotification(LSMemo.BackGround.ICON, LSMemo.BackGround.KEY, num + LSMemo.BackGround.MSG);
			notify.show();
			window.setTimeout((function(notify){
				return function(){
					notify.cancel();
					notify = null;
				};
			})(notify), LSMemo.BackGround.TIMEOUT);
		}
	};
	
	// インスタンスを生成する。
	var instance = new LSMemo.BackGround();
	
})(this, this.document);