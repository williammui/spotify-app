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

// AUTHENTICATION
app.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email user-read-playback-state';
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
        console.log(access_token);
        
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

// DASHBOARD
app.get('/playlists', async (req, res) => {
    try {
        const result = await spotifyApi.getUserPlaylists();
        console.log(result.body.items);
        res.send(result.body.items);
    } catch (err) {
        res.send(err);
    }
});

app.get('/tracks/:id', async (req, res) => {
    try {
        const result = await spotifyApi.getPlaylistTracks(req.params.id);
        console.log(result.body.items);
        res.send(result.body.items);
    } catch (err) {
        res.send(err);
    }
});

app.listen(process.env.PORT, () => {
    console.log('server is running on port: ' + process.env.PORT);
});