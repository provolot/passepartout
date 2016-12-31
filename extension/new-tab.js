// TODO: these options across (new-tab.js, set-tab.js, load-new-tab-scribble.js) need to be shared & set in local storage by options.html, etc
var manifest = chrome.runtime.getManifest();
var opts = {};
opts.TABROOM = manifest.settings.tabroom;
opts.get_tab_url =  "https://vps.provolot.com/manila_api/get_tab?tabroom=" + opts.TABROOM;

var onSuccessLoadURL = function(response) {
    console.log("SUCCESS! We're going to load a url!");
    window.location = response['url'];
}

var newTab = function(successFunction) {
	$.ajax({
        url: opts.get_tab_url,
	    success: successFunction,
        error: function(xhr) {
	        console.log('FAILURE');
	    }
	});

};

$( document ).ready(function() {
    newTab(onSuccessLoadURL);
});


console.log('new-tab.js --> IS RUNNING');
