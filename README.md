# passepartout

*display/* is a simple display that shows what it's told to show
    - connects to api via polling every 1 min
    - connects to api via socket to be notified for changes

*api/*
    - connects to a db
    - socket server to alert displays for changes
