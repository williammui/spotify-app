const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

require('dotenv').config();

router.get('/login', (req, res) => {
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

router.get('/callback', (req, res) => {
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
        axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err)
    });

    res.send('this is the callback page');
});

module.exports = router;