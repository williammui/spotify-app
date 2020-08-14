var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const { decrypt } = require('../../util/encrypt');

router.get('/userInfo', async (req, res) => {
    const loggedInSpotifyApi = new SpotifyWebApi();
    //loggedInSpotifyApi.setAccessToken(decrypt(req.session.spotifyAccount));
    loggedInSpotifyApi.setAccessToken(req.session.spotifyAccount.access_token);

    try {
        const user = await loggedInSpotifyApi.getMe();
        res.send(user.body.display_name);
    } catch (err) {
        console.log(err);
        res.send('');
    }
});

router.get('/genre', async (req, res) => {
    const loggedInSpotifyApi = new SpotifyWebApi();
    loggedInSpotifyApi.setAccessToken(decrypt(req.session.spotifyAccount));

    const playlists = {};

    let start = 0;
    let count = 0;    
    while (true) {
        try {
            const tracks = await loggedInSpotifyApi.getMySavedTracks({
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

            
            const result = await loggedInSpotifyApi.getArtists(Object.keys(artists));

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

router.post('/save', async (req, res) => {
    const loggedInSpotifyApi = new SpotifyWebApi();
    loggedInSpotifyApi.setAccessToken(decrypt(req.session.spotifyAccount));

    const playlists = req.body;
    const names = Object.keys(playlists);
    let statusCode = 201;

    for (let i=0; i<names.length; i++) {
        try {
            const user = await loggedInSpotifyApi.getMe();
            const result = await loggedInSpotifyApi.createPlaylist(user.body.id, names[i], { 'public' : false });

            const playlistID = result.body.id;
            const trackURIs = playlists[names[i]].map((track) => {
                return track.trackURI;
            });

            let tracks = Array.from(trackURIs);
            while (true) {
                if (tracks.length > 100) {
                    const addedTracks = tracks.slice(0, 100);
                    loggedInSpotifyApi.addTracksToPlaylist(playlistID, addedTracks)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
        
                    tracks = tracks.slice(100);
                } else {
                    loggedInSpotifyApi.addTracksToPlaylist(playlistID, tracks)
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

module.exports = router;
