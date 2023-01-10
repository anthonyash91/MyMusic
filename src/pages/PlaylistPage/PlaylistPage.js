import { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function PlaylistPage({ 
  playlistInfo,
  setplaylistInfo,
  spotifyOptions,
  convertTime,
  clearData
}) {
  
  const [playlistTracks, setplaylistTracks] = useState([])

  let { spotifyId } = useParams();

  const getPlaylistInfo = async () => {
    try {
      const playlistInfoResponse = await fetch(`https://spotify23.p.rapidapi.com/playlist/?id=${spotifyId}`, spotifyOptions)
      const playlistInfoData = await playlistInfoResponse.json()
      setplaylistInfo(playlistInfoData)

      const playlistTracksResponse = await fetch(`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${spotifyId}&offset=0&limit=50`, spotifyOptions)
      const playlistTracksData = await playlistTracksResponse.json()
      setplaylistTracks(playlistTracksData)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPlaylistInfo()
  }, [])

  return (
    <>
      {
        playlistInfo.name ? 
          <>
            {playlistInfo.name}<br />
            {playlistInfo.description}<br />
            {playlistInfo.followers.total.toLocaleString()} followers<br />
            {
              playlistInfo.images.length ?
                <img src={playlistInfo.images[0].url} alt={playlistInfo.name} /> :
              ''
            }

            {
              playlistTracks &&
              playlistTracks.items ? 
                <>
                  <br /><br /><br /><br />
                  {
                    playlistTracks.items.map((track, i) => {
                      const { duration_ms, name, artists, album, id, preview_url } = track.track
                      return (
                        <div key={i}>
                          {
                            album.images ?
                              <img src={album.images[0].url} alt={name} /> : 
                            ''
                          }
                          <br />
                          <Link to={`/track/${id}`} onClick={() => {clearData()}}>{name}</Link> - {convertTime(duration_ms)}<br />
                          
                          {
                            artists.map((artist, i) => {
                              const { name, id } = artist
                              return (
                                <div key={i}>
                                  <Link to={`/artist/${id}`}>{name}</Link>
                                </div>
                              )
                            })
                          }
                          <Link to={`/album/${album.id}`} onClick={() => {clearData()}}>{album.name}</Link><br />
                          <audio controls><source src={preview_url} type='audio/mpeg' /></audio>
                        </div>
                      )
                    })
                  }
                </> : 
              ''
            }
          </> :
        ''
      }
    </>
  )
}