db = {};
db.playlist = [];
db.playlist_cursor = 0;

var playlist_url = "http://localhost:5000/_get_playlist?playlist=testlist2";

db.setup = function() {
    console.log("setting db");
    window.setInterval(db.update_playlist, 10000);
}

db.update_playlist = function() {
    console.log("updating playlist")
    $.get(playlist_url, function( data ) {
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


