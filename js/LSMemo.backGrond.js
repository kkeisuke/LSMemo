(function(window, document, undefined){
	
	var key = "LSMemo";
	
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if(request === key){
			sendResponse(JSON.parse(window.localStorage.getItem(key)));
		}else{
			window.localStorage.setItem(key, JSON.stringify(request));
		}
	});
	
	chrome.browserAction.onClicked.addListener(function(tab){
		chrome.tabs.sendRequest(tab.id, {});
	});
	
})(this, this.document);