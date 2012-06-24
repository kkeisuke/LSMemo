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
	LSMemo.BackGround.MSG = "all memo's are saved.";
	LSMemo.BackGround.TIMEOUT = 3000;
	
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
				if(request === LSMemo.BackGround.KEY){
					sendResponse(JSON.parse(window.localStorage.getItem(LSMemo.BackGround.KEY)));
				}else{
					var isNotify = false;
					if(request.isNotify){
						isNotify = request.isNotify;
						delete request.isNotify;
					}
					window.localStorage.setItem(LSMemo.BackGround.KEY, JSON.stringify(request));
					if(isNotify){ that._showNotify.call(that); }
				}
			});
		},
		_setBrowserAction:function(){
			chrome.browserAction.onClicked.addListener(function(tab){
				chrome.tabs.sendRequest(tab.id, {});
			});
		},
		_showNotify:function(){
			var notify = window.webkitNotifications.createNotification(LSMemo.BackGround.ICON, LSMemo.BackGround.KEY, LSMemo.BackGround.MSG);
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