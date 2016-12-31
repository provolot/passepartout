$( document ).ready(function() {
    // connect to db
    db.setup({'PLAYLIST': 'testlist2'});

    // connect to socket notifier if applicable
    //socket.setup();

    display.setup("#displayiframe");

    //every x seconds, poll db and listen for changes
    window.setInterval(function() {
        console.log("hooo");
        db.getCurrentUrl(function(result) {
            if(db.currentUrl != result['url']) {
                db.currentUrl = result['url'];
                display.setUrl(db.currentUrl);
            }
        });
    }, 3000);
});



