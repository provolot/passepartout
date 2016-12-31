from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
import boto
from boto.s3.connection import S3Connection
from boto.s3.key import Key
import base64

import pymongo
from pymongo import MongoClient
import settings
import datetime

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://' + settings.MONGO_USER + ':' + settings.MONGO_PASS + '@' + settings.MONGO_URL
mongo = PyMongo(app)


@app.route('/')
def index():
    return 'Hi! use either: /get_current or /play_next or /play_piece_now or /queue_piece or /set_playlist'

### 'playlist' is a field of a 'piece' db entry. each item has a date and an optional ordinal (as so to make ordering possible later)


######## PUBLIC ENDPOINTS
@app.route('/play_next')
    # do something here to play next
    # send_command('/play_next')

@app.route('/play_piece_now')
def play_piece_now():
    # send_command('/play_piece_now')
    print "playing piece now"
    

@app.route('/queue_piece')
def queue_piece():
    # queue a piece, given url, playlist, and (optional) ordinal. 
    url = request.args.get('url')
    playlist = request.args.get('playlist')
    ordinal = request.args.get('ordinal')
    if (playlist and url):
        return submit_piece_to_db(playlist, url, ordinal)
    else:
        return "Error: no playlist or url"

@app.route('/set_playlist')
def set_playlist():
    # do something here to set a playlist
    playlist = request.args.get('playlist')
    # send_command('/set_playlist '+ playlist)

@app.route('/get_current')
def get_current():
    # get the most recent piece, given playlist
    playlist = request.args.get('playlist')
    print playlist  
    if (playlist):

        mongo_pieces = mongo.db[settings.MONGO_DB_COLLECTION]

        try:
            # sort in descending order by date/time, so that  we get the most recent
            pieces = mongo_pieces.find({"playlist": playlist}).sort('ordinal',pymongo.DESCENDING).sort('datetime',pymongo.DESCENDING).limit(1)

            playlist = [piece_to_dict(piece) for piece in pieces]
            print playlist
            return jsonify(playlist)
        except Exception, e:
            print "error:"
            return "error:" + str(e)

    else:
        return "error: no playlist"


####### PRIVATE ENDPOINTS & HELPER FUNCTS

@app.route('/_get_playlist')
def _get_playlist():
    # get the most recent piece, given playlist
    playlist = request.args.get('playlist')
    print playlist  
    if (playlist):

        mongo_pieces = mongo.db[settings.MONGO_DB_COLLECTION]

        try:
            # sort in descending order by date/time, so that  we get the most recent
            pieces = mongo_pieces.find({"playlist": playlist}).sort('ordinal',pymongo.DESCENDING).sort('datetime',pymongo.DESCENDING)

            playlist = [piece_to_dict(piece) for piece in pieces]
            print playlist
            return jsonify(playlist)
        except Exception, e:
            print "error:"
            return "error:" + str(e)

    else:
        return "error: no playlist"

def piece_to_dict(piece):
    data = {}
    data['url'] = piece['url']
    data['datetime'] = piece['datetime']
    return data

def submit_piece_to_db(playlist, url, ordinal=None):
    mongo_pieces = mongo.db[settings.MONGO_DB_COLLECTION]

    piece = {'playlist': playlist, 'url': url, 'datetime': datetime.datetime.utcnow(), 'ordinal': ordinal}

    try:
        result = mongo_pieces.insert_one(piece)

        print "Inserted: ", result.inserted_id, " >> ", playlist, " : ", url
        return "Inserted: " + str(result.inserted_id)
    except Exception, e:
        print "error: not inserted", piece
        print e
        return "error: not inserted", piece

