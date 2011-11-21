(function(window, document, undefined){
	
	chrome.extension.sendRequest({}, function(response) {
		var setting = JSON.parse(response.setting.LSMemo);
		if(setting.domains){
			var current = location.href;
			var domains = setting.domains.split("\n");
			var num = domains.length;
			for (var i=0; i < num; i++) {
				if(current.indexOf(domains[i]) !== -1){
			 		var lsc = new LSMemo.Ctr();
					lsc.setMemo(setting.numMemo);
					break;
				}
			};
		}
	});

})(this, this.document);