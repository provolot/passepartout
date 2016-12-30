$( document ).ready(function() {
    // connect to db
    db.setup();

    // connect to socket notifier if applicable
    //socket.setup();

    display.setup("#displayoverlay");
});



