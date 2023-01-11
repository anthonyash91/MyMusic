import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

export default function Search({
  user,
  newAlbum,
  setNewAlbum,
  setCurrentAlbumId,
  albumLibrary,
  setCurrentPage,
  create,
  searchResults,
  setSearchResults,
  searchTerm,
  setSearchTerm,
}) {
  const scraperOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_SPOTIFY_API_KEY}`,
      "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
    },
  };

  const getSearchResults = async () => {
    const response = await fetch(
      `https://spotify-scraper.p.rapidapi.com/v1/search?term=${searchTerm}&type=album&limit=28`,
      scraperOptions
    );
    const data = await response.json();
    setSearchResults(data);
  };

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  useEffect(() => {
    setCurrentPage("Search");
  }, []);

  return (
    <div id="music-content" className="search-container">
      {/* {successMessage ? <div className="success-message">{successMessage}</div> : ''} */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getSearchResults();
        }}
      >
        <input
          type="text"
          onChange={handleChange}
          value={searchTerm}
          placeholder="Search for an artist, album, or track..."
          className="search-field"
        />
      </form>

      {searchResults.albums ? (
        searchResults.albums.items.map((album, i) => {
          const { name, id, artists, cover } = album;

          return (
            <div className="album" key={i}>
              <div
                className="album-cover"
                style={{ backgroundImage: "url(" + cover[0].url + ")" }}
              >
                <div className="album-buttons">
                  <Link to={`/album/${id}`} className="info button">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM7 3.75c0-0.413 0.338-0.75 0.75-0.75h0.5c0.412 0 0.75 0.337 0.75 0.75v0.5c0 0.412-0.338 0.75-0.75 0.75h-0.5c-0.412 0-0.75-0.338-0.75-0.75v-0.5zM10 13h-4v-1h1v-4h-1v-1h3v5h1v1z"></path>
                    </svg>
                  </Link>

                  {albumLibrary.some(
                    (album) =>
                      album.albumId === id && album.musicType === "album"
                  ) ? (
                    <div className="added button">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="add button">
                      <form onSubmit={create}>
                        <button
                          type="submit"
                          value="Add to Library"
                          onClick={() => {
                            const createAlbumArtists = () => {
                              return artists.map((artist, i) => {
                                return {
                                  artistName: artists[i].name,
                                  artistId: artists[i].id,
                                };
                              });
                            };

                            setNewAlbum({
                              ...newAlbum,
                              albumTitle: name,
                              trackTitle: "",
                              albumId: id,
                              trackId: "",
                              albumArtists: createAlbumArtists(),
                              albumArt: cover[0].url,
                              userId: user._id,
                              musicType: "album",
                              previewUrl: "",
                              playlist: "",
                              favoriteAlbum: false,
                              trackDuration: "",
                            });
                          }}
                        >
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.5 6h-5.5v-5.5c0-0.276-0.224-0.5-0.5-0.5h-3c-0.276 0-0.5 0.224-0.5 0.5v5.5h-5.5c-0.276 0-0.5 0.224-0.5 0.5v3c0 0.276 0.224 0.5 0.5 0.5h5.5v5.5c0 0.276 0.224 0.5 0.5 0.5h3c0.276 0 0.5-0.224 0.5-0.5v-5.5h5.5c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5z"></path>
                          </svg>
                        </button>
                      </form>
                    </div>
                  )}
                  <div className="info-search button-caption">
                    Go to Album Page
                  </div>
                  <div className="add button-caption">Add to your Library</div>
                  <div className="added button-caption">
                    This is in your Library
                  </div>
                </div>
              </div>

              <div className="album-info">
                <Link to={`/album/${id}`}>{name}</Link>
                <div className="artist">
                  {artists ? (
                    <div className="album-artists">
                      {artists.map((artist, i) => {
                        const { name } = artist;
                        return (
                          <div className="artists" key={i}>
                            {name} <span>,</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
          <div className="faux-search-result"></div>
        </>
      )}
    </div>
  );
}
