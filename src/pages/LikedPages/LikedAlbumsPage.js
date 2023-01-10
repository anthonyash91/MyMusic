import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function LikedAlbumsPage({ 
  albumLibrary,
  setCurrentPage,
  clearData,
  update
}) {

  useEffect(() => {
    setCurrentPage('Liked Albums')
  }, [])

  return (
    <>
      {
          albumLibrary.length ?
            <ul className="album">
              {
                albumLibrary.filter(fav => fav.favoriteAlbum === true).map((album, i) => {
                  const { albumTitle, trackTitle, albumId, trackId, albumArtists, albumArt, previewUrl, trackDuration, _id } = album
                  return (
                    <li key={i}>
                      <Link to={`/track/${trackId}`} onClick={
                        () => {
                          clearData()
                        }
                      }>{trackTitle}</Link>
                      <br />
                      <Link to={`/album/${albumId}`} onClick={
                        () => {
                          clearData()
                        }
                      }>{albumTitle}</Link>
                      <br />
      
                      {
                        albumArtists.length ? 
                          <ul className="artists">
                            {
                              albumArtists.map((artist, i) => {
                                const { artistName, artistId } = artist
                                return ( 
                                  <li key={i}>
                                    <Link to={`/artist/${artistId}`} onClick={() => {clearData()}}>{artistName}</Link>
                                  </li>
                                )
                              })
                            }
                          </ul> : 
                        ''
                      }
                      
                      <br />
      
                      <img src={albumArt} alt={albumTitle} /><br />
                      {trackDuration}<br />
                      <audio controls><source src={previewUrl} type='audio/mpeg' /></audio><br />
                      <button onClick={() => { update(_id, { favoriteAlbum: "false" })}}>UnFavorite</button> 
                    </li>
                  )
                }).reverse()
              }
            </ul> :
          `You haven't added any albums yet...`
        }
      </>
  )
}