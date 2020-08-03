const express = require('express');
const app = express();
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const session = require('express-session');
const axios = require('axios');
const querystring = require('querystring');
const bodyParser = require('body-parser');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

require('dotenv').config();
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
});

// ********************AUTHENTICATION********************
app.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email user-read-playback-state playlist-read-collaborative playlist-read-private user-library-read playlist-modify-private';
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.REDIRECT_URI,
        state: 'random',
        scope: scope,
        show_dialog: true
    }));
});

app.get('/callback', (req, res) => {
    const { code } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.REDIRECT_URI
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((res) => {
        const { access_token, refresh_token } = res.data;
        //console.log(access_token);
        
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            //console.log(res);
        }).catch((err) => {
            //console.log(err);
        });
    }).catch((err) => {
        console.log(err)
    });

    res.redirect('http://localhost:3000/dashboard');
});


// ********************DASHBOARD********************
app.get('/genre', async (req, res) => {
    const playlists = {};

    let start = 0;
    let count = 0;    
    while (true) {
        try {
            const tracks = await spotifyApi.getMySavedTracks({
                limit: 50,
                offset: start
            });

            count += tracks.body.items.length;

            // get all artists in current request
            const artists = {}; 
            tracks.body.items.forEach((item) => {
                const artistID = item.track.artists[0].id;
                if (!artists.hasOwnProperty(artistID)) {
                    artists[artistID] = [];
                }
            });

            
            const result = await spotifyApi.getArtists(Object.keys(artists));

            // get all artist genres and update artists object
            result.body.artists.forEach((artist) => {
                const artistID = artist.id;
                const genres = artist.genres;
                if (genres != []) {
                    artists[artistID] = genres;
                }
            });

            // add tracks to their respective genres
            tracks.body.items.forEach((item) => {
                const artistID = item.track.artists[0].id;
                const artistName = item.track.artists.map((artist) => {
                    return artist.name;
                });

                const imageURL = item.track.album.images[item.track.album.images.length-1].url;

                const trackID = item.track.id;
                const trackName = item.track.name;
                const trackURI = item.track.uri;

                const trackItem = {
                    artistName: artistName,
                    trackID: trackID,
                    trackName: trackName,
                    trackURI: trackURI,
                    imageURL: imageURL
                }

                const genres = artists[artistID];
                genres.forEach((genre) => {
                    if (playlists.hasOwnProperty(genre)) {
                        playlists[genre].push(trackItem);
                    } else {
                        playlists[genre] = [trackItem];
                    }
                });
            });

            start += 50;
        } catch (err) {
            console.log(`found ${count} saved tracks`);
            break;
        }
    }

    const output = {
        track_count: count,
        playlist_count: playlists.length,
        playlists: playlists
    };

    res.send(output);
});

app.post('/save', async (req, res) => {
    const playlists = req.body;
    const names = Object.keys(playlists);
    let statusCode = 201;

    for (let i=0; i<names.length; i++) {
        try {
            const user = await spotifyApi.getMe();
            const result = await spotifyApi.createPlaylist(user.body.id, names[i], { 'public' : false });

            const playlistID = result.body.id;
            const trackURIs = playlists[names[i]].map((track) => {
                return track.trackURI;
            });

            let tracks = Array.from(trackURIs);
            while (true) {
                if (tracks.length > 100) {
                    const addedTracks = tracks.slice(0, 100);
                    spotifyApi.addTracksToPlaylist(playlistID, addedTracks)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
        
                    tracks = tracks.slice(100);
                } else {
                    spotifyApi.addTracksToPlaylist(playlistID, tracks)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    break;
                }
            }
        } catch (err) {
            console.log(err);
            statusCode = 500;
        }   
    }

    res.send({statusCode: statusCode});
});

app.listen(process.env.PORT, () => {
    console.log('server is running on port: ' + process.env.PORT);
});