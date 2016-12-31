// TODO: these options across (new-tab.js, set-tab.js, load-new-tab-scribble.js) need to be shared & set in local storage by options.html, etc
var opts = {};
var manifest = chrome.runtime.getManifest();
opts.TABROOM = manifest.settings.tabroom;
opts.glitterimg = "http://i.imgur.com/9pZ03ex.png";
opts.set_tab_url = "//vps.provolot.com/manila_api/set_tab?tabroom=" + opts.TABROOM + "&url=";
opts.set_scribbled_tab_url = "//vps.provolot.com/manila_api/set_scribbled_tab";

console.log('set-tab.js');

jQuery.fn.exists = function(){return jQuery(this).length>0;}

var currentUrl = window.location.href;

var spreadGlitter = function() {
    $('<img id="manilasuccess" style="position:absolute;top:0; left: 0;z-index: 1000; pointer-events:none;" />').appendTo($("body"));
    $("#manilasuccess").attr("src", opts.glitterimg).fadeOut(3000, function() { $(this).remove(); });
}

var setLinkTab = function(){
	$.ajax({
    url: opts.set_tab_url + currentUrl,
    success: function(response) {
        spreadGlitter();
        console.log('SUCCESS');
        console.log('________________________________________________');
        console.log('________________________________________________');
        console.log('THIS IS WILL BE SENT TO THE DATABASE!: ',currentUrl);
    },
    error: function(xhr) {
        console.log('FAILURE');
    }
});

}

var setCanvasTab = function() {
    html2canvas($("#manilacanvas"), {
        onrendered: function(canvas) {
            var canvasdata = canvas.toDataURL("image/png");
            canvasdata = canvasdata.replace('data:image/png;base64,', '');
            canvas = document.getElementById('manilacanvas');
            var url = location.protocol + opts.set_scribbled_tab_url;
            var g = $.ajax({
                type: 'POST',
                url: url,
                data: {
                    imgBase64: canvasdata,
                    timestamp: Math.floor(Date.now() / 1000),
                    filename: "manila-drawing-" + Math.floor(Date.now() / 1000) + ".png",
                    taburl: window.location.href,
                    tabroom: 'surfclub'
                }
            }).done(function(o) {
                console.log(o);
                spreadGlitter();
            }); 
        }
    });
}


if($("#manilacanvas").exists()) {
    setCanvasTab();
} else {
    setLinkTab();
}



