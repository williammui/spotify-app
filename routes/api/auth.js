var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI, STATE } = require('../../config/index');

require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});

router.get('/login', (req, res) => {
    const scopes = ['user-read-private user-read-email user-read-playback-state playlist-read-collaborative playlist-read-private user-library-read playlist-modify-private'];
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, STATE);
    console.log(authorizeURL);
    res.send(authorizeURL+"&show_dialog=true");
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const data = await spotifyApi.authorizationCodeGrant(code)
        const { access_token, refresh_token } = data.body    
        req.session.spotifyAccount = { access_token, refresh_token }
    
        console.log('done');
        res.redirect('http://localhost:3000/dashboard');
      } catch(err) {
        res.redirect('http://localhost:3000/dashboard');
      }
});

module.exports = router;
