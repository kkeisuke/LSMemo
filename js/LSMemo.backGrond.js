(function(window, document, undefined){
	
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		sendResponse({setting:window.localStorage});
	});
	
	chrome.browserAction.onClicked.addListener(function(tab){
		chrome.tabs.sendRequest(tab.id, {});
	});
	
})(this, this.document);