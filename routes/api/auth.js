var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI, CLIENT_URI, STATE } = require('../../config/index');
const { encrypt } = require('../../util/encrypt');

const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});

router.get('/login', (req, res) => {
    const scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'playlist-modify-private'];
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, STATE);
    res.send(authorizeURL+"&show_dialog=true");
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const data = await spotifyApi.authorizationCodeGrant(code)
        const { access_token } = data.body;
        req.session.spotifyAccount = encrypt(access_token);

        res.redirect(CLIENT_URI+'/dashboard');
      } catch(err) {
        res.redirect(CLIENT_URI+'/dashboard');
      }
});

module.exports = router;
