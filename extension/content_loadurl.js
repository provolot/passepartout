
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	var url = request.url;
    url = videoToEmbed(url);

    console.log("should we load " + url);
	if(urlsAreDifferent(window.location.href, url)) {
		console.log("yes! " + url);
		window.location = url;
	}
});

var urlsAreDifferent = function(url1, url2) {
    var regExp = /http(s)?:\/\/(.*)/;
	var url1clean = url1.match(regExp)[2];
	var url2clean = url2.match(regExp)[2];
    console.log(url1clean);
    console.log(url2clean);
    if(url1clean.localeCompare(url2clean)) {
        return true; // localecompare returns non-zero if different
    } else {
        return false;
    }
}

var videoToEmbed = function(url) {
    url = ifYoutubeFullEmbed(url); 
    url = ifVimeoFullEmbed(url); 
    return url;
}


var ifYoutubeFullEmbed = function(url) {
	var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[2].length == 11) {
	  return "http://www.youtube.com/embed/" + match[2] + "?rel=0&autoplay=1&loop=1&autohide=1";
	} else {
	  return url;
	}
}

var ifVimeoFullEmbed = function(url) {
	var regExp = /:\/\/(www\.)?vimeo.com\/(\d+)($|\/)?/;
	var match = url.match(regExp);
	if (match) {
	  return "http://player.vimeo.com/video/" + match[2] + "?portrait=0&color=333&autoplay=1&loop=1&title=0&byline=0&badge=0";
	} else {
	  return url;
	}
}

$( document ).ready(function() {
	console.log("content_loadurl.js");
});

