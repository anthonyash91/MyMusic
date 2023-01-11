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
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const scraperOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_SPOTIFY_API_KEY}`,
      "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
    },
  };

  const getSearchResults = async () => {
    const response = await fetch(
      `https://spotify-scraper.p.rapidapi.com/v1/search?term=${searchTerm}&type=album&limit=15`,
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
    <div id="search-container">
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
        />
      </form>

      {searchResults.albums ? (
        <ul>
          {searchResults.albums.items.map((album, i) => {
            const { name, id, artists, cover } = album;

            return (
              <li key={i}>
                {albumLibrary.some(
                  (album) => album.albumId === id && album.musicType === "album"
                ) ? (
                  <>
                    This album is in your library
                    <br />
                  </>
                ) : (
                  <form onSubmit={create}>
                    <input
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
                    />
                  </form>
                )}
                <b>Album:</b>{" "}
                <Link
                  to={`/album/${id}`}
                  onClick={() => {
                    setCurrentAlbumId(id);
                  }}
                >
                  {name}
                </Link>
                {artists ? (
                  <ul>
                    {artists.map((artist, i) => {
                      const { name } = artist;
                      return (
                        <li key={i}>
                          <b>Artist:</b> {name}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  ""
                )}
                <br />
                <img src={cover[0].url} alt={name} />
                <br />
                {}
                <br />
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      ) : (
        <div id="default-search-results">
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
        </div>
      )}
    </div>
  );
}
