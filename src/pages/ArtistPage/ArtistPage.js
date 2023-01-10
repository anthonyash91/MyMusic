import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function ArtistPage({ 
  artistInfo,
  setArtistInfo,
  setCurrentPage,
  spotifyOptions,
  clearData
 }) {
  
  const [showDiscography, setShowDiscography] = useState('Popular Releases')
  const [currentDiscographyLink, setCurrentDiscographyLink] = useState('Popular Releases')

  let { spotifyId } = useParams();

  const getArtistInfo = async () => {
    try {
      const artistInfoResponse = await fetch(`https://spotify23.p.rapidapi.com/artist_overview/?id=${spotifyId}`, spotifyOptions)
      const artistInfoData = await artistInfoResponse.json()
      setArtistInfo(artistInfoData)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getArtistInfo()
    setCurrentPage('Artists')
  }, [spotifyId])

  return (
    <div id="artist-content">
      {
        artistInfo.data ?
          <>
            {/* {
              artistInfo.data.artist.visuals.gallery &&
              artistInfo.data.artist.visuals.gallery.items.length > 1 ?
                <Carousel autoPlay={true} showThumbs={false} width={500} showIndicators={false} infiniteLoop={true} showStatus={false}>
                  {
                    artistInfo.data.artist.visuals.gallery.items.map(
                      (image, i) => {
                        return(
                          <div className="gallery-slide" key={i} style={{backgroundImage: `url(${image.sources[0].url})`}}>
                          </div>
                        )
                      }
                    )
                  }
                </Carousel> :
              ''
            } */}

            
            {
            artistInfo.data.artist.visuals &&
            artistInfo.data.artist.visuals.headerImage &&
            artistInfo.data.artist.visuals.headerImage.sources.length ?
            <div id="artist-header" className={artistInfo.data.artist.visuals.headerImage.sources[0] ? 'expand-height' : ''} style={{backgroundImage: "url("+ artistInfo.data.artist.visuals.headerImage.sources[0].url +")"}}>
              <div id="artist-header-overlay"></div>

              <div id="artist-info">
                {
                artistInfo.data.artist.visuals &&
                artistInfo.data.artist.visuals.avatarImage &&
                artistInfo.data.artist.visuals.avatarImage.sources.length ?
                <div id="artist-avatar" style={{backgroundImage: "url("+ artistInfo.data.artist.visuals.avatarImage.sources[0].url +")"}}></div> :
                ''
                } 
                
                <div id="name-and-stats">
                  <div class="artist-name">{artistInfo.data.artist.profile.name}</div>
                  
                  <div id="stats">
                    <span>{artistInfo.data.artist.stats.monthlyListeners.toLocaleString()} listeners</span>
                    <span>&bull;</span>
                    <span>{artistInfo.data.artist.stats.followers.toLocaleString()} followers</span>
                  </div>
                  {
                    artistInfo.data.artist.profile.externalLinks &&
                    artistInfo.data.artist.profile.externalLinks.items.length ? 
                      <div>
                        {
                          artistInfo.data.artist.profile.externalLinks.items.map(
                            (link, i) => {
                              const { url, name } = link
                              return <span className="links" key ={i}><a href={url} target="_blank">{name}</a></span>
                          })
                        }
                      </div>
                            :
                          ''
                  }
                </div>
              </div>
            </div> :
                  <div id="artist-header" style={{backgroundColor: artistInfo.data.artist.visuals.avatarImage.extractedColors.colorRaw.hex}}>
                  <div id="artist-info">
                      {
                      artistInfo.data.artist.visuals &&
                      artistInfo.data.artist.visuals.avatarImage &&
                      artistInfo.data.artist.visuals.avatarImage.sources.length ?
                      <div id="artist-avatar" style={{backgroundImage: "url("+ artistInfo.data.artist.visuals.avatarImage.sources[0].url +")"}}></div> :
                      ''
                      } 
                      
                      <div id="name-and-stats">
                  <div class="artist-name">{artistInfo.data.artist.profile.name}</div>
                  
                  <div id="stats">
                    <span>{artistInfo.data.artist.stats.monthlyListeners.toLocaleString()} listeners</span>
                    <span>&bull;</span>
                    <span>{artistInfo.data.artist.stats.followers.toLocaleString()} followers</span>
                  </div>
                  {
                    artistInfo.data.artist.profile.externalLinks &&
                    artistInfo.data.artist.profile.externalLinks.items.length ? 
                      <div>
                        {
                          artistInfo.data.artist.profile.externalLinks.items.map(
                            (link, i) => {
                              const { url, name } = link
                              return <span className="links" key ={i}><a href={url} target="_blank">{name}</a></span>
                          })
                        }
                      </div>
                            :
                          ''
                  }
                </div>
                    </div>
                  </div>
            }



            {/* <h1 style={{color: artistInfo.data.artist.visuals.avatarImage.extractedColors.colorRaw.hex}}>{artistInfo.data.artist.profile.name}</h1> */}

            {/* <h3>Avatar</h3>
            {
              artistInfo.data.artist.visuals &&
              artistInfo.data.artist.visuals.avatarImage &&
              artistInfo.data.artist.visuals.avatarImage.sources.length ?
                <img src={artistInfo.data.artist.visuals.avatarImage.sources[0].url} alt={artistInfo.data.artist.profile.name} /> :
              ''
            } */}
            
            

            {/* <h3>Stats</h3>
            <ul>
              <li>{artistInfo.data.artist.stats.followers.toLocaleString()} followers</li>
              <li>{artistInfo.data.artist.stats.monthlyListeners.toLocaleString()} monthly listeners</li>
              {
                artistInfo.data.artist.stats.worldRank > 0 ?
                  <li>World Rank: {artistInfo.data.artist.stats.worldRank}</li> :
                ''
              }
            </ul>
            {
              artistInfo.data.artist.stats.topCities &&
              artistInfo.data.artist.stats.topCities.items.length ?
                <>
                  <h3>Top Cities</h3>
                  <ul>
                    {
                      artistInfo.data.artist.stats.topCities.items.map((place, i) => {
                        const { city, country, numberOfListeners } = place
                        return (
                          <li key={i}>
                            {city}, {country} - {numberOfListeners.toLocaleString()} listeners
                          </li>
                        )
                      })
                    }
                  </ul>
                </> :
              ''
              }
            
            {
              artistInfo.data.artist.profile.biography &&
              artistInfo.data.artist.profile.biography.text !== null ?
                <>
                  <h3>Bio</h3>
                  {artistInfo.data.artist.profile.biography.text}
                </> :
              ''
            } */}

            <div id="discography-menu">
              {
                artistInfo.data.artist.discography.popularReleases && 
                artistInfo.data.artist.discography.popularReleases.items.length ? 
                  <span className={currentDiscographyLink === 'Popular Releases' ? 'active' : ''} onClick={() => 
                    {
                      setShowDiscography('Popular Releases')
                      setCurrentDiscographyLink('Popular Releases')
                    }
                  }>Popular Releases</span> : 
                ''
              }    

              {
                artistInfo.data.artist.discography.albums && 
                artistInfo.data.artist.discography.albums.items.length ? 
                  <span className={currentDiscographyLink === 'Albums' ? 'active' : ''} onClick={() => 
                    {
                      setShowDiscography('Albums')
                      setCurrentDiscographyLink('Albums')
                    }
                  }>Albums</span> : 
                ''
              }    

              {
                artistInfo.data.artist.discography.singles && 
                artistInfo.data.artist.discography.singles.items.length ? 
                  <span className={currentDiscographyLink === 'Singles & Eps' ? 'active' : ''} onClick={() => 
                    {
                      setShowDiscography('Singles & Eps')
                      setCurrentDiscographyLink('Singles & Eps')
                    }
                  }>Singles & Eps</span> : 
                ''
              }    

{
                artistInfo.data.artist.discography.compilations && 
                artistInfo.data.artist.discography.compilations.items.length ? 
                  <span className={currentDiscographyLink === 'Compilations' ? 'active' : ''} onClick={() => 
                    {
                      setShowDiscography('Compilations')
                      setCurrentDiscographyLink('Compilations')
                    }
                  }>Compilations</span> : 
                ''
              }

{
                artistInfo.data.artist.discography.topTracks &&
                artistInfo.data.artist.discography.topTracks.items.length ? 
                  <span className={currentDiscographyLink === 'Top Tracks' ? 'active' : ''} onClick={() => 
                    {
                      setShowDiscography('Top Tracks')
                      setCurrentDiscographyLink('Top Tracks')
                    }
                  }>Top Tracks</span> : 
                ''
              }
            </div>         

            <div id="discography">
              {
                artistInfo.data.artist.discography.popularReleases &&
                artistInfo.data.artist.discography.popularReleases.items.length ?
                  <div className={`discography-section ${showDiscography === 'Popular Releases' ? 'show' : 'hide'}`}>
                      {
                        artistInfo.data.artist.discography.popularReleases.items.map((release, i) => {
                          const { name, uri, coverArt } = release.releases.items[0]
                          return (
                            <div className="discography-album" key={i}>
                              {coverArt && coverArt.sources.length ? <Link to={`/album/${uri.slice(-22)}`} onClick={() => {clearData([])}} className="discography-album-cover" style={{backgroundImage: "url("+ coverArt.sources[0].url +")"}}></Link> : ''}
                              {name}
                            </div>
                          )
                        })
                      }
                  </div> : 
                ''
              }

              {
                artistInfo.data.artist.discography.albums &&
                artistInfo.data.artist.discography.albums.items.length ?
                  <div className={`discography-section ${showDiscography === 'Albums' ? 'show' : 'hide'}`}>
                      {
                        artistInfo.data.artist.discography.albums.items.map((album, i) => {
                          const { name, uri, coverArt } = album.releases.items[0]
                          return (
                            <div className="discography-album" key={i}>
                              {coverArt && coverArt.sources.length ? <Link to={`/album/${uri.slice(-22)}`} onClick={() => {clearData([])}} className="discography-album-cover" style={{backgroundImage: "url("+ coverArt.sources[0].url +")"}}></Link> : ''}
                              {name}
                            </div>
                          )
                        })
                      }
                  </div> :
                ''
              }

              {
                artistInfo.data.artist.discography.singles &&
                artistInfo.data.artist.discography.singles.items.length ?
                  <div className={`discography-section ${showDiscography === 'Singles & Eps' ? 'show' : 'hide'}`}>
                      {
                        artistInfo.data.artist.discography.singles.items.map((single, i) => {
                          const { name, uri, coverArt } = single.releases.items[0]
                            return (
                              <div className="discography-album" key={i}>
                                {coverArt && coverArt.sources.length ? <Link to={`/album/${uri.slice(-22)}`} onClick={() => {clearData([])}} className="discography-album-cover" style={{backgroundImage: "url("+ coverArt.sources[0].url +")"}}></Link> : ''}
                                {name}
                              </div>
                            )
                        })
                      }
                  </div> :
                '' 
              }

              {
                artistInfo.data.artist.discography.compilations &&
                artistInfo.data.artist.discography.compilations.items.length ?
                  <div className={`discography-section ${showDiscography === 'Compilations' ? 'show' : 'hide'}`}>
                      {
                        artistInfo.data.artist.discography.compilations.items.map((compilation, i) => {
                          const { name, uri, coverArt } = compilation.releases.items[0]
                            return (
                              <div className="discography-album" key={i}>
                                {coverArt && coverArt.sources.length ? <Link to={`/album/${uri.slice(-22)}`} onClick={() => {clearData([])}} className="discography-album-cover" style={{backgroundImage: "url("+ coverArt.sources[0].url +")"}}></Link> : ''}
                                {name}
                              </div>
                            )
                        })
                      }
                  </div> :
                '' 
              }

            </div>




            {
              artistInfo.data.artist.discography.topTracks &&
              artistInfo.data.artist.discography.topTracks.items.length ?
              <div className={`discography-section ${showDiscography === 'Top Tracks' ? 'show' : 'hide'}`}>
                    {
                      artistInfo.data.artist.discography.topTracks.items.map(
                        (track, i) => {
                          const { name, playcount, uri, album } = track.track
                          return(
                            <div className="discography-album" key={i}>
                              {album.coverArt && album.coverArt.sources.length ? <Link to={`/track/${uri.slice(-22)}`} onClick={() => {clearData()}} className="discography-album-cover" style={{backgroundImage: "url("+ album.coverArt.sources[0].url +")"}}></Link> : ''}{name}<br />
                              {parseInt(playcount).toLocaleString()} plays
                            </div>
                          )
                        }
                      )
                    }
                </div> :
              ''
            }

            {/* {
              artistInfo.data.artist.relatedContent.featuring &&
              artistInfo.data.artist.relatedContent.featuring.items.length ?
                <>
                  <br /><br /><br /><br />
                  <h3>Playlists Featuring {artistInfo.data.artist.profile.name}</h3>

                  <div className="images">
                    {
                      artistInfo.data.artist.relatedContent.featuring.items.map(
                        (album, i) => {
                          const {id, name, images } = album
                          return (
                            <div key={i}>
                              <Link to={`/playlist/${id}`} onClick={() => {clearData()}}>{name}</Link><br />
                              {
                                images.items.length &&
                                images.items[0].sources.length ?
                                  <img src={images.items[0].sources[0].url} alt={name} /> :
                                ''
                              }
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </> : 
              ''
            } */}

            {/* {
              artistInfo.data.artist.relatedContent.appearsOn &&
              artistInfo.data.artist.relatedContent.appearsOn.items.length ? 
                <>
                  <br /><br /><br /><br />
                  <h3>Albums {artistInfo.data.artist.profile.name} Appears On</h3>
                  <div className="images">
                    {
                      artistInfo.data.artist.relatedContent.appearsOn.items.map(
                        (album, i) => {
                          const { name, id, coverArt } = album.releases.items[0]
                          return(
                            <div key={i}>
                              <Link to={`/album/${id}`} onClick={() => {clearData()}}>{name}</Link><br />
                              <img src={coverArt.sources[0].url} alt="cover" />
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </> : 
              ''
            } */}

            {/* {
              artistInfo.data.artist.relatedContent.relatedArtists &&
              artistInfo.data.artist.relatedContent.relatedArtists.items.length ?
                <>
                  <br /><br /><br /><br />
                  <h3>Related Artists</h3>
                  <div className="images">
                    {
                      artistInfo.data.artist.relatedContent.relatedArtists.items.map(
                        (artist, i) => {
                          const { id, profile, visuals } = artist
                          return(
                            <div key={i}>
                              <Link to={`/artist/${id}`} onClick={() => {clearData()}}>{profile.name}</Link><br />
                              {
                                visuals.avatarImage &&
                                visuals.avatarImage.sources.length ?
                                  <img src={visuals.avatarImage.sources[0].url} alt={profile.name} /> :
                                ''
                              }
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </> :
              ''
            } */}

            {/* {
              artistInfo.data.artist.profile.playlists && 
              artistInfo.data.artist.profile.playlists.items.length ? 
                <>
                  <br /><br /><br /><br />
                  <h3>{artistInfo.data.artist.profile.name}'s Playlists</h3>
                  <div className="images">
                    {
                      artistInfo.data.artist.profile.playlists.items.map(
                        (playlist, i) => {
                          const {uri, name, images } = playlist
                          return(
                            <div key={i}>
                              <Link to={`/playlist/${uri.slice(-22)}`} onClick={() => {clearData()}}>{name}</Link><br />
                              {
                                images.items.length &&
                                images.items[0].sources.length ?
                                  <img src={images.items[0].sources[0].url} alt={name} /> :
                                ''
                              }
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </> : 
              ''
            } */}
          </> : 
        `Loading artist's profile...`
      }
    </div>
  )
}