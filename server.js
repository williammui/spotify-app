const express = require('express');
const app = express();
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');
const session = require('express-session');
const axios = require('axios');
const querystring = require('querystring');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

require('dotenv').config();
app.use(cors());

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
});

// ********************AUTHENTICATION********************
app.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email user-read-playback-state playlist-read-collaborative playlist-read-private user-library-read';
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
                const trackID = item.track.id;
                const genres = artists[artistID];
                genres.forEach((genre) => {
                    if (playlists.hasOwnProperty(genre)) {
                        playlists[genre].push(trackID);
                    } else {
                        playlists[genre] = [trackID];
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

app.listen(process.env.PORT, () => {
    console.log('server is running on port: ' + process.env.PORT);
});