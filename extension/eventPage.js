db = {};
//http://vps.provolot.com/manila_api/get_tab?tabroom=surfclub
//db.API_URL = "http://localhost:5000/";
db.API_URL = "http://vps.provolot.com/manila_api/";
//db.API_CURRENT_URL = "get_current";
db.API_CURRENT_URL = "get_tab";
db.PLAYLIST_URL = "get_playlist";
db.PLAYLIST = "surfclub";
db.current_url = "";

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  var tabId = tab.id;
	console.log('clicked browserAction in tab id: ',tabId);

  var message = {"clicked": true };

  chrome.tabs.sendMessage(tabId, message);
});



var onChangeLoadPage = function(url) {
    console.log("### loading " + url + "###");

	chrome.tabs.query({active: true}, function(tabs) {

/*		chrome.tabs.executeScript(tabs[0].id, {
			code: 'window.location = "' + url + '";'
		});
*/
		console.log("sending message");
		chrome.tabs.sendMessage(tabs[0].id, {
			url: url
		});
	});


}


var checkIfNewUrl = function(onChange) {
    console.log("## checking if new url");
    $.ajax({
        url: db.API_URL + db.API_CURRENT_URL + "?tabroom=" + db.PLAYLIST,
        success: function(response) {
            console.log("url received..:" + response['url']);
            if(db.current_url != response['url']) {
                console.log("new url!");
				onChange(response['url']);
                db.current_url = response['url'];
            }
        },
        error: function(xhr) {  console.log('FAILURE');    }
    });
}



$( document ).ready(function() {
    console.log("WOWOWO document ready");
//    chrome.alarms.create("myAlarm", {delayInMinutes: 0.0, periodInMinutes: 0.05} );
    window.setInterval(function() {
		checkIfNewUrl(onChangeLoadPage);
	}, 5000);
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
    checkIfNewUrl(onChangeLoadPage);
});

