display = {};


display.setup = function(id) {
    console.log("setting display");
    display.id = id;
    window.setInterval(display.play_next, 3000);
}

display.play_next = function() {
    if (typeof db.playlist === 'undefined') { return -1 };


//    $(display.id).attr("src", 

    
    
}



