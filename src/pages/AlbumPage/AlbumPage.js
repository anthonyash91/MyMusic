import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function AlbumPage({
  user,
  newAlbum,
  setNewAlbum,
  albumInfo,
  setAlbumInfo,
  albumLibrary,
  setCurrentPage,
  spotifyOptions,
  scraperOptions,
  convertTime,
  msConversion,
  shortenNum,
  clearData,
  create
}) {
  const [artistAvatar, setArtistAvatar] = useState([]);
  const [trackPlayCount, setTrackPlayCount] = useState([]);

  let { spotifyId } = useParams();

  const getAlbumInfo = async () => {
    try {
      const albumInfoResponse = await fetch(
        `https://spotify23.p.rapidapi.com/albums/?ids=${spotifyId}`,
        spotifyOptions
      );
      const albumInfoData = await albumInfoResponse.json();
      setAlbumInfo(albumInfoData);

      const artistAvatarResponse = await fetch(
        `https://spotify23.p.rapidapi.com/album_metadata/?id=${spotifyId}`,
        spotifyOptions
      );
      const artistAvatarData = await artistAvatarResponse.json();
      setArtistAvatar(artistAvatarData);

      const trackPlayCountResponse = await fetch(
        `https://spotify-scraper.p.rapidapi.com/v1/album/tracks?albumId=${spotifyId}`,
        scraperOptions
      );
      const trackPlayCountData = await trackPlayCountResponse.json();
      setTrackPlayCount(trackPlayCountData);
    } catch (error) {
      console.log(error);
    }
  };

  let runTime = 0;
  let albumPlayCount = 0;

  if (albumInfo.albums && trackPlayCount.tracks) {
    albumInfo.albums[0].tracks.items.map((track) => {
      runTime += track.duration_ms;
    });

    albumInfo.albums[0].tracks.items.map((track, i) => {
      albumPlayCount += trackPlayCount.tracks.items[i].playCount;
    });
  }

  useEffect(() => {
    getAlbumInfo();
    setCurrentPage('Library')
  }, []);

  return (
    <div id="album-content">
      {albumInfo.albums && trackPlayCount.tracks ? (
        <>
          <div id="album-info">
            <div class="album album-cover" style={{backgroundImage: "url("+ albumInfo.albums[0].images[0].url +")"}}></div>

            <div id="album-name-and-artist">
              <div id="album-type">{artistAvatar.data.album.type}</div>
              <div id="album-name">{albumInfo.albums[0].name}</div>
              <div id="album-artist-and-info">
                {
                  artistAvatar.data && 
                  artistAvatar.data.album.artists.items.length > 1 ? 
                    artistAvatar.data.album.artists.items.map((artist, i) => {
                      const { profile, uri, visuals } = artist;
                      return (
                        <>
                          <span>
                            <Link to={`/artist/${uri.slice(-22)}`} onClick={() => {clearData()}}>{profile.name}</Link>
                          </span>
                          <span>&bull;</span>
                        </>
                      );
                    }) : 
                  <>
                    {
                      artistAvatar.data.album.artists.items[0].visuals.avatarImage &&
                      artistAvatar.data.album.artists.items[0].visuals.avatarImage.sources.length ? 
                        <>
                          <div className="artist-avatar" style={{backgroundImage: "url("+ artistAvatar.data.album.artists.items[0].visuals.avatarImage.sources[0].url +")"}} />

                          <span>
                            <Link to={`/artist/${artistAvatar.data.album.artists.items[0].uri.slice(-22)}`} onClick={() => {clearData()}}>{artistAvatar.data.album.artists.items[0].profile.name}</Link>
                          </span>
                        </> : 
                      "no"
                    }
                    <span>&bull;</span>
                  </>
                }

                
                <span>{albumInfo.albums[0].total_tracks} songs</span>
                <span>&bull;</span>
                <span>{shortenNum(albumPlayCount)} plays</span>
                <span>&bull;</span>
                <span>{msConversion(runTime)}</span>
                <span>&bull;</span>
                <span>{albumInfo.albums[0].release_date.slice(0, 4)}</span>
              </div>
              
              <div>
              {
                albumLibrary.some((album) => album.albumId === albumInfo.albums[0].id && album.musicType === 'album') ? 
                    <>
                      This album is in your library
                      {
                        albumLibrary.some((album) =>
                          album.albumId === albumInfo.albums[0].id &&
                          album.favoriteAlbum === true) ? 
                            ` and you have it favorited.` : 
                          ` and you haven't favorited it.`
                        }
                    </> : 
                  <form onSubmit={create}>
                  <input type='submit' value={`Add ${albumInfo.albums[0].name} to your Library`} onClick={() => {
                    const createAlbumArtists = () => {
                      return albumInfo.albums[0].artists.map((artist, i) => {
                        return {
                          artistName: albumInfo.albums[0].artists[i].name,
                          artistId: albumInfo.albums[0].artists[i].id
                        }
                      })
                    }

                    setNewAlbum({
                      ...newAlbum,
                      albumTitle: albumInfo.albums[0].name,
                      trackTitle: '',
                      albumId: albumInfo.albums[0].id,
                      trackId: '',
                      albumArtists: createAlbumArtists(),
                      albumArt: albumInfo.albums[0].images[0].url,
                      userId: user._id,
                      musicType: 'album',
                      previewUrl: '',
                      playlist: '',
                      favoriteAlbum: false,
                      trackDuration: ''
                    });
                  }} />
                </form>
                }
              </div>
            </div>
          </div>

          <div id="album-tracklist">
        

          {
            albumInfo.albums[0].tracks.items.map((track, i) => {
            const { duration_ms, trackNumber, name, id, preview_url, artists } = track;
            return (
              <div className="track" key={i}>
                <div class="track-info">
                <div class="track-title">
                  <Link to={`/track/${id}`} onClick={() => {clearData();}}>
                    #{i + 1} {name}
                  </Link>
                  
                  <div>
                  {artists.map((artist, i) => {
                    const { name, id } = artist;
                    return (
                      <span key={id}>
                        <Link to={`/artist/${id}`} className="name">{name}</Link>
                        <span className="comma">, </span>
                      </span>
                    );
                  })}
                  </div>
                </div>
              </div>
              <div class="track-info">{shortenNum(trackPlayCount.tracks.items[i].playCount)} plays</div>
              <div class="track-info like-track">
              
              {albumLibrary.some((track) => track.trackId === id && track.musicType === 'track') ? (
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M11.75 1c-1.624 0-3.034 0.911-3.75 2.249-0.716-1.338-2.126-2.249-3.75-2.249-2.347 0-4.25 1.903-4.25 4.25 0 5.75 8 9.75 8 9.75s8-4 8-9.75c0-2.347-1.903-4.25-4.25-4.25z"></path></svg>
                ) : <form onSubmit={create}>
                <button
                  type="submit"
                  onClick={() => {
                    const createAlbumArtists = () => {
                      return artists.map((artist, i) => {
                        return {
                          artistName: artists[i].name,
                          artistId: artists[i].id
                        }
                      })
                    }

                    setNewAlbum({
                      ...newAlbum,
                      albumTitle: albumInfo.albums[0].name,
                      trackTitle: name,
                      albumId: albumInfo.albums[0].id,
                      trackId: id,
                      albumArtists: createAlbumArtists(),
                      albumArt: albumInfo.albums[0].images[0].url,
                      userId: user._id,
                      musicType: "track",
                      previewUrl: preview_url,
                      playlist: "",
                      favoriteAlbum: false,
                      trackDuration: convertTime(duration_ms),
                      trackPlayCount: parseInt(trackPlayCount.tracks.items[i].playCount)
                    });
                  }}
                ><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M8 15l-0.437-0.212c-0.309-0.15-7.563-3.733-7.563-9.179 0-2.541 2.117-4.609 4.719-4.609 1.245 0 2.414 0.476 3.281 1.296 0.867-0.82 2.037-1.296 3.281-1.296 2.602 0 4.719 2.068 4.719 4.609 0 5.446-7.255 9.029-7.563 9.179l-0.437 0.212zM4.719 3c-1.499 0-2.719 1.17-2.719 2.609 0 2.124 1.691 3.988 3.11 5.178 1.133 0.95 2.283 1.636 2.89 1.971 0.607-0.335 1.757-1.022 2.89-1.971 1.419-1.189 3.11-3.053 3.11-5.178 0-1.439-1.22-2.609-2.719-2.609-1.011 0-1.932 0.533-2.405 1.392l-0.876 1.589-0.876-1.589c-0.473-0.859-1.395-1.392-2.405-1.392z"></path></svg></button>
              </form> }
              </div>
              <div class="track-info">{convertTime(duration_ms)}</div>
              <div class="track-info">
                <div class="audio-player">
                <audio controls>
                    <source src={preview_url} type="audio/mpeg" />
                  </audio>
                </div>
              </div>

                

        
              </div>
            );
            })
          }
          </div>

          <div id="copyright">
            <span>{albumInfo.albums[0].copyrights[0].text}</span>
          </div>
        </>
      ) : (
        "Loading album information..."
      )}
    </div>
  );
}
