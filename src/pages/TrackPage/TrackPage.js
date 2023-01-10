import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function TrackPage({
  user,
  newAlbum,
  setNewAlbum,
  trackInfo,
  setTrackInfo,
  albumLibrary,
  spotifyOptions,
  scraperOptions,
  convertTime,
  clearData,
  create
}) {
  const [trackCredits, setTrackCredits] = useState([]);
  const [trackLyrics, setTrackLyrics] = useState([]);
  const [artists, setArtists] = useState([]);

  let { spotifyId } = useParams();

  const getTrackInfo = async () => {
    try {
      const trackInfoResponse = await fetch(
        `https://spotify23.p.rapidapi.com/tracks/?ids=${spotifyId}`,
        spotifyOptions
      );
      const trackInfoData = await trackInfoResponse.json();
      setTrackInfo(trackInfoData);

      const trackCreditsResponse = await fetch(
        `https://spotify23.p.rapidapi.com/track_credits/?id=${spotifyId}`,
        spotifyOptions
      );
      const trackCreditsData = await trackCreditsResponse.json();
      setTrackCredits(trackCreditsData);

      const trackArtistsResponse = await fetch(
        `https://spotify-scraper.p.rapidapi.com/v1/track/metadata?trackId=${spotifyId}`,
        scraperOptions
      );
      const trackArtistsData = await trackArtistsResponse.json();
      setArtists(trackArtistsData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrackLyrics = async () => {
    try {
      const trackLyricsResponse = await fetch(
        `https://spotify23.p.rapidapi.com/track_lyrics/?id=${spotifyId}`,
        spotifyOptions
      );
      const trackLyricsData = await trackLyricsResponse.json();
      setTrackLyrics(trackLyricsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrackInfo();
  }, []);

  return (
    <>
      {trackInfo.tracks ? 
        <>
          <img
            src={trackInfo.tracks[0].album.images[0].url}
            alt={trackInfo.tracks[0].name}
          />
          <br />
          <Link to={`/album/${trackInfo.tracks[0].album.id}`}>{trackInfo.tracks[0].album.name}</Link>
          <br />
          {trackInfo.tracks[0].name}
          <br />
          {convertTime(trackInfo.tracks[0].duration_ms)}
          <br />
          {artists && artists.artists ? 
            <>Play count: {artists.playCount.toLocaleString()}</>
           : ""
          }
          {artists.artists ? 
            <>
              {artists.artists.map((artist, i) => {
                const { name, id, visuals } = artist;
                return (
                  <div key={i}>
                    <Link to={`/artist/${id}`}>{name}</Link>
                    <br />
                    {visuals.avatar && visuals.avatar.length ? (
                      <img src={visuals.avatar[0].url} alt={name} />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </>
           : 
            ""
          }

          <br />
          <audio controls>
            <source src={trackInfo.tracks[0].preview_url} type="audio/mpeg" />
          </audio>
          <br />
          {albumLibrary.some(
            (track) => track.trackId === trackInfo.tracks[0].id && track.musicType === 'track'
          ) ? <>&hearts;<br /></> :  
          <form onSubmit={create}>
              <input
                type="submit"
                value="♡"
                onClick={() => {
                  const createAlbumArtists = () => {
                    return trackInfo.tracks[0].artists.map((artist, i) => {
                      return {
                        artistName: trackInfo.tracks[0].artists[i].name,
                        artistId: trackInfo.tracks[0].artists[i].id
                      }
                    })
                  }

                  setNewAlbum({
                    ...newAlbum,
                    albumTitle: trackInfo.tracks[0].album.name,
                    trackTitle: trackInfo.tracks[0].name,
                    albumId: trackInfo.tracks[0].album.id,
                    trackId: trackInfo.tracks[0].id,
                    albumArtists: createAlbumArtists(),
                    albumArt: trackInfo.tracks[0].album.images[0].url,
                    userId: user._id,
                    musicType: "track",
                    previewUrl: trackInfo.tracks[0].preview_url,
                    playlist: "",
                    favoriteAlbum: false,
                    trackDuration: convertTime(trackInfo.tracks[0].duration_ms)
                  });
                }}
              />
            </form>
          }

          <br />
          <br />
          <br />
          <br />
          <button
            onClick={() => {
              getTrackLyrics();
            }}
          >
            Show lyrics
          </button>
          {trackLyrics.lyrics && trackLyrics.lyrics.lines.length ? 
            <>
              <h3>Lyrics</h3>
              {trackLyrics.lyrics.lines.map((line, i) => {
                const { words } = line;
                return <div key={i}>{words}</div>;
              })}
            </>
           : 
            ""
          }
        </>
       : 
        ""
      }
    </>
  );
}
