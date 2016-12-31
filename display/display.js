display = {};

display.setup = function(id) {
    console.log("setup display");
    display.id = id;
    window.setInterval(display.play_next, 3000);
}

display.setUrl = function(url) {
    console.log("setting url to " + url);
    $(display.id).attr("src", url); 
}

display.play_next = function() {
    if (typeof db.playlist === 'undefined') { return -1 };


//    $(display.id).attr("src", 

    
    
}



