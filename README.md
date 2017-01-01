# passepartout

(lib for magic box control)

**extension/** is a chrom(e/ium) extension that polls the db and changes the current tab.
- connects to api via polling every 1 min
- (TODO:) connects to api via socket.io to be notified for changes

**api/**
- connects to a db
- (TODO:) flask-socketio socket server to alert displays for changes
