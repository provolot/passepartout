
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request.url);

	var url = request.url;
//    url = ifYoutubeFullEmbed(url); 
//    url = ifVimeoFullEmbed(url); 

	console.log(url);

	if(window.location.href !== request.url) {
		console.log(url);
		window.location = url;
	}
});

/*var ifYoutubeFullEmbed = function(url) {
	var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
/*	var match = url.match(regExp);
	if (match && match[2].length == 11) {
	  return "http://www.youtube.com/embed/" + match[2] + "?rel=0&autoplay=1&loop=1&autohide=1";
	} else {
	  return url;
	}
}

var ifVimeoFullEmbed = function(url) {
	var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
	var match = url.match(regExp);
	if (match) {
	  return "http://player.vimeo.com/video/" + match[2] + "?portrait=0&color=333&autoplay=1&loop=1&title=0&byline=0&badge=0";
	} else {
	  return url;
	}
}
*/
$( document ).ready(function() {
	console.log("content_loadurl.js");
});

