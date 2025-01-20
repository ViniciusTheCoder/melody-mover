import express from 'express';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

app.post('/api/refresh-token', async (req, res) => {
  const { refresh_token } = req.body;
  
  try {
    spotifyApi.setRefreshToken(refresh_token);
    const data = await spotifyApi.refreshAccessToken();
    res.json({
      access_token: data.body.access_token,
      expires_in: data.body.expires_in
    });
  } catch (error) {
    res.status(400).json({ error: 'Error refreshing token' });
  }
});

app.post('/api/convert-playlist', async (req, res) => {
  const { deezerUrl, accessToken } = req.body;

  try {
    spotifyApi.setAccessToken(accessToken);

    const playlistId = deezerUrl.split('playlist/')[1]?.split('?')[0];
    if (!playlistId) {
      throw new Error('Invalid Deezer playlist URL');
    }

    const deezerResponse = await axios.get(`https://api.deezer.com/playlist/${playlistId}`);
    const deezerPlaylist = deezerResponse.data;

    const { body: spotifyPlaylist } = await spotifyApi.createPlaylist(
      deezerPlaylist.title,
      {
        description: `Converted from Deezer playlist: ${deezerUrl}`,
        public: false
      }
    );

    const tracks = deezerPlaylist.tracks.data;
    const spotifyTrackUris = [];

    for (const track of tracks) {
      try {
        const searchResult = await spotifyApi.searchTracks(
          `track:${track.title} artist:${track.artist.name}`
        );

        if (searchResult.body.tracks.items.length > 0) {
          spotifyTrackUris.push(searchResult.body.tracks.items[0].uri);
        }
      } catch (error) {
        console.error(`Error searching for track: ${track.title}`);
      }
    }

    if (spotifyTrackUris.length > 0) {
      await spotifyApi.addTracksToPlaylist(spotifyPlaylist.id, spotifyTrackUris);
    }

    res.json({
      success: true,
      playlistUrl: spotifyPlaylist.external_urls.spotify,
      totalTracks: spotifyTrackUris.length
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to convert playlist'
    });
  }
});

export default app;