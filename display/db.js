db = {};

db.playlist = [];
db.playlist_cursor = 0;

db.API_URL = "http://localhost:5000/";
db.CURRENT_URL = "get_current";
db.PLAYLIST_URL = "get_playlist";

db.setup = function(opts) {
    console.log("setup db");
    Object.assign(db, opts)
    window.setInterval(db.update_playlist, 10000);
}

db.getCurrentUrl = function(callback) {
    console.log("updating playlist")
    $.get(db.API_URL + db.CURRENT_URL + "?playlist=" + db.PLAYLIST, function( data ) {
        callback(data[0]);
    });
}

db.update_playlist = function() {
    console.log("updating playlist")
    $.get(db.API_URL + db.PLAYLIST_URL + "?playlist=" + db.PLAYLIST, function( data ) {
        db.playlist = data;
        console.log(data);
    });
}

db.loop = function() {
    console.log("looping db");
}

db.getCurrent = function() {
    return db.playlist[db.playlist_cursor]
}

db.set_next = function() {
    db.playlist_cursor += 1;
    db.playlist_cursor %= db.playlist.length;
}

db.set_next = function() {
    db.playlist_cursor += 1;
    db.playlist_cursor %= db.playlist.length;
}


