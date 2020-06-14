const express = require('express');
const app = express();

require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private']


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI
})

app.get('/', (req, res)=>{
    res.send('hello world');
})

app.get('/callback', (req, res)=>{
    res.send('callback page');
})

app.get('/login', (req, res) => {
    const html = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(html);
})

app.listen(process.env.PORT, () => {
    console.log('server is running on port: ' + process.env.PORT);
});